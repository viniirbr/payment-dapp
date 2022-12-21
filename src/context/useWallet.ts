import { useEffect, useState } from "react"
import Web3 from "web3";
import PaymentToken from "../../build/contracts/PaymentToken.json"

declare let window: {
    ethereum: any,
}

export const useWallet = () => {

    const [account, setAccount] = useState<string>("");
    const [paymentTokenContract, setPaymentTokenContract] = useState<any>()
    const [balance, setBalance] = useState<number | null>(null)

    useEffect(() => {
        const loadWallet = async () => {
            if (window.ethereum) {
                try {
                    const web3 = new Web3(Web3.givenProvider);
                    await web3.eth.requestAccounts()
                    let allAccounts = await web3.eth.getAccounts();
                    setAccount(allAccounts[0]);
                    const paymentTokenData = PaymentToken.networks["80001"];
                    if (paymentTokenData) {
                        const paymentTokenInstance = new web3.eth.Contract(
                            PaymentToken.abi as any[],
                            paymentTokenData.address
                        );
                        setPaymentTokenContract(paymentTokenInstance);
                        if (account) {
                            let balance = await paymentTokenInstance.methods.balanceOf(account).call()
                            setBalance(balance);
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        loadWallet()
    }, [account, balance])


    return {
        account, balance, paymentTokenContract
    }
}