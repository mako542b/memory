export default function formatTime(time: number){
    let seconds = Math.floor((time % (1000 * 60)) / 1000)
    let minutes = Math.floor(time % (1000 * 60 * 60) / (1000 * 60))
    let format = minutes < 10 ? '0' + minutes : minutes
    format += ':'
    format += seconds < 10 ? '0' + String(seconds) : String(seconds)
    return format
}