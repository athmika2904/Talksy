interface ProgressCardProps {
    streak: number
    conversations: number
    confidenceScore: number
}


function ProgressCard({
    streak,
    conversations,
    confidenceScore,
}: ProgressCardProps) {

    return (
        <div className="border border-white/10 bg-[#191917] p-8">

            <div className="flex flex-col justify-between gap-8 md:flex-row">

                <div>

                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                        YOUR PROGRESS
                    </p>


                    <h3 className="mt-3 text-3xl font-black tracking-tight">
                        Small steps count.
                    </h3>


                    <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                        You're building confidence one conversation
                        at a time. Keep going.
                    </p>

                </div>


                <div className="grid grid-cols-2 gap-10 md:min-w-[300px]">

                    <div>

                        <p className="text-4xl font-black">
                            {String(streak).padStart(2, "0")}
                        </p>


                        <p className="mt-2 text-xs uppercase tracking-widest text-white/30">
                            day streak
                        </p>

                    </div>


                    <div>

                        <p className="text-4xl font-black">
                            {String(
                                conversations
                            ).padStart(2, "0")}
                        </p>


                        <p className="mt-2 text-xs uppercase tracking-widest text-white/30">
                            conversations
                        </p>

                    </div>

                </div>

            </div>


            <div className="mt-10 h-1 bg-white/10">

                <div
                    className="h-full bg-[#c7ff3d] transition-all duration-500"
                    style={{
                        width: `${confidenceScore}%`,
                    }}
                />

            </div>


            <div className="mt-3 flex justify-between text-xs text-white/30">

                <span>
                    Confidence
                </span>


                <span>
                    {confidenceScore}%
                </span>

            </div>

        </div>
    )
}


export default ProgressCard