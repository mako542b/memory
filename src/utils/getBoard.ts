import { ICard } from "@/interfaces/ICard";
import { getRandom } from "./getRandom";


export function getBoard(cardsQuantity: number){
    const figures : string[] = ["queen", "king", "ace", "walet"];
    let newBoard : ICard[] = []
    let numOfPairs = cardsQuantity / 2
    let numbers = Array(cardsQuantity).fill(0).map((n, i) => i)
    for(let i = 0; i < numOfPairs; i++){
        let character = figures.splice(getRandom(numOfPairs) - i, 1)[0]
        let position1 = numbers.splice(getRandom(numbers.length),1)[0]
        let position2 = numbers.splice(getRandom(numbers.length),1)[0]
        let pair1 : ICard = {
            images:[],
            pairName: character,
            position: position1,
            matched: false,
        }
        let pair2 : ICard = {
            images:[],
            pairName: character,
            position: position2,
            matched: false,
        }
        newBoard.push(pair1)
        newBoard.push(pair2)
    }
    return newBoard
}