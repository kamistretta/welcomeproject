import { useState } from 'react'

const STYLES = ['Nature', 'Pop Art', 'Trippy', 'Graphic', 'Animal Portrait']

const inputClass = 'block w-full rounded-lg border border-ink-700 bg-ink-950 px-3 py-2.5 text-sm text-ink-50 shadow-sm transition-colors placeholder:text-ink-500 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50'

export default function CommissionPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const formData = new FormData(e.target)

    try {
      const res = await fetch('/api/commissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone') || null,
          style: formData.get('style'),
          description: formData.get('description'),
          special_requests: formData.get('special_requests') || null,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit request')
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/10">
          <svg className="h-8 w-8 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-rainbow">Request Submitted!</h2>
        <p className="mt-3 text-ink-200">
          Thank you for your interest! I'll get back to you within <span className="font-semibold text-neon-pink text-glow-pink">2-3 business days</span> to discuss your commission.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-rainbow">Request a Commission</h1>
        <p className="mt-2 text-ink-300">Tell me about the painting you'd like and I'll get back to you within 2-3 business days.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-ink-700 bg-ink-900 p-6 shadow-sm sm:p-8">
        {/* Contact Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-ink-100 mb-1.5">Name *</label>
            <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-ink-100 mb-1.5">Email *</label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="you@email.com" />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink-100 mb-1.5">Phone <span className="text-ink-500 font-normal">(optional)</span></label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(555) 123-4567" />
        </div>

        {/* Style Selection */}
        <div>
          <label htmlFor="style" className="block text-sm font-semibold text-ink-100 mb-1.5">Style *</label>
          <select id="style" name="style" required className={inputClass}>
            <option value="">-- Select a style --</option>
            {STYLES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-ink-100 mb-1.5">What would you like painted? *</label>
          <textarea id="description" name="description" required rows={4} className={inputClass} placeholder="Describe what you'd like — subject, colors, mood, size, etc." />
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="special_requests" className="block text-sm font-semibold text-ink-100 mb-1.5">Special Requests <span className="text-ink-500 font-normal">(optional)</span></label>
          <textarea id="special_requests" name="special_requests" rows={3} className={inputClass} placeholder="Deadline, framing, specific references, etc." />
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-sm font-medium text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-coral-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-coral-600 box-glow-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/50 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}
