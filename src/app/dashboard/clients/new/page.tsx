'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewClientPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      pan: formData.get('pan') as string,
      aadhaar: formData.get('aadhaar') as string,
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Something went wrong')
          return
        }
        router.push('/dashboard/clients')
        router.refresh()
      } catch {
        setError('Network error. Please try again.')
      }
    })
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Back */}
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition"
      >
        <ArrowLeft size={16} /> Back to Clients
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
          <UserPlus size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Add New Client</h1>
          <p className="text-sm text-slate-500">Onboard a new taxpayer to your CA portal</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Ravi Shankar"
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="e.g. ravi@example.com"
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. +91 98765 43210"
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* PAN & Aadhaar in 2 cols */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="pan">
              PAN Number
            </label>
            <input
              id="pan"
              name="pan"
              type="text"
              placeholder="e.g. ABCDE1234F"
              maxLength={10}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition uppercase"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="aadhaar">
              Aadhaar Number
            </label>
            <input
              id="aadhaar"
              name="aadhaar"
              type="text"
              placeholder="e.g. 1234 5678 9012"
              maxLength={12}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/dashboard/clients"
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
            {isPending ? 'Adding Client…' : 'Add Client'}
          </button>
        </div>
      </form>
    </div>
  )
}
