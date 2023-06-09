import Image from 'next/image'
import Board from '@/components/Board'

export default function Home() {
  return (
    <main className="grid min-h-screen main-container place-content-center">
      <Board />
    </main>
  )
}
