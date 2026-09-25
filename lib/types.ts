export type CardStatus = 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected'

export interface ApplicationCard {
  id: string
  user_id: string
  company: string
  role: string
  status: CardStatus
  deadline: string | null
  job_link: string | null
  notes: string | null
  created_at: string
}

export const COLUMNS: { id: CardStatus; label: string; sub: string; dot: string }[] = [
  { id: 'wishlist', label: 'Wishlist', sub: 'Not yet applied', dot: '#5B6472' },
  { id: 'applied', label: 'Applied', sub: 'In transit', dot: '#4C8DFF' },
  { id: 'interview', label: 'OA / Interview', sub: 'Active', dot: '#C084FC' },
  { id: 'offer', label: 'Offer', sub: 'Landed', dot: '#34D399' },
  { id: 'rejected', label: 'Rejected', sub: 'Closed', dot: '#F97066' },
]