/**
 * Offline client-side global location search engine powered by `country-state-city`.
 * 100% offline, zero external API calls, full global coverage (250 countries).
 */

export interface LocationItem {
  id: string
  type: 'city' | 'state'
  name: string
  city: string
  state: string
  province: string
  state_province: string
  country: string
  country_code: string
  countryCode: string
  residential_location: string
  displayText: string
  primaryText: string
  secondaryText: string
  score?: number
}

interface RawCountry {
  name: string
  isoCode: string
}

interface RawState {
  name: string
  isoCode: string
  countryCode: string
}

interface RawCity {
  name: string
  countryCode: string
  stateCode: string
}

interface CSCData {
  countries: RawCountry[]
  states: RawState[]
  cities: RawCity[]
  countryMap: Map<string, string>
  stateMap: Map<string, string>
  citiesByState: Map<string, RawCity[]>
  StateModule: any
  CityModule: any
}

let cscDataCache: CSCData | null = null
let cscLoadingPromise: Promise<CSCData> | null = null

function normalizeStr(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Preloads the country-state-city database into memory in the background.
 */
export async function preloadLocationData(): Promise<CSCData> {
  if (cscDataCache) return cscDataCache
  if (cscLoadingPromise) return cscLoadingPromise

  cscLoadingPromise = (async () => {
    const { Country, State, City } = await import('country-state-city')

    const countries = Country.getAllCountries()
    const countryMap = new Map<string, string>()
    for (let i = 0; i < countries.length; i++) {
      countryMap.set(countries[i].isoCode, countries[i].name)
    }

    const states = State.getAllStates()
    const stateMap = new Map<string, string>()
    for (let i = 0; i < states.length; i++) {
      stateMap.set(`${states[i].countryCode}_${states[i].isoCode}`, states[i].name)
    }

    const cities = City.getAllCities()
    const citiesByState = new Map<string, RawCity[]>()

    cscDataCache = {
      countries,
      states,
      cities,
      countryMap,
      stateMap,
      citiesByState,
      StateModule: State,
      CityModule: City,
    }

    return cscDataCache
  })()

  return cscLoadingPromise
}

export function isLocationDataLoaded(): boolean {
  return cscDataCache !== null
}

const COUNTRY_PRIORITY: Record<string, number> = {
  CA: 900,
  US: 850,
  GB: 750,
  IN: 700,
  MK: 650,
  AU: 500,
  NZ: 450,
  DE: 400,
  FR: 400,
  MX: 400,
  AR: 400,
  BR: 350,
  PH: 350,
}

/**
 * Searches cities and states/provinces globally.
 */
export async function searchLocations(query: string, limit = 50): Promise<LocationItem[]> {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const data = await preloadLocationData()
  const { states, cities, countryMap, stateMap, CityModule } = data

  const normalizedQuery = normalizeStr(trimmed)
  const parts = normalizedQuery.split(',').map((p) => p.trim()).filter(Boolean)
  const q0 = parts[0] || normalizedQuery
  const q1 = parts[1] || ''

  const results: LocationItem[] = []
  const seen = new Set<string>()

  // 1. Search for matching States/Provinces
  const matchedStates: { state: RawState; isExact: boolean; isPrefix: boolean; isCode: boolean }[] = []

  for (let i = 0; i < states.length; i++) {
    const s = states[i]
    const sNameNorm = normalizeStr(s.name)
    const sIsoNorm = normalizeStr(s.isoCode)
    const cIsoNorm = normalizeStr(s.countryCode)
    const cNameNorm = normalizeStr(countryMap.get(s.countryCode) || '')

    const isExact = sNameNorm === q0
    const isPrefix = sNameNorm.startsWith(q0)
    const isCode = q0.length === 2 && sIsoNorm === q0
    const isSub = q0.length >= 3 && sNameNorm.includes(q0)

    if (isExact || isPrefix || isCode || isSub) {
      if (q1) {
        if (!cNameNorm.includes(q1) && cIsoNorm !== q1) continue
      }
      matchedStates.push({ state: s, isExact, isPrefix, isCode })
    }
  }

  // Process matched states
  for (const match of matchedStates) {
    const s = match.state
    const countryName = countryMap.get(s.countryCode) || s.countryCode
    const stateKey = `state:${s.countryCode}:${s.isoCode}`

    if (!seen.has(stateKey)) {
      seen.add(stateKey)

      let score = match.isExact
        ? 40000
        : match.isPrefix
        ? 20000 - s.name.length * 15
        : match.isCode
        ? 18000
        : 9000

      score += (COUNTRY_PRIORITY[s.countryCode] || 0)

      results.push({
        id: stateKey,
        type: 'state',
        name: s.name,
        city: s.name,
        state: s.name,
        province: s.name,
        state_province: s.name,
        country: countryName,
        country_code: s.countryCode,
        countryCode: s.countryCode,
        residential_location: `${s.name}, ${countryName}`,
        displayText: `${s.name}, ${countryName}`,
        primaryText: s.name,
        secondaryText: `(Province / State, ${countryName})`,
        score,
      })
    }

    // Add all cities in this state
    const stateCities: RawCity[] = CityModule.getCitiesOfState(s.countryCode, s.isoCode) || []
    const sortedCities = [...stateCities].sort((a, b) => a.name.localeCompare(b.name))

    for (const c of sortedCities) {
      const cityKey = `city:${c.countryCode}:${c.stateCode}:${normalizeStr(c.name)}`
      if (!seen.has(cityKey) && results.length < limit * 3) {
        seen.add(cityKey)
        const cNorm = normalizeStr(c.name)
        const isCityExact = cNorm === q0
        const isCityPrefix = cNorm.startsWith(q0)

        let score = isCityExact
          ? 32000
          : isCityPrefix
          ? 18000 - c.name.length * 10
          : match.isExact
          ? 12000
          : 6000

        score += (COUNTRY_PRIORITY[c.countryCode] || 0)

        results.push({
          id: cityKey,
          type: 'city',
          name: c.name,
          city: c.name,
          state: s.name,
          province: s.name,
          state_province: s.name,
          country: countryName,
          country_code: c.countryCode,
          countryCode: c.countryCode,
          residential_location: `${c.name}, ${s.name}, ${countryName}`,
          displayText: `${c.name}, ${s.name}, ${countryName}`,
          primaryText: c.name,
          secondaryText: `(${s.name}, ${countryName})`,
          score,
        })
      }
    }
  }

  // 2. Search direct cities
  for (let i = 0; i < cities.length; i++) {
    const c = cities[i]
    const cNorm = normalizeStr(c.name)
    if (!cNorm.includes(q0)) continue

    const stateName = stateMap.get(`${c.countryCode}_${c.stateCode}`) || ''
    const countryName = countryMap.get(c.countryCode) || c.countryCode

    if (q1) {
      const sNorm = normalizeStr(stateName)
      const cntryNorm = normalizeStr(countryName)
      const sIsoNorm = normalizeStr(c.stateCode || '')
      const cIsoNorm = normalizeStr(c.countryCode || '')
      const matchSecond =
        sNorm.includes(q1) ||
        cntryNorm.includes(q1) ||
        sIsoNorm === q1 ||
        cIsoNorm === q1
      if (!matchSecond) continue
    }

    const cityKey = `city:${c.countryCode}:${c.stateCode}:${cNorm}`
    if (seen.has(cityKey)) continue
    seen.add(cityKey)

    const isExact = cNorm === q0
    const isPrefix = cNorm.startsWith(q0)

    let score = isExact
      ? 30000
      : isPrefix
      ? 19000 - c.name.length * 15
      : 7000 - c.name.length * 10

    score += (COUNTRY_PRIORITY[c.countryCode] || 0)

    const secText = stateName ? `(${stateName}, ${countryName})` : `(${countryName})`
    const dispText = stateName
      ? `${c.name}, ${stateName}, ${countryName}`
      : `${c.name}, ${countryName}`

    results.push({
      id: cityKey,
      type: 'city',
      name: c.name,
      city: c.name,
      state: stateName,
      province: stateName,
      state_province: stateName,
      country: countryName,
      country_code: c.countryCode,
      countryCode: c.countryCode,
      residential_location: dispText,
      displayText: dispText,
      primaryText: c.name,
      secondaryText: secText,
      score,
    })

    if (results.length >= limit * 4) break
  }

  results.sort((a, b) => (b.score || 0) - (a.score || 0))
  return results.slice(0, limit)
}
