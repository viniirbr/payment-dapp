import { createContext } from "react";

interface WalletContextProps {
    account: string,
    balance: number|null,
    paymentTokenContract: any
}

export const WalletContext = createContext<WalletContextProps>({
    account: "",
    balance: null,
    paymentTokenContract: null
})