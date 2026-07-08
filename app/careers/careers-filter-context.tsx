'use client'

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { Role, groupRolesByCountry } from '@/lib/data/careers'

type LocationHierarchyItem = {
  country: string
  count: number
  cities: { city: string; count: number }[]
}

type CategoryCount = {
  name: string
  count: number
}

interface CareersFilterContextType {
  allRoles: Role[]
  
  // States
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  selectedCountries: string[]
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>
  selectedCities: string[]
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>
  locationSearch: string
  setLocationSearch: React.Dispatch<React.SetStateAction<string>>
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPage: number
  
  // Derived Data
  locationHierarchy: LocationHierarchyItem[]
  categoriesWithCounts: CategoryCount[]
  filteredRoles: Role[]
  totalPages: number
  jobsByCountry: ReturnType<typeof groupRolesByCountry>
  
  // Helpers
  countryHasSelectedCities: (country: string) => boolean
  handleCountryClick: (country: string) => void
  handleCityClick: (city: string, country: string) => void
  toggleCategory: (cat: string) => void
  clearFilters: () => void
  totalLocationSelected: number
}

const CareersFilterContext = createContext<CareersFilterContextType | null>(null)

export function CareersFilterProvider({ allRoles, children }: { allRoles: Role[]; children: ReactNode }) {
  const [search, setSearch] = useState('')
  
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [locationSearch, setLocationSearch] = useState('')
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedCountries, selectedCities, selectedCategories])

  const locationHierarchy = useMemo(() => {
    const countries: Record<string, { count: number, cities: Record<string, number> }> = {}
    
    allRoles.forEach(r => {
      const c = r?.country
      const city = r?.city
      if (c) {
        if (!countries[c]) countries[c] = { count: 0, cities: {} }
        countries[c].count++
        if (city) {
          countries[c].cities[city] = (countries[c].cities[city] || 0) + 1
        }
      }
    })
    
    return Object.entries(countries)
      .map(([country, data]) => ({
        country,
        count: data.count,
        cities: Object.entries(data.cities)
          .map(([city, count]) => ({ city, count }))
          .sort((a, b) => a.city.localeCompare(b.city))
      }))
      .sort((a, b) => a.country.localeCompare(b.country))
  }, [allRoles])

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    allRoles.forEach(r => {
      const cat = r?.category || 'Other'
      counts[cat] = (counts[cat] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [allRoles])

  const filteredRoles = useMemo(() => {
    return allRoles.filter(role => {
      const searchLower = search.toLowerCase()
      const matchesSearch = !search || 
        role?.title?.toLowerCase().includes(searchLower) ||
        (role?.summary && role.summary.toLowerCase().includes(searchLower))
      
      const matchesLocation = (() => {
        if (selectedCountries.length === 0 && selectedCities.length === 0) return true
        if (role?.city && selectedCities.includes(role.city)) return true
        if (role?.country && selectedCountries.includes(role.country)) return true
        return false
      })()
        
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(role?.category || 'Other')
        
      return matchesSearch && matchesLocation && matchesCategory
    })
  }, [allRoles, search, selectedCountries, selectedCities, selectedCategories])

  const sortedFilteredRoles = useMemo(() => {
    return [...filteredRoles].sort((a, b) => {
      const countryA = a.country || 'Other'
      const countryB = b.country || 'Other'
      if (countryA !== countryB) return countryA.localeCompare(countryB)
      
      const regionA = a.province || 'Other'
      const regionB = b.province || 'Other'
      if (regionA !== regionB) return regionA.localeCompare(regionB)

      const cityA = a.city || 'Remote'
      const cityB = b.city || 'Remote'
      return cityA.localeCompare(cityB)
    })
  }, [filteredRoles])

  const totalPages = Math.ceil(sortedFilteredRoles.length / itemsPerPage)
  const paginatedRoles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return sortedFilteredRoles.slice(start, start + itemsPerPage)
  }, [sortedFilteredRoles, currentPage])

  const jobsByCountry = useMemo(() => groupRolesByCountry(paginatedRoles), [paginatedRoles])

  const countryHasSelectedCities = (country: string) => {
    const hierarchy = locationHierarchy.find(h => h.country === country)
    if (!hierarchy) return false
    return hierarchy.cities.some(c => selectedCities.includes(c.city))
  }

  const handleCountryClick = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(prev => prev.filter(c => c !== country))
      const hierarchy = locationHierarchy.find(h => h.country === country)
      if (hierarchy) {
        const cityNames = hierarchy.cities.map(c => c.city)
        setSelectedCities(prev => prev.filter(c => !cityNames.includes(c)))
      }
    } else if (countryHasSelectedCities(country)) {
      const hierarchy = locationHierarchy.find(h => h.country === country)
      if (hierarchy) {
        const cityNames = hierarchy.cities.map(c => c.city)
        setSelectedCities(prev => prev.filter(c => !cityNames.includes(c)))
      }
    } else {
      setSelectedCountries(prev => [...prev, country])
    }
  }

  const handleCityClick = (city: string, country: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(prev => prev.filter(c => c !== city))
    } else {
      setSelectedCities(prev => [...prev, city])
      setSelectedCountries(prev => prev.filter(c => c !== country))
    }
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const clearFilters = () => {
    setSelectedCountries([])
    setSelectedCities([])
    setSelectedCategories([])
    setLocationSearch('')
  }
  
  const totalLocationSelected = selectedCountries.length + selectedCities.length

  return (
    <CareersFilterContext.Provider value={{
      allRoles,
      search, setSearch,
      selectedCountries, setSelectedCountries,
      selectedCities, setSelectedCities,
      locationSearch, setLocationSearch,
      selectedCategories, setSelectedCategories,
      currentPage, setCurrentPage,
      itemsPerPage,
      locationHierarchy,
      categoriesWithCounts,
      filteredRoles,
      totalPages,
      jobsByCountry,
      countryHasSelectedCities,
      handleCountryClick,
      handleCityClick,
      toggleCategory,
      clearFilters,
      totalLocationSelected
    }}>
      {children}
    </CareersFilterContext.Provider>
  )
}

export function useCareersFilter() {
  const context = useContext(CareersFilterContext)
  if (!context) {
    throw new Error('useCareersFilter must be used within a CareersFilterProvider')
  }
  return context
}
