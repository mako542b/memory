import { Dispatch, SetStateAction } from "react"

interface props {
    handleClick: (level: "newbie" | "intermediate" | "master") => void
}

export default function({handleClick} : props) {



    return (
        <div className="font-mono tracking-wider">
            <h1 className="text-3xl uppercase font-bold my-6">Choose level</h1>
            <ul className="grid gap-3  text-[rgb(200,100,20)] text-xl ">
                <li className="grid">
                    <button onClick={() => handleClick('newbie')} className="gradient rounded-md tracking-wider uppercase font-semibold py-3 px-6 hover:opacity-60">Newbe</button>
                </li>
                
                <li className="grid">
                    <button onClick={() => handleClick('intermediate')} className="gradient rounded-md tracking-wider uppercase font-semibold py-3 px-6 hover:opacity-60">Intermediate</button>
                </li>

                <li className="grid">
                    <button onClick={() => handleClick('master')} className="gradient rounded-md tracking-wider uppercase font-semibold py-3 px-6 hover:opacity-60">Master</button>
                </li>
            </ul>
        </div>
    )
}