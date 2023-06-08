import Image from 'next/image'
import Board from '@/components/Board'

export default function Home() {
  return (
    <main className="grid min-h-screen bg-teal-500 place-content-center">
      <Board />
    </main>
  )
}
