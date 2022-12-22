import { FC, ReactNode } from "react"
import { useWallet } from "./useWallet"
import { WalletContext } from "./WalletContext"

interface Props {
    children: ReactNode
}

export const WalletProvider: FC<Props> = ({ children }: Props) => {
    const { account, balance, paymentTokenContract, sendPayment, loadingSendPayment } = useWallet();
    return <WalletContext.Provider value={{
        account,
        balance,
        paymentTokenContract,
        sendPayment,
        loadingSendPayment
    }}>{children}</WalletContext.Provider>
} 