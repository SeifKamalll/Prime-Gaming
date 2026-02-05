import { useEffect, useState } from "react";
import { domain } from "../store";
import useGameStore from "../store"
import axios from "axios";
import Calicon from "../icons/calender icon.svg?react";
import Micon from "../icons/M yellow Rate.svg?react";
import Trendarrow from "../icons/trending arrow.svg?react";
import Viewall from "../icons/viewall.svg?react"
export default function GamesByFilter() {
    const games = useGameStore((state) => state.games);
    const setGames = useGameStore((state) => state.setGames);
    const limit = useCardLimit();

    useEffect(() => {
        let url1 = domain + "/api/games";
        axios.get(url1, { params: { populate: '*' } })
            .then((res) => {
                setGames(res.data.data)
            })
    }, [])

    // from gpt
    function useCardLimit() {
        const getLimit = () => (window.innerWidth < 768 ? 4 : 10);
        const [limit, setLimit] = useState(getLimit());

        useEffect(() => {
            const onResize = () => setLimit(getLimit());
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
        }, []);

        return limit;
    }


    return (
        <div className='flex flex-col items-center w-[382px] h-[1493px] gap-[24px] md:w-[884px] md:h-[1221px] md:gap-[32px] lg:w-[1200px] lg:h-[1301px]'>
            {/* Header */}
            <div className='flex flex-col justify-center items-center w-full h-[92px] gap-[4px] md:h-[67px]'>
                <h1 className='text-[24px]'>Games By Filter</h1>
                <h1 className='text-[16px] text-[#979797] text-center'>At This Section You Can Search For Games by multiple filters</h1>
            </div>
            {/* Filters */}
            <div className='flex flex-col w-full h-[671px] gap-[24px] md:h-[350px] md:gap-[32px]'>

            </div>
            {/* Games */}
            <div className='flex flex-col items-center w-full h-[682px] gap-[24px] md:h-[740px] md:gap-[20px] lg:h-[820px]'>
                <div className='grid grid-cols-2 md:grid-cols-5 w-full h-[618px] gap-x-[16px] gap-y-[24px] md:h-[684px] md:gap-x-[12px] md:gap-y-[20px] lg:h-[760px] lg:gap-x-[16px]'>
                    {games?.slice(0, limit).map((el, i) => (
                        <div key={el.id} className="flex flex-col border border-[#9763AD] rounded-xl items-center w-[167.2px] h-[297px] gap-[12px] p-[8px] md:h-[330px] lg:w-[227.2px] lg:h-[370px] lg:p-[10px] hover:scale-98 transition-[opacity,scale]">
                            <img src={domain + el.image?.[0]?.url} alt={el.name} className="w-[151.2px] h-[178px] md:h-[184px] cursor-pointer lg:w-[207.2px] lg:h-[239px]" />
                            <h1 className="w-[151.2px] h-[25px] text-[16px] lg:w-[207.2px] ">{el.name}</h1>
                            <div className="flex justify-between items-center w-[151.2px] h-[25px] lg:w-[207.2px]">
                                <div className="flex w-[75.6px] items-center h-[20px] gap-[4px] lg:w-[97.6px]"> <Calicon className='w-[20px]' /> <h1 className="text-[12px] text-[#979797]">{el.release}</h1> </div>
                                <div className="flex w-[75.6px] justify-center items-center h-[25px] gap-[4px] lg:w-[97.6px]"> <Micon className='w-[20px] h-[20px]' />
                                    <h1 className="text-[16px] text-[#FFCC00]">{el?.rate}</h1>
                                    <h1 className="text-[12px] text-[#979797]">/100</h1>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center lg:justify-between lg:flex-row w-[151.2px] h-[25px] md:w-[85px] md:h-[52px] md:gap-[8px] lg:w-[207.2px] lg:h-[25px]">
                                <div className="flex justify-center items-center md:w-[85px] md:h-[25px] gap-[8px]"> <del className="text-[#979797] text-[12px]"> {el.price + "$"}</del> <h1 className="text-[16px]"> {el.disprice + "$"} </h1> <h1 className="bg-[#FF5733] text-[10px] w-[25px] h-[14px] font-extralight text-center rounded-md"> {Math.round(((el.price - el.disprice) / el.price) * 100) + "$"} </h1>  </div>
                                <div className="hidden md:flex justify-center items-center md:gap-[4px] md:w-[67px] md:h-[19px]"><h1 className="text-[12px] cursor-pointer">Buy Now</h1> <Trendarrow className='w-[15px]' /> </div>
                            </div>

                        </div>
                    ))}
                </div>
                
                <button className="cursor-pointer justify-center items-center border border-[#FF5733] rounded-2xl w-[130px] h-[40px] md:w-[102px] md:h-[36px] lg:w-[130px] lg:h-[40px] hover:bg-gray-950"> <h1 className="text-[16px] md:text-[14px] lg:text-[16px] text-[#FF5733]">View All&nbsp;&nbsp;<span className="text-[20px]">{">"}</span></h1> </button>
            </div>

        </div>
    )
}
