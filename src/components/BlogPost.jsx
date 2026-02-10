import { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Viewall from "../icons/viewall.svg?react"

export default function BlogPost() {
    const [activeDot, setActiveDot] = useState(0)

    const dotsCount = 4;
    return (
        <div className="flex flex-col w-[382px] h-[303px] gap-[24px] md:w-[884px] md:h-[455px] lg:w-[1200px]">
            {/* Text Line */}
            <div className='flex justify-center items-center h-[36px] w-full md:h-[51px] lg:max-w-[1200px] lg:h-[51px] '>

                <div className="flex w-[280px] h-[31px] md:w-[812px] md:h-[38px] md:w-[704px] lg:w-[1200px] md:h-[40px] lg:gap-[48px] lg:h-[44px]">
                    <h1 className='text-[20px] md:text-[24px]'>Blog Post</h1>
                    <div className="hidden md:block cursor-pointer w-[102px] px-[16px]"> <Viewall /> </div>
                </div>

                <div className="md:hidden cursor-pointer w-[102px] px-[16px] py-[6px]"> <Viewall /> </div>

                <div className='hidden md:flex md:flex-col md:w-[96px] md:h-[51px] md:gap-[8px]'>
                    <div className='flex md:gap-[8px] md:w-[96px] md:h-[31px]'>
                        <button onClick={() => { setActiveDot((prev) => (prev - 1 + dotsCount) % dotsCount) }} className="cursor-pointer flex justify-center items-center w-[44px] h-[32px] hover:scale-105 transition-[opacity,scale] border rounded-md text-[#ededed]">
                            <GoArrowLeft size={20} />
                        </button>
                        <button onClick={() => setActiveDot((prev) => (prev + 1) % dotsCount)} className="cursor-pointer flex justify-center items-center w-[44px] h-[32px] hover:scale-105 transition-[opacity,scale] border rounded-md text-[#ededed]">
                            <GoArrowRight size={20} />
                        </button>
                    </div>

                    <div className='flex items-center w-full h-[12px] gap-[11px]'>
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} onClick={() => { setActiveDot(index) }} className={`${activeDot === index ? "bg-[#FF5733] h-[12px] w-[28px] hover:bg-[#ff2f00] rounded-md cursor-pointer" : "bg-[#452154] hover:bg-[#ff2f00] w-[7px] h-[7px] hover:w-[28px] hover:h-[12px] rounded-md cursor-pointer"}`}></div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}
