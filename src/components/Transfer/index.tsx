import React, { FormEvent, useState } from 'react'
import { useWallet } from '../../context/useWallet'
import { ArrowCircleDown } from 'phosphor-react'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import transferMoney from "./transfer-money.json"
import Lottie from 'lottie-react'

function Transfer() {
    const { balance, sendPayment, loadingSendPayment } = useWallet();
    const [amount, setAmount] = useState<string>("");
    const [toAddress, setToAddress] = useState<string>("");
    const [onSendSuccess, setOnSendSuccess] = useState(false);

    async function transferTokens(event: FormEvent) {
        event.preventDefault();
        const error = await sendPayment(Number(amount), toAddress);
        if (error) {
            toast.error(error.message)
            return;
        }
        setAmount("")
        setToAddress("")
        toast.success("Transaction completed!")
        setOnSendSuccess(true)
        setTimeout(() => {
            setOnSendSuccess(false);
        }, 2000)
    }
    return (
        <div className='p-4 bg-[#303947] flex flex-col mx-3 box-border my-12 rounded-xl w-[100%] 
        md:min-w-[500px] md:mx-80 max-w-[600px]'>
            <header className='flex items-center justify-between mb-2'>
                <h3 className='text-white'>Send token</h3>
                <h4 className='text-white'>Balance: {balance} PAY</h4>
            </header>
            <form className='flex flex-col items-center' onSubmit={transferTokens}>
                <div className='bg-[#4f5765] h-14 rounded-2xl flex items-center justify-between mb-2 w-full'>
                    <div className='ml-4 flex items-center justify-around'>
                        <h2 className='bg-[#303947] rounded-xl text-white p-1 mr-1'>
                            PAY Token
                        </h2>
                        <h2 className='text-white cursor-pointer text-xs'
                            onClick={() => setAmount(balance?.toString() as string)}>
                            MAX
                        </h2>
                    </div>
                    <input type="number" className='bg-transparent w-[50%] focus:outline-none text-right px-4 text-white
                text-lg md:w-[70%] h-[100%]' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                {onSendSuccess ?
                    <Lottie animationData={transferMoney} style={{ width: "80px" }} />
                    :
                    <ArrowCircleDown size={36} color="#fff" className='mb-2' />}
                <div className='bg-[#4f5765] h-14 rounded-2xl flex items-center justify-between w-full mb-6'>
                    <input type="text" className='bg-transparent w-full focus:outline-none text-right px-4 text-white
                text-lg h-[100%]' value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
                </div>
                <button className='bg-[#33649c] hover:bg-[#234771] h-14 rounded-2xl w-full font-bold 
                text-white transition-all duration-500 active:bg-[#558ac7] disabled:bg-gray-400' type='submit'
                    disabled={(amount === "" || toAddress === "") ? true : false}>
                    {loadingSendPayment ? <BeatLoader color='white' /> : "Send"}
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Transfer