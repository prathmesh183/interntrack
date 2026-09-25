'use client'

import { useDraggable } from '@dnd-kit/core'
import { ApplicationCard, COLUMNS } from '@/lib/types'
import DeadlineBadge from './DeadlineBadge'

export default function BoardCard({ card, onClick }: { card: ApplicationCard; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
  })
  const dot = COLUMNS.find((c) => c.id === card.status)?.dot ?? '#5B6472'

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`group flex items-start gap-3 bg-[#1C1F24] border border-[#2A2E35] rounded-lg pl-3 pr-3.5 py-3 cursor-grab active:cursor-grabbing hover:border-[#3A3F47] transition-colors ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <span
        className="w-[3px] self-stretch rounded-full shrink-0"
        style={{ background: dot }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-[#ECEDEE] font-medium text-sm truncate">{card.company}</p>
        <p className="text-[#8A9099] text-xs mt-0.5 truncate">{card.role}</p>
      </div>
      <DeadlineBadge deadline={card.deadline} />
    </div>
  )
}