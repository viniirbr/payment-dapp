import { createContext } from "react";

interface WalletContextProps {
    account: string,
    balance: number|null,
    paymentTokenContract: any,
    sendPayment: (amount: number, to: string) => Promise<void | unknown>,
    loadingSendPayment: boolean
}

export const WalletContext = createContext<WalletContextProps>({
    account: "",
    balance: null,
    paymentTokenContract: null,
    sendPayment: () => new Promise(() => {}),
    loadingSendPayment: false
})