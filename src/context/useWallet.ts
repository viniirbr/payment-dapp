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
    const [error, setError] = useState<Error | null | unknown>(null)

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
                    setError(error)
                }
            }
        }
        loadWallet()
    }, [account, balance])

    const sendPayment = async (amount: number, to: string) => {
        try {
            // const web3 = new Web3(Web3.givenProvider);
            // const amountInWei = web3.utils.toWei(amount, "ether")
            if (balance && balance < (amount)) {
                throw ("You don't have enough tokens")
            }
            await paymentTokenContract.methods
            .transfer(to, amount)
            .send({
                from: account,
            });
            const bal = await paymentTokenContract.methods.balanceOf(account).call();
            setBalance(bal);

        } catch (error) {
            setError(error)
        }
    }

    return {
        account, balance, paymentTokenContract, sendPayment, error
    }
}