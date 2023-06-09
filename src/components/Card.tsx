'use client'

import { ICard } from "@/interfaces/ICard"
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react"
import { getRandom } from "@/utils/getRandom"

interface props {
    card: ICard,
    gameState: 'idle' | 'pending' | 'matching',
    setGameState: Dispatch<SetStateAction<"idle" | "pending" | "matching">>,
    setPendingCard: Dispatch<SetStateAction<ICard | null>>,
    checkForPair: (secCard: ICard) => void,
    pendingCard: ICard | null,
    board: ICard[],
    setBoard: Dispatch<SetStateAction<ICard[]>>,
    setClicks: Dispatch<SetStateAction<number>>,
    startPendingTimeout: (card: ICard) => void,
}

export default function Card({card, startPendingTimeout, gameState, setGameState, setPendingCard, checkForPair, pendingCard, board, setBoard, setClicks} : props){

    const cardRef = useRef<HTMLDivElement | null>(null)
    const [rnd, setRnd] = useState<number>(0)

    async function handleClick() {
        if(card.state !== 'closed' || gameState === 'matching') return
        
        setRnd(getRandom(card.images.length))
        
        setBoard(prev => {
            let newBoard = [...prev]
            const cardIndex = newBoard.findIndex(c => c.position === card.position)
            newBoard[cardIndex] = {...newBoard[cardIndex], state:'opened'}
            return newBoard
        })

        if (gameState === 'idle'){
            setClicks(prev => prev + 1)
            setGameState('pending')
            setPendingCard(card)
            // setTimeout(() => {
                startPendingTimeout(card)
            // }, 1);
        } else {
            setGameState('matching')
            checkForPair(card)
            setTimeout(() => {
            }, 1000)
        }
            
    }

    const cardNumber = useCallback(function (){

        if(card.state === 'closed') {
            cardRef?.current?.classList.remove('clicked')
            return null;
        }

        if(card.state === 'opened'){
            setTimeout(() => {
                cardRef?.current?.classList.add('clicked')
            }, 30)
            } else if(card.state === 'closing') {
                cardRef?.current?.classList.remove('clicked')
            } else {
                cardRef?.current?.classList.add('opacity-0', 'pointer-events-none', 'cursor-default')
            }

        let image = card.images[rnd]
        return (
            <img src={image} alt="#" className="h-full w-full object-cover"/>
        )

    },[card.state, rnd])



    return (
        <div 
            className={`w-12 xs:w-16 sm:w-20 aspect-[3/4] rounded-md grid place-content-center mainCard overflow-hidden`} 
            ref={cardRef} 
            onClick={handleClick}
            
        >
            <div className="frontCard" >
            </div>
            <div className="backCard">
                {cardNumber()}
            </div>
        </div>
    )
}