import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Viewall from "../icons/viewall.svg?react"
import { useEffect, useState } from "react";
import { domain } from "../store";
import Calicon from "../icons/calender icon.svg?react";
import Micon from "../icons/M yellow Rate.svg?react";
import axios from "axios";

export default function TrendingGames() {
    const [trending, setTrending] = useState([])


    useEffect(() => {
        let url1 = domain + "/api/games";
        axios.get(url1, { params: { populate: '*', filters: { trending: { $eq: true } } } })
            .then((res) => {
                console.log(res.data.data)
                setTrending(res.data.data)
            })
    }, [])


    return (
        <div className='flex flex-col justify-center items-center w-[573px] h-[270px] gap-[24px] md:w-[1080px] md:h-[449px] md:px-[98px] lg:w-[1440px] lg:h-[527px] lg:gap-[32px] lg:px-[120px]'>
            <div className='flex w-[382px] justify-between items-center h-[36px] md:w-[884px] md:h-[51px] lg:w-[1200px] lg:h-[51px] '>

                <div className="flex w-[280px] h-[31px] md:w-[812px] md:h-[38px] md:w-[704px] md:h-[40px] lg:gap-[48px] lg:h-[44px]">
                    <h1 className='text-[20px] md:text-[24px]'>Trending Games</h1>
                    <div className="hidden md:block cursor-pointer w-[102px] px-[16px]"> <Viewall /> </div>
                </div>

                <div className="md:hidden cursor-pointer w-[102px] px-[16px] py-[6px]"> <Viewall /> </div>

                <div className='hidden md:flex md:flex-col md:w-[96px] md:h-[51px] md:gap-[8px]'>
                    <div className='flex md:gap-[8px] md:w-[96px] md:h-[31px]'>
                        <button className="cursor-pointer flex justify-center items-center w-[44px] h-[32px] hover:h-[30px] border rounded-md text-[#ededed]">
                            <GoArrowLeft size={20} />
                        </button>
                        <button className="cursor-pointer flex justify-center items-center w-[44px] h-[32px] hover:h-[30px] border rounded-md text-[#ededed]">
                            <GoArrowRight size={20} />
                        </button>
                    </div>

                    <div className='flex items-center w-[96px] h-[12px] gap-[11px]'>
                        <div className={`bg-[#FF5733] h-[12px] w-[28px] hover:h-[12px] hover:bg-[#ff2f00] rounded-md cursor-pointer`}></div>
                        <div className={`bg-[#452154] hover:bg-[#ff2f00] w-[7px] h-[7px] hover:w-[28px] hover:h-[12px] rounded-sm cursor-pointer`}></div>
                        <div className={`bg-[#452154] hover:bg-[#ff2f00] w-[7px] h-[7px] hover:w-[28px] hover:h-[12px] rounded-sm cursor-pointer`}></div>
                        <div className={`bg-[#452154] hover:bg-[#ff2f00] w-[7px] h-[7px] hover:w-[28px] hover:h-[12px] rounded-sm cursor-pointer`}></div>
                    </div>
                </div>



            </div>
                <div className="flex w-[533.6px] h-[297px] gap-[16px] md:w-[884px] md:h-[330px] md:gap-[12px] lg:w-[1200px] lg:h-[370px]">
                    {trending.map((el, index) => (
                        <div key={el.id} className="flex flex-col items-center w-[167.2px] h-[297px] gap-[12px] p-[8px] md:h-[330px] lg:w-[227.2px] lg:h-[370px] lg:p-[10px] md:transition-transform md:duration-300 md:ease-out md:hover:-translate-y-3">
                            <img src={domain + el.image[0]?.url} alt={el.name} className="w-[151.2px] h-[178px] md:h-[184px] cursor-pointer lg:w-[207.2px] lg:h-[239px]" />
                            <h1 className="w-[151.2px] h-[25px] text-[16px] lg:w-[207.2px] ">{el.name}</h1>
                            <div className="flex justify-between items-center w-[151.2px] h-[25px] lg:w-[207.2px]">
                                <div className="flex w-[75.6px] h-[20px] gap-[4px] lg:w-[97.6px]"> <Calicon /> <h1 className="text-[12px]">{el.date}</h1> </div>
                                <div className="flex w-[75.6px] justify-center items-center h-[25px] gap-[4px] lg:w-[97.6px]"> <Micon />
                                    <h1 className="text-[16px] text-[#FFCC00]">{el?.rate}</h1>
                                    <h1 className="text-[12px] text-[#979797]">/100</h1>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center lg:justify-between lg:flex-row w-[151.2px] h-[25px] md:w-[85px] md:h-[52px] md:gap-[8px] lg:w-[207.2px] lg:h-[25px]">
                                <div></div>
                                <div></div>
                            </div>

                        </div>
                    ))

                    }
                </div>

        </div>
    )
}
