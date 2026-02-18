import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Viewall from "../icons/viewall.svg?react"
import { useEffect, useState } from "react";
import { domain } from "../store";
import Calicon from "../icons/calender icon.svg?react";
import Micon from "../icons/M yellow Rate.svg?react";
import Trendarrow from "../icons/trending arrow.svg?react";
import axios from "axios";

export default function TrendingGames() {
    const [trending, setTrending] = useState([])
    const [activeDot, setActiveDot] = useState(0)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const itemsPerPage = 5;

    const pages = Math.ceil(trending.length / itemsPerPage);

    const startIndex = activeDot * itemsPerPage;
    const visibleGames = trending.slice(startIndex, startIndex + itemsPerPage);



    useEffect(() => {
        let url1 = domain + "/api/games";
        axios.get(url1, { params: { populate: '*', filters: { trending: { $eq: true } } } })
            .then((res) => {
                setTrending(res.data.data)
            })
    }, [])

    useEffect(() => {
        const onResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // 🔑 reset pagination when entering mobile
            if (mobile) {
                setActiveDot(0);
            }
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);


    return (
        <div className='flex flex-col justify-center w-full md:w-[884px] lg:w-[1200px] items-center gap-[24px] md:h-[405px] lg:h-[453px] lg:gap-[32px]'>
            <div className='flex justify-center items-center h-[36px] w-full md:h-[51px] lg:max-w-[1200px] lg:h-[51px] '>

                <div className="flex w-[280px] h-[31px] md:w-[812px] md:h-[38px] md:w-[704px] lg:w-[1200px] md:h-[40px] lg:gap-[48px] lg:h-[44px]">
                    <h1 className='text-[20px] md:text-[24px]'>Trending Games</h1>
                    <div className="hidden md:block cursor-pointer w-[102px] px-[16px]"> <Viewall /> </div>
                </div>

                <div className="md:hidden cursor-pointer w-[102px] px-[16px] py-[6px]"> <Viewall /> </div>

                <div className='hidden md:flex md:flex-col md:w-[96px] md:h-[51px] md:gap-[8px]'>
                    <div className='flex md:gap-[8px] md:w-[96px] md:h-[31px]'>
                        <button onClick={() => setActiveDot((prev) => prev === 0 ? pages - 1 : prev - 1)} className="cursor-pointer flex justify-center items-center w-[44px] h-[32px] hover:scale-105 transition-[opacity,scale] border rounded-md text-[#ededed]">
                            <GoArrowLeft size={20} />
                        </button>
                        <button onClick={() => setActiveDot((prev) => prev === pages - 1 ? 0 : prev + 1)} className="cursor-pointer flex justify-center items-center w-[44px] h-[32px] hover:scale-105 transition-[opacity,scale] border rounded-md text-[#ededed]">
                            <GoArrowRight size={20} />
                        </button>
                    </div>

                    <div className='flex items-center w-full h-[12px] gap-[11px]'>
                        {Array.from({ length: pages }).map((_, index) => (
                            <div key={index} onClick={() => { setActiveDot(index) }} className={`${activeDot === index ? "bg-[#FF5733] h-[12px] w-[28px] hover:bg-[#ff2f00] rounded-md cursor-pointer" : "bg-[#452154] hover:bg-[#ff2f00] w-[7px] h-[7px] hover:w-[28px] hover:h-[12px] rounded-md cursor-pointer"}`}></div>
                        ))}
                    </div>
                </div>


            </div>
            <div className="flex w-[406px] no-scrollbar overflow-x-auto md:w-full h-[297px] gap-[16px] md:max-w-[884px] md:h-[330px] md:gap-[12px] lg:w-[1200px] lg:max-w-[1200px] lg:h-[370px]">
                {(isMobile ? trending : visibleGames)?.map((el, index) => (
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
                ))

                }
            </div>

        </div>
    )
}
