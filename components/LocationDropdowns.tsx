"use client"

import { useState, useEffect } from "react"
import {
  PAKISTAN_DATA,
  getCitiesByProvince,
  getHospitalsByCity,
  PROVINCE_NAMES,
} from "../lib/pakistan-data"

// ── Types ──────────────────────────────────────────────────────────────────

export type LocationSelection = {
  province: string
  city: string
  hospital: string   // selected from list OR custom typed value
  customHospital: boolean // true if user typed their own
}

type Props = {
  /** Called whenever any dropdown/input changes */
  onChange: (selection: LocationSelection) => void
  /** Show hospital field — true for blood requests, false for donor register */
  showHospital?: boolean
  /** Current values (for controlled usage) */
  value?: Partial<LocationSelection>
  /** Error messages per field */
  errors?: {
    province?: string
    city?: string
    hospital?: string
  }
}

const selectClass = (hasError: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm outline-none transition appearance-none bg-no-repeat bg-right cursor-pointer ${
    hasError
      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
  }`

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    hasError
      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 bg-gray-50 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
  }`

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
      <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export default function LocationDropdowns({
  onChange,
  showHospital = false,
  value,
  errors = {},
}: Props) {
  const [province, setProvince] = useState(value?.province ?? "")
  const [city, setCity] = useState(value?.city ?? "")
  const [hospital, setHospital] = useState(value?.hospital ?? "")
  const [isCustomHospital, setIsCustomHospital] = useState(value?.customHospital ?? false)
  const [customHospitalText, setCustomHospitalText] = useState(
    value?.customHospital ? (value?.hospital ?? "") : ""
  )

  const cities = province ? getCitiesByProvince(province) : []
  const hospitals = province && city ? getHospitalsByCity(province, city) : []

  // Notify parent whenever selection changes
  useEffect(() => {
    onChange({
      province,
      city,
      hospital: isCustomHospital ? customHospitalText : hospital,
      customHospital: isCustomHospital,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, city, hospital, isCustomHospital, customHospitalText])

  const handleProvinceChange = (v: string) => {
    setProvince(v)
    setCity("")
    setHospital("")
    setIsCustomHospital(false)
    setCustomHospitalText("")
  }

  const handleCityChange = (v: string) => {
    setCity(v)
    setHospital("")
    setIsCustomHospital(false)
    setCustomHospitalText("")
  }

  const handleHospitalChange = (v: string) => {
    if (v === "__custom__") {
      setIsCustomHospital(true)
      setHospital("")
    } else {
      setIsCustomHospital(false)
      setHospital(v)
      setCustomHospitalText("")
    }
  }

  return (
    <div className="space-y-4">

      {/* ── Province ── */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Province <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={province}
            onChange={e => handleProvinceChange(e.target.value)}
            className={selectClass(!!errors.province)}
          >
            <option value="">— Select Province —</option>
            {PROVINCE_NAMES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <FieldError msg={errors.province} />
      </div>

      {/* ── City ── */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          City <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={city}
            onChange={e => handleCityChange(e.target.value)}
            disabled={!province}
            className={`${selectClass(!!errors.city)} ${!province ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <option value="">
              {province ? "— Select City —" : "Select a province first"}
            </option>
            {cities.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {!province && (
          <p className="mt-1 text-xs text-gray-400">Select province to see cities</p>
        )}
        <FieldError msg={errors.city} />
      </div>

      {/* ── Hospital (only for blood requests) ── */}
      {showHospital && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Hospital <span className="text-red-500">*</span>
          </label>

          {/* Dropdown selection */}
          {!isCustomHospital && (
            <div className="relative">
              <select
                value={hospital}
                onChange={e => handleHospitalChange(e.target.value)}
                disabled={!city}
                className={`${selectClass(!!errors.hospital)} ${!city ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <option value="">
                  {city ? "— Select Hospital —" : "Select a city first"}
                </option>
                {hospitals.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
                {/* Always allow custom entry */}
                <option value="__custom__">✏️ Type hospital name manually…</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          {/* Custom text input */}
          {isCustomHospital && (
            <div className="space-y-2">
              <input
                type="text"
                value={customHospitalText}
                onChange={e => setCustomHospitalText(e.target.value)}
                placeholder="Enter hospital name…"
                className={inputClass(!!errors.hospital)}
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setIsCustomHospital(false)
                  setCustomHospitalText("")
                  setHospital("")
                }}
                className="text-xs text-gray-400 hover:text-red-600 transition"
              >
                ← Back to hospital list
              </button>
            </div>
          )}

          {!city && (
            <p className="mt-1 text-xs text-gray-400">Select city to see hospitals</p>
          )}
          {city && !isCustomHospital && (
            <p className="mt-1 text-xs text-gray-400">
              Don&apos;t see your hospital?{" "}
              <button
                type="button"
                onClick={() => setIsCustomHospital(true)}
                className="text-red-500 hover:underline"
              >
                Type it manually
              </button>
            </p>
          )}
          <FieldError msg={errors.hospital} />
        </div>
      )}

    </div>
  )
}

// ── Export types for use in forms ──────────────────────────────────────────
export type { Props as LocationDropdownsProps }
