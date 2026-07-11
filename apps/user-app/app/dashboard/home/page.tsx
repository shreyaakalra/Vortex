// this is home

import Link from "next/link";

export default function Home(){
    return(
        <div className="flex flex-col gap-3 justify-end p-10">
            <Link href={"/dashboard/home"}>
                <button className="border-2 border-white w-45 h-15">Home</button>
            </Link>
            <Link href={"/dashboard/explore"}>
                <button className="border-2 border-white w-45 h-15">Explore</button>
            </Link>
            <Link href={"/dashboard/transfer"}>
                <button className="border-2 border-white w-45 h-15">Transfer</button>
            </Link>
            <Link href={"/dashboard/transactions"}>
                <button className="border-2 border-white w-45 h-15">Transactions</button>
            </Link>
            
            
        </div>
    )
}