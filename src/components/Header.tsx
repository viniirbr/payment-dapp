import Image from "next/image";
import { useContext, useEffect } from "react"
import { WalletContext } from "../context/WalletContext"
import logo from '../../public/Polygon_blockchain_logo.png'

export function Header() {

    const { account } = useContext(WalletContext);

    return (
        <header className="py-4 px-4 flex flex-col items-center justify-between md:py-8 md:px-12 md:flex-row">
            <div className="mb-2 md:mb-0 flex items-center">
                <Image src={logo} alt="logo" width={50} style={{ borderRadius: 10 }} className="mr-2" />
                <h1 className="text-white text-xl font-bold">Polygon Network</h1>
            </div>
            <div className="flex flex-col items-center justify-around md:flex-row">
                <h5 className="text-white text-sm mb-2 md:mb-0">{account}</h5>
                <h3 className={`p-1 border-2 ${account ? "border-green-500" : "border-red-500"} ml-2 rounded-lg 
                font-semibold ${account ? "text-green-500" : "text-red-500"}`}>
                    {account ? "Connected" : "Not connected"}
                </h3>
            </div>
        </header>
    )
}

export default Header