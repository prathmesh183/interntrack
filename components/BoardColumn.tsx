'use client'

import { useDroppable } from '@dnd-kit/core'
import { ApplicationCard, CardStatus } from '@/lib/types'
import BoardCard from './BoardCard'

interface Props {
  id: CardStatus
  label: string
  sub: string
  dot: string
  cards: ApplicationCard[]
  onCardClick: (card: ApplicationCard) => void
  onAddClick: () => void
}

export default function BoardColumn({ id, label, sub, dot, cards, onCardClick, onAddClick }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div className="flex flex-col w-[280px] shrink-0">
      <div className="flex items-center justify-between mb-1 px-0.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
          <h3 className="text-[#ECEDEE] font-medium text-sm">{label}</h3>
        </div>
        <button
          onClick={onAddClick}
          aria-label={`Add to ${label}`}
          className="text-[#8A9099] hover:text-[#ECEDEE] text-base leading-none w-5 h-5 flex items-center justify-center rounded hover:bg-[#1C1F24] transition-colors"
        >
          +
        </button>
      </div>
      <p className="text-[#8A9099] text-xs mb-3 px-0.5">{sub} · {cards.length}</p>

      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 min-h-[100px] rounded-lg p-1 transition-colors ${
          isOver ? 'bg-[#1C1F24] ring-1 ring-[#F5A623]/40' : ''
        }`}
      >
        {cards.map((card) => (
          <BoardCard key={card.id} card={card} onClick={() => onCardClick(card)} />
        ))}
        {cards.length === 0 && (
          <p className="text-[#4A4F57] text-xs px-2 py-4">Nothing here yet</p>
        )}
      </div>
    </div>
  )
}