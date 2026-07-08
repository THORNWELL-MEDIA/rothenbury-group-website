'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import PhoneInput, { isValidPhoneNumber, type Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface Props {
  role: string
  jobId: string
  jobOpeningId: string
  workType: 'remote' | 'hybrid'
  className?: string
  variant?: 'primary' | 'ghost'
  label?: string
}

export function ApplyButton({
  role,
  jobId,
  jobOpeningId,
  workType,
  className = '',
  variant = 'primary',
  label = 'Apply Now',
}: Props) {
  const [open, setOpen] = useState(false)

  const triggerBase =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all whitespace-nowrap'
  const triggerVariant =
    variant === 'primary'
      ? 'bg-gold-600 text-white hover:-translate-y-0.5 hover:bg-gold-700'
      : 'border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-bone'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-apply-trigger
        className={`${triggerBase} ${triggerVariant} ${className}`}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && <ApplyModal role={role} jobId={jobId} jobOpeningId={jobOpeningId} workType={workType} onClose={() => setOpen(false)} />}
    </>
  )
}

function ApplyModal({
  role,
  jobId,
  jobOpeningId,
  workType,
  onClose,
}: {
  role: string
  jobId: string
  jobOpeningId: string
  workType: 'remote' | 'hybrid'
  onClose: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [errorMsg, setErrorMsg] = useState('')
  const [mounted, setMounted] = useState(false)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState<string>('US')
  const [businessType, setBusinessType] = useState('')
  const [hasVehicle, setHasVehicle] = useState('')

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setCountryCode(data.country_code)
        }
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    setMounted(true)
    setNum1(Math.floor(Math.random() * 10) + 1)
    setNum2(Math.floor(Math.random() * 10) + 1)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.classList.add('overflow-hidden', 'apply-modal-open')
    window.dispatchEvent(new CustomEvent('apply-modal-state', { detail: true }))
    document.documentElement.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden', 'apply-modal-open')
      window.dispatchEvent(new CustomEvent('apply-modal-state', { detail: false }))
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [])

  // Close on Escape.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    setFieldErrors({})
    const form = e.currentTarget
    const fd = new FormData(form)

    const errors: Record<string, string> = {}

    const firstName = fd.get('first_name') as string
    if (!firstName?.trim()) errors.first_name = 'First name is required'

    const lastName = fd.get('last_name') as string
    if (!lastName?.trim()) errors.last_name = 'Last name is required'

    const email = fd.get('email') as string
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    const resume = fd.get('resume') as File | null
    if (!resume || resume.size === 0) {
      errors.resume = 'Please upload a resume'
    }

    if (workType === 'remote') {
      const workedFromHome = fd.get('worked_from_home') as string
      if (!workedFromHome) errors.worked_from_home = 'This field is required'

      const noiseCancelling = fd.get('noise_cancelling_headset') as string
      if (!noiseCancelling) errors.noise_cancelling_headset = 'This field is required'

      const ram = fd.get('computer_ram') as string
      if (!ram) errors.computer_ram = 'Computer RAM is required'

      const internet = fd.get('internet_speed') as string
      if (!internet) errors.internet_speed = 'Internet speed is required'
    } else {
      const bType = fd.get('business_type') as string
      if (!bType) errors.business_type = 'This field is required'

      if (bType === 'Yes, Sole Proprietorship' || bType === 'Yes, Corporation under my name') {
        if (!fd.get('legal_business_name')) errors.legal_business_name = 'Business name is required'
        if (!fd.get('business_number')) errors.business_number = 'Business Number is required'
      }

      const hasLicense = fd.get('has_drivers_license') as string
      if (!hasLicense) errors.has_drivers_license = 'This field is required'

      const hasVeh = fd.get('has_vehicle') as string
      if (!hasVeh) errors.has_vehicle = 'This field is required'

      if (hasVeh === 'Yes') {
        if (!fd.get('vehicle_make')) errors.vehicle_make = 'Make is required'
        if (!fd.get('vehicle_model')) errors.vehicle_model = 'Model is required'
        if (!fd.get('vehicle_year')) errors.vehicle_year = 'Year is required'
        if (!fd.get('vehicle_mileage')) errors.vehicle_mileage = 'Mileage is required'
      }

      if (!fd.get('smartphone_model')) errors.smartphone_model = 'Smartphone model is required'
    }

    const captchaVal = parseInt(fd.get('captcha') as string, 10)
    if (captchaVal !== num1 + num2) {
      errors.captcha = 'Incorrect math verification'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus('idle')
      return
    }

    // Append hidden fields
    fd.append('job_id', jobId)
    fd.append('source', 'rothenbury')

    // Process mobile
    fd.set('mobile', phone)

    const baseUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || 'https://portal.revun.com'

    try {
      const res = await fetch(`${baseUrl}/api/v1/job-postings/apply`, {
        method: 'POST',
        body: fd,
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data.message || data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (!mounted) return null

  return createPortal(
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-navy/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-8 sm:p-6 sm:pb-6"
      >
        <div className="relative flex w-full max-w-2xl max-h-full sm:max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b border-ink/10 bg-white px-5 py-4 pt-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                Apply Now · {jobOpeningId}
              </p>
              <h2
                id="apply-modal-title"
                className="mt-0.5 text-[18px] font-bold text-navy"
              >
                {role}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-ink/40 transition-colors hover:text-navy"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto p-5 pb-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-gold-600" />
                <h3 className="text-xl font-bold text-navy">
                  Application Received
                </h3>
                <div className="space-y-3 text-sm text-ink/70 max-w-md">
                  <p>Thank you for applying to Rothenbury Group.</p>
                  <p>
                    Our recruitment partner,{' '}
                    <a
                      href="https://www.langfordstaffing.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gold-600 hover:underline"
                    >
                      Langford Staffing
                    </a>
                    , will contact you by email and text message if you are approved for the next step.
                  </p>
                  <p>
                    Rothenbury Group is an equal opportunity employer. All applications are reviewed based on qualifications, experience, and role requirements.
                  </p>
                  <p className="font-semibold text-navy">
                    Please follow the instructions sent to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {(() => {
                  const getInputClass = (name: string) => `w-full rounded-lg border ${fieldErrors[name] ? 'border-red-500' : 'border-ink/20'} bg-bone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-600`
                  return (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-ink/70">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="first_name"
                            required
                            className={getInputClass('first_name')}
                            placeholder="Jane"
                          />
                          {fieldErrors['first_name'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['first_name']}</p>}
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-ink/70">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="last_name"
                            required
                            className={getInputClass('last_name')}
                            placeholder="Smith"
                          />
                          {fieldErrors['last_name'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['last_name']}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-ink/70">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            required
                            className={getInputClass('email')}
                            placeholder="you@email.com"
                          />
                          {fieldErrors['email'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['email']}</p>}
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-ink/70">
                            Mobile <span className="text-red-500">*</span>
                          </label>
                          <style dangerouslySetInnerHTML={{
                            __html: `
                      .PhoneInput {
                        display: flex;
                        align-items: center;
                      }
                      .PhoneInputInput {
                        flex: 1;
                        border: none;
                        background: transparent;
                        outline: none;
                        padding: 0.5rem;
                        font-size: 0.875rem;
                      }
                      .PhoneInputCountry {
                        display: flex;
                        align-items: center;
                        margin-right: 0.5rem;
                      }
                      .PhoneInputCountryIcon {
                        width: 1.5rem;
                        height: 1rem;
                      }
                      .PhoneInputCountryIcon--square {
                        width: 1rem;
                      }
                      .PhoneInputCountryIcon--border {
                        border: 1px solid rgba(0,0,0,0.2);
                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                      }
                      .PhoneInputCountryIconImg {
                        display: block;
                        width: 100%;
                        height: 100%;
                      }

                      /* Hide number input arrows */
                      input[type=number]::-webkit-inner-spin-button, 
                      input[type=number]::-webkit-outer-spin-button { 
                        -webkit-appearance: none; 
                        margin: 0; 
                      }
                      input[type=number] {
                        -moz-appearance: textfield;
                      }
                    `}} />
                          <div className={`flex w-full overflow-hidden rounded-lg border ${fieldErrors['phone'] ? 'border-red-500' : 'border-ink/20'} bg-bone/30 px-3 focus-within:ring-2 focus-within:ring-gold-600`}>
                            <PhoneInput
                              international
                              defaultCountry={countryCode as Country}
                              value={phone}
                              onChange={(val) => setPhone(val || '')}
                              className="w-full"
                            />
                          </div>
                          {fieldErrors['phone'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['phone']}</p>}
                        </div>
                      </div>

                      {workType === 'remote' && (
                        <>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-semibold text-ink/70">
                                Worked from home for a minimum of 2 years? <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="worked_from_home"
                                required
                                className={getInputClass('worked_from_home')}
                              >
                                <option value="">Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {fieldErrors['worked_from_home'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['worked_from_home']}</p>}
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-semibold text-ink/70">
                                Own a noise-cancelling headset? <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="noise_cancelling_headset"
                                required
                                className={getInputClass('noise_cancelling_headset')}
                              >
                                <option value="">Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {fieldErrors['noise_cancelling_headset'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['noise_cancelling_headset']}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-semibold text-ink/70">
                                Your Computer RAM (in GB)? <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  name="computer_ram"
                                  type="number"
                                  min="1"
                                  required
                                  className={getInputClass('computer_ram')}
                                  placeholder="e.g., 16 GB"
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-ink/40 pointer-events-none">
                                  GB
                                </span>
                              </div>
                              {fieldErrors['computer_ram'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['computer_ram']}</p>}
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-semibold text-ink/70">
                                Home internet speed (Download Mbps)? <span className="text-red-500">*</span>
                              </label>
                              <input
                                name="internet_speed"
                                type="number"
                                min="1"
                                required
                                className={getInputClass('internet_speed')}
                                placeholder="e.g., 100 Mbps"
                              />
                              {fieldErrors['internet_speed'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['internet_speed']}</p>}
                            </div>
                          </div>
                        </>
                      )}

                      {workType !== 'remote' && (
                        <>
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-ink/70">
                              Do you currently operate a business under your name, such as a sole proprietorship, or do you have an incorporated company? <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="business_type"
                              required
                              value={businessType}
                              onChange={(e) => setBusinessType(e.target.value)}
                              className="w-full rounded-lg border border-ink/20 bg-bone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-600"
                            >
                              <option value="">Select an option</option>
                              <option value="Yes, Sole Proprietorship">Yes, Sole Proprietorship</option>
                              <option value="Yes, Corporation under my name">Yes, Corporation under my name</option>
                              <option value="No">No</option>
                            </select>
                            {fieldErrors['business_type'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['business_type']}</p>}
                          </div>

                          {(businessType === 'Yes, Sole Proprietorship' || businessType === 'Yes, Corporation under my name') && (
                            <>
                              <div>
                                <label className="mb-1 block text-xs font-semibold text-ink/70">
                                  Legal Business/Sole Proprietorship Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="legal_business_name"
                                  type="text"
                                  required
                                  className={getInputClass('legal_business_name')}
                                  placeholder="Enter business name"
                                />
                                {fieldErrors['legal_business_name'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['legal_business_name']}</p>}
                              </div>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="mb-1 block text-xs font-semibold text-ink/70">
                                    WSIB Number (Optional)
                                  </label>
                                  <input
                                    name="wsib_number"
                                    type="text"
                                    className={getInputClass('wsib_number')}
                                    placeholder="Enter WSIB Number"
                                  />
                                  {fieldErrors['wsib_number'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['wsib_number']}</p>}
                                </div>
                                <div>
                                  <label className="mb-1 block text-xs font-semibold text-ink/70">
                                    WSIB Clearance Certificate (Optional)
                                  </label>
                                  <input
                                    name="wsib_certificate"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.png"
                                    className={`w-full rounded-lg border ${fieldErrors['wsib_certificate'] ? 'border-red-500' : 'border-ink/20'} bg-bone/30 px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-gold-600/10 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-gold-600 hover:file:bg-gold-600/20 focus:outline-none focus:ring-2 focus:ring-gold-600`}
                                  />
                                  {fieldErrors['wsib_certificate'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['wsib_certificate']}</p>}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="mb-1 block text-xs font-semibold text-ink/70">
                                    Business Number <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    name="business_number"
                                    type="text"
                                    required
                                    className={getInputClass('business_number')}
                                    placeholder="Enter Business Number"
                                  />
                                  {fieldErrors['business_number'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['business_number']}</p>}
                                </div>
                                <div>
                                  <label className="mb-1 block text-xs font-semibold text-ink/70">
                                    HST Number (Optional)
                                  </label>
                                  <input
                                    name="hst_number"
                                    type="text"
                                    className={getInputClass('hst_number')}
                                    placeholder="Enter HST Number"
                                  />
                                  {fieldErrors['hst_number'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['hst_number']}</p>}
                                </div>
                              </div>
                            </>
                          )}

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-semibold text-ink/70">
                                Do you have a valid driver&apos;s license? <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="has_drivers_license"
                                required
                                className={getInputClass('has_drivers_license')}
                              >
                                <option value="">Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {fieldErrors['has_drivers_license'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['has_drivers_license']}</p>}
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-semibold text-ink/70">
                                Do you currently have a reliable vehicle? <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="has_vehicle"
                                required
                                value={hasVehicle}
                                onChange={(e) => setHasVehicle(e.target.value)}
                                className="w-full rounded-lg border border-ink/20 bg-bone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-600"
                              >
                                <option value="">Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {fieldErrors['has_vehicle'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['has_vehicle']}</p>}
                            </div>
                          </div>

                          {hasVehicle === 'Yes' && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="mb-1 block text-xs font-semibold text-ink/70">
                                  Vehicle Make <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="vehicle_make"
                                  type="text"
                                  required
                                  className={getInputClass('vehicle_make')}
                                  placeholder="e.g. Toyota"
                                />
                                {fieldErrors['vehicle_make'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['vehicle_make']}</p>}
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-semibold text-ink/70">
                                  Vehicle Model <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="vehicle_model"
                                  type="text"
                                  required
                                  className={getInputClass('vehicle_model')}
                                  placeholder="e.g. Corolla"
                                />
                                {fieldErrors['vehicle_model'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['vehicle_model']}</p>}
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-semibold text-ink/70">
                                  Vehicle Year <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="vehicle_year"
                                  type="number"
                                  required
                                  className={getInputClass('vehicle_year')}
                                  placeholder="e.g. 2018"
                                />
                                {fieldErrors['vehicle_year'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['vehicle_year']}</p>}
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-semibold text-ink/70">
                                  Approximate Mileage <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="vehicle_mileage"
                                  type="text"
                                  required
                                  className={getInputClass('vehicle_mileage')}
                                  placeholder="e.g. 100,000"
                                />
                                {fieldErrors['vehicle_mileage'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['vehicle_mileage']}</p>}
                              </div>
                            </div>
                          )}

                          <div>
                            <label className="mb-1 block text-xs font-semibold text-ink/70">
                              What is your current smartphone model? <span className="text-red-500">*</span>
                            </label>
                            <input
                              name="smartphone_model"
                              type="text"
                              required
                              className={getInputClass('smartphone_model')}
                              placeholder="e.g. iPhone 13, Samsung Galaxy S21"
                            />
                            {fieldErrors['smartphone_model'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['smartphone_model']}</p>}
                          </div>
                        </>
                      )}

                      <div>
                        <label className="mb-1 block text-xs font-semibold text-ink/70">
                          Resume / CV <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="resume"
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          className={`w-full rounded-lg border ${fieldErrors['resume'] ? 'border-red-500' : 'border-ink/20'} bg-bone/30 px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-gold-600/10 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-gold-600 hover:file:bg-gold-600/20 focus:outline-none focus:ring-2 focus:ring-gold-600`}
                        />
                        {fieldErrors['resume'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['resume']}</p>}
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold text-ink/70">
                          Human Verification: What is {num1} + {num2}? <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="captcha"
                          type="number"
                          required
                          className={getInputClass('captcha')}
                          placeholder="Enter the sum"
                        />
                        {fieldErrors['captcha'] && <p className="mt-1 text-xs text-red-500">{fieldErrors['captcha']}</p>}
                      </div>

                      {status === 'error' && (
                        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gold-600 py-3 text-sm font-bold text-white transition-colors hover:bg-gold-700 disabled:opacity-60"
                      >
                        {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </form>
                  )
                })()}
              </>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
