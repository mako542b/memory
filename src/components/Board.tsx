'use client'

import Card from "./Card"
import { ICard } from "@/interfaces/ICard"
import { useState, useRef, Dispatch, SetStateAction } from "react"
import ScoreBoard from "./ScoreBoard"
import { getBoard } from "@/utils/getBoard"
import delay from "@/utils/delay"
// import { getBoard } from "@/utils/getBoard"

interface props {
    level: "newbie" | "intermediate" | "master",
    board: ICard[],
    setBoard: Dispatch<SetStateAction<ICard[]>>,
    setLevel: Dispatch<SetStateAction<"newbie" | "intermediate" | "master" | null>>,
}

export default function Board({setLevel, level, setBoard, board } : props){

    // const [board, setBoard] = useState<ICard[]>([])
    const [gameState, setGameState] = useState<'idle' | 'pending' | 'matching'>('idle')
    const [pendingCard, setPendingCard] = useState<ICard | null>(null)
    const [clicks, setClicks] = useState<number>(0)
    const [matchedPairs, setMAtchedPairs] = useState<number>(0)
    const [pendingTimeoutId, setPendingTiemoutId ] = useState<NodeJS.Timeout | null>(null)

    const numOfPairs = level === 'master' ? 8 : level === 'intermediate' ? 6 : 4

    function mutateBoard(prev: ICard[], secCard: ICard, newState: 'matched' | 'closed' | 'closing'){
        let newBoard = [...prev]
        let index1 = newBoard.findIndex(c => c.position === pendingCard?.position)
        let index2 = newBoard.findIndex(c => c.position === secCard.position)
        newBoard[index1] = {...newBoard[index1], state: newState}
        newBoard[index2] = {...newBoard[index2], state: newState}
        return newBoard
    }

    function startPendingTimeout(card: ICard){
        let id = setTimeout(() => {
            setBoard(prev => {
                let newBoard = [...prev]
                let index1 = newBoard.findIndex(c => c.position === card.position)
                newBoard[index1] = {...newBoard[index1], state: 'closing'}
                return newBoard
            })
            setTimeout(() => {
                setBoard(prev => {
                    let newBoard = [...prev]
                    let index1 = newBoard.findIndex(c => c.position === card.position)
                    newBoard[index1] = {...newBoard[index1], state: 'closed'}
                    return newBoard
                })
            },1000)
            setPendingCard(null)
            setGameState('idle')
            console.log('timeout passed')
        }, 2000)
        setPendingTiemoutId(id)
    }
    
    async function checkForPair(secCard: ICard) {
        if(pendingTimeoutId) {
            clearTimeout(pendingTimeoutId)
            setPendingTiemoutId(null)
        }
        await delay(1000)
        // let isMatched = pendingCard?.pairName === secCard.pairName
        if(pendingCard?.pairName === secCard.pairName){
            setBoard(prev => mutateBoard(prev, secCard, 'matched'))
            setMAtchedPairs(prev => prev + 1)

        } else {
            setBoard(prev => mutateBoard(prev, secCard, 'closing'))
            setTimeout(() => {
                setBoard(prev => mutateBoard(prev, secCard, 'closed'))
            }, 1000)
        }
            setPendingCard(null)
            setGameState('idle')
            // return isMatched
    }

    function handleReset(){
        setGameState('idle')
        setMAtchedPairs(0)
        setClicks(0)
        setPendingCard(null)
        setBoard(getBoard(numOfPairs * 2))
    }

    function handleGoBack(){
        handleReset()
        setLevel(null)
    }
    

    return (
        <div className="grid content-center md:grid-flow-col">
            <div className="grid place-content-center grid-flow-col p-4 gap-6 md:grid-flow-row">
                <ScoreBoard clicks={clicks} scored={`${matchedPairs} / ${numOfPairs}`}/>
                <div className="grid gap-3">
                    <button onClick={handleReset} className="rounded-md outline outline-1 outline-white text-white tracking-wider uppercase font-semibold py-1 px-2 md:py-2 md:px-3 hover:opacity-60">Reset</button>
                    <button onClick={handleGoBack} className="rounded-md outline outline-1 outline-white text-white tracking-wider uppercase font-semibold py-1 px-2 md:py-2 md:px-3 hover:opacity-60">Go back</button>
                </div>
            </div>
            <div className="grid place-content-center gap-3 grid-rows-4 grid-flow-col p-3 md:p-8 rounded-lg overflow-hidden">
                {board.sort((a, b) => a.position > b.position ? 1 : -1).map(card => (
                    <Card 
                        card={card} 
                        key={card.key} 
                        gameState={gameState} 
                        setGameState={setGameState}
                        setPendingCard={setPendingCard}
                        checkForPair={checkForPair}
                        pendingCard={pendingCard}
                        setBoard={setBoard}
                        board={board}
                        setClicks={setClicks}
                        startPendingTimeout={startPendingTimeout}
                    />
                ))}
            </div>
        </div>
    )
}