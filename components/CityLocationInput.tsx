'use client'

import React, { useEffect, useRef, useState, useTransition } from 'react'
import { MapPin, X, Check, Loader2 } from 'lucide-react'
import { searchLocations, preloadLocationData, type LocationItem } from '@/lib/location-search'

interface Props {
  value: LocationItem | null
  onChange: (location: LocationItem | null) => void
  error?: string
  required?: boolean
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function CityLocationInput({
  value,
  onChange,
  error,
  required = true,
  className = '',
  placeholder = 'Search city or province (e.g. Toronto, Jaipur, Skopje)...',
  disabled = false,
}: Props) {
  const [query, setQuery] = useState(value ? value.displayText : '')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<LocationItem[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isSearching, setIsSearching] = useState(false)
  const [, startTransition] = useTransition()

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Sync external value changes
  useEffect(() => {
    if (value) {
      setQuery(value.displayText)
    } else if (value === null && query === '') {
      // kept as empty
    }
  }, [value])

  // Preload data on mount or when hovering/focusing
  useEffect(() => {
    preloadLocationData().catch(() => {})
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        // If current query does not match selected value, invalidate
        if (!value || query.trim() !== value.displayText.trim()) {
          if (!value && query.trim() !== '') {
            // Unverified typed text: user didn't pick from suggestions
            onChange(null)
          }
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [value, query, onChange])

  // Search execution with debouncing ~120ms
  const handleQueryChange = (text: string) => {
    setQuery(text)
    setActiveIndex(-1)

    // Invalidate selection when user modifies text
    if (value && text.trim() !== value.displayText.trim()) {
      onChange(null)
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    const trimmed = text.trim()
    if (trimmed.length < 2) {
      setResults([])
      setIsOpen(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    debounceTimer.current = setTimeout(() => {
      startTransition(async () => {
        try {
          const res = await searchLocations(trimmed, 40)
          setResults(res)
          setIsOpen(true)
        } catch {
          setResults([])
        } finally {
          setIsSearching(false)
        }
      })
    }, 120)
  }

  const handleSelect = (item: LocationItem) => {
    setQuery(item.displayText)
    onChange(item)
    setIsOpen(false)
    setActiveIndex(-1)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    setQuery('')
    onChange(null)
    setResults([])
    setIsOpen(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' && query.trim().length >= 2) {
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => {
          const next = prev < results.length - 1 ? prev + 1 : 0
          scrollItemIntoView(next)
          return next
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => {
          const next = prev > 0 ? prev - 1 : results.length - 1
          scrollItemIntoView(next)
          return next
        })
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex])
        } else if (results.length === 1) {
          handleSelect(results[0])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  const scrollItemIntoView = (index: number) => {
    if (listRef.current) {
      const items = listRef.current.children
      if (items[index]) {
        (items[index] as HTMLElement).scrollIntoView({ block: 'nearest' })
      }
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label className="mb-1 block text-xs font-semibold text-ink/70">
        City / Residential Location {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {/* Left MapPin Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <MapPin className="h-4 w-4 text-slate-400" strokeWidth={1.5} aria-hidden="true" />
        </div>

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          disabled={disabled}
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => {
            preloadLocationData().catch(() => {})
            if (query.trim().length >= 2 && results.length > 0) {
              setIsOpen(true)
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className={`w-full rounded-lg border ${
            error ? 'border-red-500 ring-1 ring-red-500/20' : 'border-ink/20'
          } bg-bone/30 py-2 pl-9 pr-9 text-sm text-navy placeholder:text-ink/40 transition-colors focus:border-gold-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-600/30`}
        />

        {/* Right side Clear (X) or Spinner */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin text-gold-600" />
          ) : query.length > 0 && !disabled ? (
            <button
              type="button"
              onClick={handleClear}
              className="rounded p-1 text-slate-400 transition-colors hover:bg-ink/5 hover:text-navy"
              aria-label="Clear location search"
            >
              <X className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600" strokeWidth={1.75} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Validation Error Message */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* Autocomplete Dropdown Popup */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-72 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-100">
          {results.length > 0 ? (
            <ul
              ref={listRef}
              role="listbox"
              className="max-h-64 overflow-y-auto focus:outline-none space-y-0.5"
            >
              {results.map((item, index) => {
                const isSelected = value?.id === item.id || value?.displayText === item.displayText
                const isActive = activeIndex === index

                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-left transition-colors select-none ${
                      isActive
                        ? 'bg-gold-50/80 text-navy'
                        : isSelected
                        ? 'bg-bone/80 text-navy'
                        : 'text-ink/80 hover:bg-slate-50'
                    }`}
                  >
                    {/* Clean Country Code Badge (e.g. IN, CA, US) without brackets */}
                    <span className="inline-flex shrink-0 items-center justify-center rounded px-1.5 py-0.5 font-sans text-[11px] font-bold tracking-wide bg-slate-100 text-slate-700 border border-slate-200/80">
                      {item.countryCode}
                    </span>

                    {/* Sleek MapPin Icon matching reference */}
                    <MapPin className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.5} aria-hidden="true" />

                    {/* Name & (Region, Country) */}
                    <div className="min-w-0 flex-1 flex flex-wrap items-baseline gap-x-1.5 text-sm">
                      <span className="font-bold text-navy truncate">
                        {item.primaryText}
                      </span>
                      <span className="text-xs text-slate-500 truncate">
                        {item.secondaryText}
                      </span>
                    </div>

                    {/* Selected Checkmark */}
                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden="true" />
                    )}
                  </li>
                )
              })}
            </ul>
          ) : !isSearching ? (
            <div className="p-4 text-center">
              <p className="text-xs font-semibold text-navy">
                No matching location found.
              </p>
              <p className="mt-1 text-[11px] text-ink/60">
                Try searching for a nearby major city, district, or your state/province name.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
export default CityLocationInput
