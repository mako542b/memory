'use client'

interface props {
    clicks: number,
    scored: string,
}

export default function ScoreBoard({clicks, scored}: props) {

    return(
        <div className="grid gap-3 text-xl place-content-center text-white font-mono md:pb-3">
            <div className="flex justify-center gap-2">
                <img src="./images/finger-click.png" alt="click" className="w-6 rounded-full"/>
                <p className="">{clicks}</p>
            </div>
            <div className="flex justify-center">
                {scored}
            </div>
        </div>
    )
}