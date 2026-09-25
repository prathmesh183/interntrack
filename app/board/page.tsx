'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { supabase } from '@/lib/supabaseClient'
import { ApplicationCard, CardStatus, COLUMNS } from '@/lib/types'
import BoardColumn from '@/components/BoardColumn'
import CardModal from '@/components/CardModal'

export default function BoardPage() {
  const router = useRouter()
  const [cards, setCards] = useState<ApplicationCard[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<ApplicationCard | null>(null)
  const [defaultStatus, setDefaultStatus] = useState<CardStatus>('wishlist')
  const [userEmail, setUserEmail] = useState('')

  const loadCards = useCallback(async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setCards(data as ApplicationCard[])
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login')
        return
      }
      setUserEmail(data.session.user.email || '')
      loadCards()
    })
  }, [router, loadCards])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const newStatus = over.id as CardStatus
    const card = cards.find((c) => c.id === active.id)
    if (!card || card.status === newStatus) return

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, status: newStatus } : c))
    )
    await supabase.from('cards').update({ status: newStatus }).eq('id', card.id)
  }

  const openAddModal = (status: CardStatus) => {
    setEditingCard(null)
    setDefaultStatus(status)
    setModalOpen(true)
  }

  const openEditModal = (card: ApplicationCard) => {
    setEditingCard(card)
    setModalOpen(true)
  }

  const handleSave = async (data: Partial<ApplicationCard>) => {
    if (editingCard) {
      await supabase.from('cards').update(data).eq('id', editingCard.id)
    } else {
      const { data: userData } = await supabase.auth.getUser()
      await supabase.from('cards').insert({ ...data, user_id: userData.user?.id })
    }
    setModalOpen(false)
    loadCards()
  }

  const handleDelete = async () => {
    if (!editingCard) return
    await supabase.from('cards').delete().eq('id', editingCard.id)
    setModalOpen(false)
    loadCards()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#15171B] flex items-center justify-center">
        <p className="text-[#8A9099] text-sm">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#15171B]">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E35]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
          <h1 className="font-[family-name:var(--font-display)] text-[#ECEDEE] font-semibold">
            InternTrack
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#8A9099] text-sm hidden sm:block">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-[#8A9099] hover:text-[#ECEDEE] text-sm border border-[#2A2E35] rounded-lg px-3 py-1.5 hover:border-[#3A3F47] transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="p-6 overflow-x-auto">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 min-w-max">
            {COLUMNS.map((col) => (
              <BoardColumn
                key={col.id}
                id={col.id}
                label={col.label}
                sub={col.sub}
                dot={col.dot}
                cards={cards.filter((c) => c.status === col.id)}
                onCardClick={openEditModal}
                onAddClick={() => openAddModal(col.id)}
              />
            ))}
          </div>
        </DndContext>
      </main>

      <CardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={editingCard ? handleDelete : undefined}
        initial={editingCard}
        defaultStatus={defaultStatus}
      />
    </div>
  )
}