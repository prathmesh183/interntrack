'use client'

import { useState, useEffect } from 'react'
import { ApplicationCard, CardStatus, COLUMNS } from '@/lib/types'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: Partial<ApplicationCard>) => void
  onDelete?: () => void
  initial?: ApplicationCard | null
  defaultStatus: CardStatus
}

export default function CardModal({ open, onClose, onSave, onDelete, initial, defaultStatus }: Props) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [deadline, setDeadline] = useState('')
  const [jobLink, setJobLink] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<CardStatus>(defaultStatus)

  useEffect(() => {
    if (initial) {
      setCompany(initial.company)
      setRole(initial.role)
      setDeadline(initial.deadline?.slice(0, 10) || '')
      setJobLink(initial.job_link || '')
      setNotes(initial.notes || '')
      setStatus(initial.status)
    } else {
      setCompany('')
      setRole('')
      setDeadline('')
      setJobLink('')
      setNotes('')
      setStatus(defaultStatus)
    }
  }, [initial, defaultStatus, open])

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      company,
      role,
      deadline: deadline || null,
      job_link: jobLink || null,
      notes: notes || null,
      status,
    })
  }

  const inputClass =
    'w-full bg-[#15171B] border border-[#2A2E35] rounded-lg px-3.5 py-2.5 text-[#ECEDEE] placeholder-[#5B6472] outline-none focus:border-[#F5A623]/60 transition-colors'

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1C1F24] border border-[#2A2E35] rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#ECEDEE] mb-4">
          {initial ? 'Edit application' : 'New application'}
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className={inputClass}
          />
          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className={inputClass}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#8A9099] block mb-1.5">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
            <div>
              <label className="text-xs text-[#8A9099] block mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CardStatus)}
                className={inputClass}
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#1C1F24]">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input
            placeholder="Job link (optional)"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="text-[#F97066] hover:text-[#FF8B7A] text-sm"
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[#8A9099] hover:text-[#ECEDEE] text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#F5A623] text-[#15171B] text-sm font-medium hover:bg-[#FFB43D] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}