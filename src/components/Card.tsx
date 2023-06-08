'use client'

import { ICard } from "@/interfaces/ICard"
import { Dispatch, SetStateAction, useRef } from "react"
import delay from "@/utils/delay";

interface props {
    card: ICard,
    gameState: 'idle' | 'pending' | 'matched',
    setGameState: Dispatch<SetStateAction<"idle" | "pending" | "matched">>
}

export default function Card({card, gameState, setGameState} : props){

    const cardRef = useRef<HTMLDivElement | null>(null);
    const backRef = useRef<HTMLDivElement | null>(null);

    const src = ['/images/green.png', '/images/oxygen.png']

    async function handleClick() {
        const img = document.createElement('img')
        img.src = src[1]
        img.classList.add('absolute', 'inset-0')
        backRef.current?.appendChild(img)
        
        await delay(50)
        cardRef.current?.classList.add('clicked')

        if(gameState === 'idle'){
            setGameState('pending')
            
            return
        } else if(gameState === 'pending'){

        }

        await delay(1000)
        cardRef.current?.classList.remove('clicked')
        await delay(300)
        backRef.current?.removeChild(img)
    }



    return (
        <div className="w-9 h-14 rounded-md grid place-content-center mainCard" ref={cardRef} onClick={handleClick}>
            <div className="bg-green-600 frontCard" ></div>
            <div className="bg-orange-600 backCard grid place-content-center" ref={backRef}></div>
        </div>
    )
}