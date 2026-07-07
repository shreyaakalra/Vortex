import Link from "next/link";

export default function Navbar(){
    return(
        <div className="flex flex-row items-center justify-between px-4 border-b-2 border-b-white/40 h-15">
            <Link href={"/"}>
                <div className="text-2xl font-bold">
                    PAYTM
                </div>
            </Link>
            <div className="flex flex-row justify-center items-center gap-4">
                <Link href={"/sign-up"}>
                    <button className="border-2 bg-white text-black p-2 font-bold rounded-xl h-10 w-25">
                        Sign Up
                    </button>
                </Link>
                <Link href={"/sign-in"}>
                    <button className="border-2 bg-white text-black p-2 font-bold rounded-xl h-10 w-25">
                        Sign In
                    </button>
                </Link>
                
            </div>
        </div>
    )
}