import { type ReactNode } from 'react'

export interface Role {
  /** Unique URL identifier (lowercase + dashes, no spaces). */
  slug: string
  /** Display title, e.g. "Senior Leasing Agent". */
  title: string
  /** Free-form department / team label shown under the title in the hero. */
  department: string
  /** Employment type. "Full-time" | "Part-time" | "Contract" | "Internship" */
  type: string
  /** Work Type for display e.g. "Remote", "Hybrid", "On-site" */
  workTypeDisplay: string
  /** Raw work type string from Work_Type */
  workType: string
  /** Job_Type string from API used for apply form condition */
  jobType: string
  /** City the role is based in. Use "Remote" for fully remote roles. */
  city: string
  /** Province (Canada) or state (US). */
  province: string
  /** Country. */
  country: string
  /** Display location string used in the hero. */
  locationDisplay: string
  /** Job opening ID. */
  jobId: string
  /** Job opening ID for display. */
  jobOpeningId: string
  /** Location ID from job API */
  locId?: string | number
  /** ISO date — YYYY-MM-DD. Shown in the hero. */
  postingStartDate: string
  /** Display string — e.g. "$55,000 to $75,000 base". */
  compensation: string
  /** Job description summary — short paragraph in the body. */
  summary: string
  /** Bullet list — Key Responsibilities section. */
  responsibilities: string[]
  /** Bullet list — Required Skills section. */
  requiredSkills: string[]
  /** Bullet list — Good to have Skills (optional). */
  goodToHaveSkills: string[]
  /** Bullet list — Education and Experience. */
  educationAndExperience: string[]
  /** Free-form short paragraph — Additional Information block. */
  additionalInfo: string | null
  /** Whether relocation assistance is provided. */
  relocationAssistance: boolean
  /** HTML description from API. */
  htmlDescription?: string
  /** Job Category for filtering (string or array of strings). */
  category: string | string[]
  /** Industry (string or array of strings). */
  industry?: string | string[]
}

interface ApiJob {
  Job_Description?: string
  Pay_Disclosure?: string
  Salary?: string
  Work_Type?: string | null
  City?: string
  State?: string
  Country?: string
  slug: string
  Posting_Title?: string
  Industry?: string | string[]
  Job_Type?: string
  zoho_id?: string
  Date_Opened?: string
  Role_Category?: string | string[]
  Job_Category?: string | string[]
  Job_Opening_ID?: string
  location_id?: string | number
  location_Id?: string | number
}

export async function fetchRolesFromApi(): Promise<Role[]> {
  const baseUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || 'https://phpstack-1217932-6516253.cloudwaysapps.com'
  const url = `${baseUrl}/api/v1/job-postings?client_name=Rothenbury+Group`
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) {
      console.error('Failed to fetch roles', res.status)
      return []
    }
    const json = await res.json()
    const apiJobs = json.data || []
    return apiJobs.map((job: ApiJob) => {
      let rawHtml = job.Job_Description || ''

      // Selectively strip font-size, font-family, and colors to preserve other formatting (like bold/headings)
      const styleStripRegex = /(font-family|font-size|color|background-color|background|line-height)\s*:[^;]+;?/gi

      const cleanStyles = (html: string) => {
        let cleanedHtml = html.replace(/style="([^"]*)"/gi, (match, styles) => {
          const cleaned = styles.replace(styleStripRegex, '').trim()
          return cleaned ? `style="${cleaned}"` : ''
        })
        cleanedHtml = cleanedHtml.replace(/style='([^']*)'/gi, (match, styles) => {
          const cleaned = styles.replace(styleStripRegex, '').trim()
          return cleaned ? `style='${cleaned}'` : ''
        })
        return cleanedHtml
      }

      rawHtml = cleanStyles(rawHtml)

      // Strip <font> and <span> tags but keep the content inside them
      rawHtml = rawHtml.replace(/<\/?font[^>]*>/gi, '')
      rawHtml = rawHtml.replace(/<\/?span[^>]*>/gi, '')

      // Clean up messy Zoho HTML artifacts (non-breaking spaces)
      rawHtml = rawHtml.replace(/&nbsp;/gi, ' ')
      rawHtml = rawHtml.replace(/<br\s*\/?>\s*(?=<\/div>|<\/p>)/gi, '')

      // Strip any paragraph or div whose text content is empty / whitespace
      rawHtml = rawHtml.replace(/<(p|div)[^>]*>(.*?)(?:<\/p>|<\/div>)/gi, (fullMatch, tag, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim()
        if (text.length === 0) {
          return ''
        }
        return fullMatch
      })
      rawHtml = rawHtml.replace(/(?:<br\s*\/?>\s*){2,}/gi, '<br>')

      // 1. Convert standalone bold section titles (in paragraphs or break lines) to <h3>
      const isHeadingText = (text: string) => {
        const trimmed = text.replace(/&nbsp;/g, ' ').trim()
        if (trimmed.length < 2 || trimmed.length > 85) return false
        if (trimmed.endsWith('.')) return false
        if (/^[-•*\d]/i.test(trimmed)) return false
        if (/\d+\s*(gb|mbps|ram|years)/i.test(trimmed)) return false
        // Exclude meta key labels like EST HOURS REQUIRED, LOCATION, PAY, etc.
        if (/^(est|hours|pay|location|salary|job type|work type|note|ref|id)\b/i.test(trimmed)) return false
        return true
      }

      // Convert <p><b>Heading</b><br>Followup text...</p> into <h3>Heading</h3><p>Followup text...</p>
      rawHtml = rawHtml.replace(/<(div|p)[^>]*>\s*(?:<b>|<strong>)\s*([^<]{2,85}?)\s*(?:<\/b>|<\/strong>)\s*<br\s*\/?>([\s\S]*?)<\/\1>/gi, (match, tag, headingText, rest) => {
        const cleanHeading = headingText.replace(/&nbsp;/g, ' ').trim()
        if (isHeadingText(cleanHeading)) {
          const cleanRest = rest.trim()
          return `\n<h3>${cleanHeading}</h3>\n${cleanRest ? `<p>${cleanRest}</p>` : ''}`
        }
        return match
      })

      // Convert standalone <p><b>Heading</b></p> into <h3>Heading</h3>
      rawHtml = rawHtml.replace(/<(div|p)[^>]*>\s*(?:<b>|<strong>)\s*([^<]{2,85}?)\s*(?:<\/b>|<\/strong>)\s*<\/\1>/gi, (match, tag, headingText) => {
        const cleanHeading = headingText.replace(/&nbsp;/g, ' ').trim()
        if (isHeadingText(cleanHeading)) {
          return `\n<h3>${cleanHeading}</h3>\n`
        }
        return match
      })

      // Convert bold heading at start of break/newline: <b>Heading</b><br>
      rawHtml = rawHtml.replace(/(?:<br\s*\/?>|\n|^)\s*(?:<b>|<strong>)\s*([^<]{2,85}?)\s*(?:<\/b>|<\/strong>)\s*(?=<br\s*\/?>|\n|$)/gi, (match, headingText) => {
        const cleanText = headingText.replace(/&nbsp;/g, ' ').trim()
        if (isHeadingText(cleanText)) {
          return `\n<h3>${cleanText}</h3>\n`
        }
        return match
      })

      // 3. Format plain text lists (- item, • item, * item) into HTML <ul><li>
      rawHtml = rawHtml.replace(/(?:<div[^>]*>|<p[^>]*>|<br\s*\/?>|\n|^)\s*[-•*]\s+(.*?)\s*(?:<\/div>|<\/p>|<br\s*\/?>|\n|$)/gi, '\n<li>$1</li>\n')
      rawHtml = rawHtml.replace(/(?:\n*<li>.*?<\/li>\n*)+/g, (match) => `\n<ul>${match}</ul>\n`)

      // Clean up headings inside list items so list items never render as section headings
      rawHtml = rawHtml.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (match, inner) => {
        const cleanedInner = inner.replace(/<\/?h[1-6][^>]*>/gi, (tag: string) => (tag.startsWith('</') ? '</b>' : '<b>'))
        return match.replace(inner, cleanedInner)
      })

      const hidePay =
        job.Pay_Disclosure === 'Do not disclose pay' ||
        job.Salary === 'Do not disclose pay'
      let compensation = hidePay ? '' : job.Salary || ''
      if (compensation && /\d/.test(compensation)) {
        // Add commas to numbers 1000 and above
        compensation = compensation.replace(/\d{4,}/g, (match) => {
          return Number(match).toLocaleString('en-US')
        })

        compensation = `${compensation}`
      }

      const workTypeRaw = job.Work_Type ? String(job.Work_Type).trim() : ''
      const jobTypeRaw = job.Job_Type ? String(job.Job_Type).trim() : ''
      const workTypeLower = workTypeRaw.toLowerCase()
      const jobTypeLower = jobTypeRaw.toLowerCase()

      const isRemote = jobTypeLower.includes('remote')
      const isContract = jobTypeLower.includes('contract')

      let employmentTypeDisplay = workTypeRaw || 'Full-Time'
      if (isRemote) {
        if (workTypeRaw && !workTypeLower.includes('remote')) {
          employmentTypeDisplay = `${workTypeRaw} · ${jobTypeRaw || 'Remote'}`
        } else {
          employmentTypeDisplay = jobTypeRaw || 'Remote'
        }
      } else if (isContract) {
        if (workTypeRaw && !workTypeLower.includes('contract')) {
          employmentTypeDisplay = `${workTypeRaw} · ${jobTypeRaw || 'Contract'}`
        } else {
          employmentTypeDisplay = jobTypeRaw || 'Contract'
        }
      }

      const workArrangementDisplay = jobTypeRaw

      const locParts = []
      if (job.City) locParts.push(job.City)
      if (job.State) locParts.push(job.State)
      if (job.Country) locParts.push(job.Country)

      const jobTypeSuffix = !isRemote && !isContract && jobTypeRaw ? jobTypeRaw : ''

      let locationDisplay = ''
      if (locParts.length > 0) {
        locationDisplay = jobTypeSuffix
          ? `${locParts.join(', ')} · ${jobTypeSuffix}`
          : locParts.join(', ')
      } else {
        locationDisplay = jobTypeSuffix || 'Remote'
      }

      const industryVal = job.Industry || 'Careers'
      const departmentDisplay = Array.isArray(industryVal) ? industryVal.join(', ') : industryVal

      return {
        slug: job.slug,
        title: job.Posting_Title || 'Untitled Role',
        department: departmentDisplay,
        type: employmentTypeDisplay,
        workTypeDisplay: workArrangementDisplay,
        workType: workArrangementDisplay,
        jobType: employmentTypeDisplay,
        city: job.City || '',
        province: job.State || '',
        country: job.Country || '',
        locationDisplay,
        jobId: job.zoho_id || '',
        jobOpeningId: (job.Job_Opening_ID || '').replace(/ZR/g, 'RG'),
        locId: job.location_id ?? job.location_Id ?? '',
        postingStartDate: job.Date_Opened ? job.Date_Opened.split('T')[0] : '',
        compensation,
        summary: '',
        responsibilities: [],
        requiredSkills: [],
        goodToHaveSkills: [],
        educationAndExperience: [],
        additionalInfo: null,
        relocationAssistance: false,
        htmlDescription: rawHtml,
        category: job.Role_Category || job.Job_Category || 'Other',
        industry: job.Industry || '',
      }
    })
  } catch (error) {
    console.error('Failed to fetch roles from API', error)
    return []
  }
}

/** Find a role by slug. Returns undefined if not found. */
export async function getRoleBySlug(slug: string): Promise<Role | undefined> {
  const roles = await fetchRolesFromApi()
  return roles.find((r) => r.slug === slug)
}

/** All slugs — used by generateStaticParams on the dynamic route. */
export async function getAllRoleSlugs(): Promise<string[]> {
  const roles = await fetchRolesFromApi()
  return roles.map((r) => r.slug)
}

export interface CityGroup {
  city: string
  roles: Role[]
}

export interface RegionGroup {
  region: string
  cities: CityGroup[]
}

export interface CountryGroup {
  country: string
  regions: RegionGroup[]
}

export function groupRolesByCountry(roles: Role[]): CountryGroup[] {
  const countryOrder: string[] = []
  const countryMap = new Map<
    string,
    { regionOrder: string[]; regionMap: Map<string, { cityOrder: string[]; cityMap: Map<string, Role[]> }> }
  >()

  for (const role of roles) {
    const countryKey = role.country || 'Other'
    if (!countryMap.has(countryKey)) {
      countryOrder.push(countryKey)
      countryMap.set(countryKey, {
        regionOrder: [],
        regionMap: new Map(),
      })
    }
    const country = countryMap.get(countryKey)!

    const regionKey = role.province || 'Other'
    if (!country.regionMap.has(regionKey)) {
      country.regionOrder.push(regionKey)
      country.regionMap.set(regionKey, {
        cityOrder: [],
        cityMap: new Map(),
      })
    }
    const region = country.regionMap.get(regionKey)!

    const cityKey = role.city || 'Remote'
    if (!region.cityMap.has(cityKey)) {
      region.cityOrder.push(cityKey)
      region.cityMap.set(cityKey, [])
    }
    region.cityMap.get(cityKey)!.push(role)
  }

  // Sort countries alphabetically
  countryOrder.sort((a, b) => a.localeCompare(b))

  return countryOrder.map((countryKey) => {
    const country = countryMap.get(countryKey)!
    return {
      country: countryKey,
      regions: country.regionOrder.map((regionKey) => {
        const region = country.regionMap.get(regionKey)!
        return {
          region: regionKey,
          cities: region.cityOrder.map((cityKey) => ({
            city: cityKey,
            roles: region.cityMap.get(cityKey)!,
          })),
        }
      }),
    }
  })
}
