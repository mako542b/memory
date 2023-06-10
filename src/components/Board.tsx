'use client'

import Card from "./Card"
import { ICard } from "@/interfaces/ICard"
import { useState, Dispatch, SetStateAction, useRef } from "react"
import ScoreBoard from "./ScoreBoard"
import { getBoard } from "@/utils/getBoard"
import delay from "@/utils/delay"
import formatTime from "@/utils/formatTime"
import LoadingBar from "./LoadingBar"

interface props {
    level: "newbie" | "intermediate" | "master",
    board: ICard[],
    setBoard: Dispatch<SetStateAction<ICard[]>>,
    setLevel: Dispatch<SetStateAction<"newbie" | "intermediate" | "master" | null>>,
}

export default function Board({setLevel, level, setBoard, board } : props){

    const [gameState, setGameState] = useState<'idle' | 'pending' | 'matching' | 'finnished' | 'starting'>('starting')
    const [pendingCard, setPendingCard] = useState<ICard | null>(null)
    const [clicks, setClicks] = useState<number>(0)
    const [matchedPairs, setMAtchedPairs] = useState<number>(0)
    const [timer, setTimer] = useState<number>(0)
    
    const timerTimeoutId = useRef<NodeJS.Timer | null>(null)
    const numOfPairs = level === 'master' ? 8 : level === 'intermediate' ? 6 : 4
    const pendingTimeoutId = useRef<NodeJS.Timeout | null>(null)


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
        }, 2000)
        pendingTimeoutId.current = id
    }
    
    async function checkForPair(secCard: ICard) {
        if(pendingTimeoutId.current) {
            clearTimeout(pendingTimeoutId.current)
            pendingTimeoutId.current = null
        }
        await delay(1000)
        if(pendingCard?.pairName === secCard.pairName){
            setBoard(prev => mutateBoard(prev, secCard, 'matched'))
            let currentMatched = matchedPairs + 1
            setMAtchedPairs(currentMatched)
            if(currentMatched === numOfPairs){
                setGameState('finnished')
                if(timerTimeoutId.current) clearInterval(timerTimeoutId.current)
                return
            }


        } else {
            setBoard(prev => mutateBoard(prev, secCard, 'closing'))
            setTimeout(() => {
                setBoard(prev => mutateBoard(prev, secCard, 'closed'))
            }, 1000)
        }
            setPendingCard(null)
            setGameState('idle')
    }

    function handleReset(){
        setGameState('starting')
        setMAtchedPairs(0)
        setClicks(0)
        setPendingCard(null)
        setBoard(getBoard(numOfPairs * 2))
        if(timerTimeoutId.current) clearInterval(timerTimeoutId.current)
        timerTimeoutId.current = null
        setTimer(0)
    }

    function handleGoBack(){
        handleReset()
        setLevel(null)
    }

    function startTimer(){
        timerTimeoutId.current = setInterval(() => {
            setTimer(prev => prev + 1000)
        }, 1000)
    }

    return (
        <>
            <div className={`grid md:grid-flow-col`}>
            <div className={`grid ${gameState === 'finnished' ? 'grid-flow-row' : 'grid-flow-col'} place-content-center p-4 gap-y-2 gap-x-8 md:grid-flow-row md:pr-12 relative md:self-center`}>
                <div className="grid place-content-center text-white font-mono text-lg">
                    <p>{formatTime(timer)}</p>
                </div>
                <ScoreBoard clicks={clicks} scored={`${matchedPairs}/${numOfPairs}`}/>
                <div className="grid gap-3 place-content-center">
                    <button onClick={handleReset} className="rounded-md text-sm md:text-lg outline outline-1 outline-white text-white tracking-wider uppercase font-semibold py-1 px-2 md:py-2 md:px-3 hover:opacity-60">Reset</button>
                    <button onClick={handleGoBack} className="rounded-md max-w-[6ch] text-sm md:text-lg outline outline-1 outline-white text-white tracking-wider uppercase font-semibold py-1 px-2 md:py-2 md:px-3 hover:opacity-60">Go back</button>
                </div>
                {gameState === 'finnished' ? (
                    <h1 className="text-3xl text-white font-mono uppercase">Congratulations</h1>
                ) : gameState === 'pending' ? (
                    <LoadingBar />
                ) : null}
            </div>
            {gameState !== 'finnished' ? ( 
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
                            startTimer={startTimer}
                        />
                    ))}
                </div>
            ) : (
                null
                )}
            </div>
        </>
    )
}