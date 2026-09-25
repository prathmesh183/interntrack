function getDeadlineState(deadline: string | null) {
  if (!deadline) return null
  const days = Math.ceil(
    (new Date(deadline).getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000
  )
  if (days < 0) return { label: 'Overdue', urgent: true }
  if (days === 0) return { label: 'Due today', urgent: true }
  if (days <= 3) return { label: `${days}d left`, urgent: true }
  return {
    label: new Date(deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    urgent: false,
  }
}

export default function DeadlineBadge({ deadline }: { deadline: string | null }) {
  const state = getDeadlineState(deadline)
  if (!state) return null
  return (
    <span
      className={`text-xs tabular-nums ${
        state.urgent ? 'text-[#F5A623] font-medium' : 'text-[#8A9099]'
      }`}
    >
      {state.label}
    </span>
  )
}