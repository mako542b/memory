export default function LoadingBar(){
    return (
        <div className="absolute inset-x-0 overflow-hidden h-2 -bottom-1 md:h-auto md:inset-y-0 md:w-2 md:left-auto md:right-2 rounded-full opacity-80 outline outline-[1px] outline-white">
            <span className="bg-red-600 absolute inset-y-0 left-0 w-full animate-bar md:inset-y-auto md:bottom-0 md:inset-x-0"></span>
        </div>
    )
}