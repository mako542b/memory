'use client'

import Card from "./Card"
import { ICard } from "@/interfaces/ICard"
import { getRandom } from "@/utils/getRandom"
import { useState, useEffect, useRef } from "react"
import { getBoard } from "@/utils/getBoard"

export default function Board(){
    const [board, setBoard] = useState<ICard[]>([])
    const [gameState, setGameState] = useState<'idle' | 'pending' | 'matching'>('idle')
    const [pendingCard, setPendingCard] = useState<ICard | null>(null)
    const ref = useRef<any | null>(null)

    useEffect(() => {
        setBoard(getBoard(16))
    }, [])
    
    function checkForPair(secCard: ICard) {
        let isMatched = pendingCard?.pairName === secCard.pairName
        if(isMatched){
            setBoard(prev => {
                let newBoard = [...prev]
                let index1 = newBoard.findIndex(c => c.position === pendingCard?.position)
                let index2 = newBoard.findIndex(c => c.position === secCard.position)
                newBoard[index1] = {...newBoard[index1], state: 'matched'}
                newBoard[index2] = {...newBoard[index2], state: 'matched'}
                return newBoard
            })
        } else {
            setBoard(prev => {
                let newBoard = [...prev]
                let index1 = newBoard.findIndex(c => c.position === pendingCard?.position)
                let index2 = newBoard.findIndex(c => c.position === secCard.position)
                newBoard[index1] = {...newBoard[index1], state: 'closing'}
                newBoard[index2] = {...newBoard[index2], state: 'closing'}
                return newBoard
            })

            setTimeout(() => {
                setBoard(prev => {
                    let newBoard = [...prev]
                    let index1 = newBoard.findIndex(c => c.position === pendingCard?.position)
                    let index2 = newBoard.findIndex(c => c.position === secCard.position)
                    newBoard[index1] = {...newBoard[index1], state: 'closed'}
                    newBoard[index2] = {...newBoard[index2], state: 'closed'}
                    return newBoard
                })
            }, 1000)
        }
            setPendingCard(null)
            setGameState('idle')
            return isMatched
    }
    

    return (
            <div className="grid gap-3 grid-cols-4 p-8 rounded-lg overflow-hidden">
                {board.sort((a, b) => a.position > b.position ? 1 : -1).map(card => (
                    <Card 
                        card={card} 
                        key={card.position} 
                        gameState={gameState} 
                        setGameState={setGameState}
                        setPendingCard={setPendingCard}
                        checkForPair={checkForPair}
                        pendingCard={pendingCard}
                        setBoard={setBoard}
                        board={board}
                    />
                ))}
            </div>
    )
}