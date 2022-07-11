import React from 'react';

export interface CounterFormProps {
    increment: () => void;
    decrement: () => void;
    customAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
    counter: number;
}

export const CounterForm = (props: CounterFormProps) => {
    return (
        <div className="">
            <div className="flex flex-col  rounded-lg ">
                <h2 className='text-lg'>BID AMOUNT</h2>
                <div className="custom-number-input h-10 w-100 mb-4">
                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 mb-5">
                        <button onClick={props.decrement} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input onChange={e => props.customAmount(e)} type="number" className="outline-none focus:outline-none text-center w-full bg-white-300 font-normal text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" placeholder="Enter bid amount" ></input>
                        <button onClick={props.increment} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                            <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
