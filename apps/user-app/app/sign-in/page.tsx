import Link from "next/link";

export default function signIn(){
    return(
        <div>
            <div className="flex flex-row items-center justify-between px-4 border-b-2 border-b-white/40 h-15">
                <Link href={"/"}>
                    <div className="text-2xl font-bold">
                        PAYTM
                    </div>
                </Link>
                <div className="flex flex-row justify-center items-center gap-4">
                    <Link href={"/"}>
                        <button className="border-2 bg-white text-black p-2 font-bold rounded-xl h-10 w-25">
                            Log Out
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
                <div className="flex flex-col gap-3 w-100 h-100 border-2 border-white p-10 rounded-2xl">
                    <div className = "flex flex-col gap-1">
                        <h1>Email</h1>
                        <input
                            type="text"
                            placeholder="enter email"
                            className="border-2 border-white h-10 w-70 p-3 rounded-xl"

                        />
                    </div>
                    <div className = "flex flex-col gap-1">
                        <h1>Password</h1>
                        <input
                            type="password"
                            placeholder="enter password"
                            className="border-2 border-white h-10 w-70 p-3 rounded-xl"

                        />
                    </div>
                    
                </div>
            </div>

        </div>
    )
}