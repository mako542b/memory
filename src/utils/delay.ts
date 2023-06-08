export default function delay(milis: number){
    return new Promise(resolve => setTimeout(() => resolve(null), milis))
}