'use client'

import Link from 'next/link'
import { MapPin, Globe2, Briefcase, ArrowRight, ChevronLeft, ChevronRight as ChevronRightIcon, Search } from 'lucide-react'
import { useCareersFilter } from './careers-filter-context'

export default function JobFilterList() {
  const { 
    filteredRoles, 
    jobsByCountry, 
    currentPage, 
    setCurrentPage, 
    totalPages
  } = useCareersFilter()

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setTimeout(() => {
      const el = document.getElementById('positions')
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div>
      {/* Jobs List */}
      <div className="space-y-12">
        {jobsByCountry.length > 0 ? (
          jobsByCountry.map(countryGroup => (
            <div
              key={countryGroup.country}
              className="rounded-2xl border border-ink/5 bg-white p-6 shadow-sm md:p-8"
            >
              {/* Country header */}
              <div className="flex flex-wrap items-baseline gap-2 border-b border-ink/5 pb-4">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-navy">
                  <Globe2
                    className="h-6 w-6 text-gold-600"
                    aria-hidden="true"
                  />
                  {countryGroup.country}
                </h3>
              </div>

              {/* Regions */}
              <div className="mt-6 space-y-10">
                {countryGroup.regions.map((regionGroup) => (
                  <div key={regionGroup.region} className="space-y-6">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="h-5 w-5 text-gold-600"
                        aria-hidden="true"
                      />
                      <h4 className="text-lg font-bold text-navy">
                        {regionGroup.region}
                      </h4>
                    </div>

                    {/* Cities */}
                    <div className="space-y-7 pl-7 border-l-2 border-ink/5 ml-2">
                      {regionGroup.cities.map((cityGroup) => (
                        <div key={cityGroup.city}>
                          <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy/65 mb-3">
                            {cityGroup.city}
                          </h5>
                          <ul className="space-y-3">
                            {cityGroup.roles.map((role) => (
                              <li key={role.slug}>
                                <Link
                                  href={`/careers/${role.slug}/`}
                                  scroll={true}
                                  className="group flex flex-col gap-2 rounded-xl border border-ink/5 bg-bone/60 p-4 transition-all hover:-translate-y-0.5 hover:border-gold-600/40 hover:bg-white hover:shadow-md md:flex-row md:items-center md:justify-between md:gap-6 md:p-5 no-underline"
                                >
                                  <div className="min-w-0 flex-1">
                                    <h6 className="text-base font-bold text-gold-600 transition-colors">
                                      {role.title}
                                    </h6>
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-ink/60">
                                      <span className="inline-flex items-center gap-1">
                                        <Briefcase className="h-3.5 w-3.5" />
                                        {role.type}
                                      </span>
                                      <span className="inline-flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {role.locationDisplay}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-navy transition-colors group-hover:text-gold-600">
                                    View role
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-ink/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bone mb-4">
              <Search className="h-8 w-8 text-ink/40" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">No positions found</h3>
            <p className="text-ink/60 max-w-md mx-auto">
              We couldn't find any open positions matching your search criteria. 
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between border-t border-ink/10 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-bone disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-bone disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-ink/70">
                Showing <span className="font-medium">{filteredRoles.length === 0 ? 0 : (currentPage - 1) * 20 + 1}</span> to <span className="font-medium">{Math.min(currentPage * 20, filteredRoles.length)}</span> of{' '}
                <span className="font-medium">{filteredRoles.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-ink/40 ring-1 ring-inset ring-ink/10 hover:bg-bone focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-navy ring-1 ring-inset ring-ink/10 focus:z-20 focus:outline-offset-0">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-ink/40 ring-1 ring-inset ring-ink/10 hover:bg-bone focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
