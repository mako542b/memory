'use client'

import Card from "./Card"
import { ICard } from "@/interfaces/ICard"
import { getRandom } from "@/utils/getRandom"
import { useState, useEffect } from "react"
import { getBoard } from "@/utils/getBoard"

export default function Board(){
    const [board, setBoard] = useState<ICard[]>([])
    const [gameState, setGameState] = useState<'idle' | 'pending' | 'matched'>('idle')
    
    const numbers : number[] = [1,2,3,4,5,6,7,8]

    useEffect(() => {
        setBoard(getBoard(8))
    }, [])
    
    async function waitForCard() {
        
    }
    

    return (
        <div className="grid gap-3 grid-cols-4">
            {board.sort((a, b) => a.position > b.position ? 1 : -1).map(card => (
                <Card 
                    card={card} 
                    key={card.position} 
                    gameState={gameState} 
                    setGameState={setGameState}
                />
            ))}
        </div>
    )
}