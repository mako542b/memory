import { ICard } from "@/interfaces/ICard";
import { getRandom } from "./getRandom";
import imageSources from "./imageSources";
import idGenerator from "./idGenerator"



export function getBoard(cardsQuantity: number){
    
    let newBoard : ICard[] = []
    let numOfPairs = cardsQuantity / 2
    const pairs : number[] = Array(numOfPairs).fill(0).map((_, i) => i);
    let numbers = Array(cardsQuantity).fill(0).map((n, i) => i)
    const src = imageSources();
    for(let i = 0; i < numOfPairs; i++){
        let character = pairs.splice(getRandom(numOfPairs) - i, 1)[0]
        let position1 = numbers.splice(getRandom(numbers.length),1)[0]
        let position2 = numbers.splice(getRandom(numbers.length),1)[0]
        let url = src.splice(getRandom(src.length),1)[0]
        let pair1 : ICard = {
            images: url,
            pairName: character,
            position: position1,
            matched: false,
            state: 'closed',
            rnd: 0,
            key: idGenerator(),
        }
        let pair2 : ICard = {
            images: url,
            pairName: character,
            position: position2,
            matched: false,
            state: 'closed',
            rnd: 0,
            key: idGenerator(),
        }
        newBoard.push(pair1)
        newBoard.push(pair2)
    }
    return newBoard
}