import React, { FormEvent } from 'react'
import { useWallet } from '../context/useWallet'
import { ArrowCircleDown } from 'phosphor-react'

function Transfer() {
    const { balance } = useWallet();

    async function transferTokens(event: FormEvent) {
        event.preventDefault();
        
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
                    <h2 className='bg-[#303947] rounded-xl text-white ml-4 p-1'>
                        PAY Token
                    </h2>
                    <input type="number" className='bg-transparent w-[50%] focus:outline-none text-right px-4 text-white
                text-lg md:w-[70%] h-[100%]'/>
                </div>
                <ArrowCircleDown size={36} color="#fff" className='mb-2' />
                <div className='bg-[#4f5765] h-14 rounded-2xl flex items-center justify-between w-full mb-6'>
                    <input type="number" className='bg-transparent w-full focus:outline-none text-right px-4 text-white
                text-lg h-[100%]'/>
                </div>
                <button className='bg-[#33649c] hover:bg-[#234771] h-14 rounded-2xl w-full font-bold 
                text-white transition-all duration-500 active:bg-[#558ac7]' type='submit'>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Transfer