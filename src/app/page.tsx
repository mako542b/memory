'use client'

import Image from 'next/image'
import Board from '@/components/Board'
import ChooseLevel from '@/components/ChooseLevel'
import { useState } from 'react'
import { ICard } from '@/interfaces/ICard'
import { getBoard } from "@/utils/getBoard"

export default function Home() {

  const [level, setLevel] = useState<'newbie' | 'intermediate' | 'master' | null>(null)
  const [board, setBoard] = useState<ICard[]>([])

  function handleSetLevel(level: "newbie" | "intermediate" | "master") {
    setLevel(level)
    let noOfCards = level === 'master' ? 16 : level === 'intermediate' ? 12 : 8
    setBoard(getBoard(noOfCards))
}

  return (
    <main className="grid min-h-screen main-container place-content-center">
      { level ? (
          <Board level={level} setLevel={setLevel} board={board} setBoard={setBoard} /> ) : (
          <ChooseLevel handleClick={handleSetLevel}/>
      )}
    </main>
  )
}
