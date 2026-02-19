import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Viewall from "../icons/viewall.svg?react"
import { useEffect, useState } from "react";
import { domain } from "../store";
import Calicon from "../icons/calender icon.svg?react";
import Trendarrow from "../icons/trending arrow.svg?react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpcomingGames() {
    const navigate = useNavigate()

    const [upcoming, setUpcoming] = useState([])
    const [activeDot, setActiveDot] = useState(0)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const itemsPerPage = 5;

    const pages = Math.ceil(upcoming.length / itemsPerPage);

    const startIndex = activeDot * itemsPerPage;
    const visibleUpComing = upcoming.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        let url1 = domain + "/api/games";
        axios.get(url1, { params: { populate: '*', filters: { upcoming: { $eq: true } } } })
            .then((res) => {
                setUpcoming(res.data.data)
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
                    <h1 className='text-[20px] md:text-[24px]'>UpComing Games</h1>
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
            <div className="flex w-[406px] md:w-full h-[297px] overflow-x-auto no-scrollbar gap-[16px] md:max-w-[884px] md:h-[330px] md:gap-[12px] lg:w-[1200px] lg:max-w-[1200px] lg:h-[370px]">
                {(isMobile ? upcoming : visibleUpComing)?.map((el, index) => (
                    <div key={el.id} className="flex flex-col border border-[#9763AD] rounded-xl items-center w-[167.2px] h-[297px] gap-[12px] p-[8px] md:h-[330px] lg:w-[227.2px] lg:h-[370px] lg:p-[10px] hover:scale-98 transition-[opacity,scale]">
                        <img src={domain + el.image?.[0]?.url} alt={el.name} onClick={()=>{navigate(`/Games/${el.documentId}`)}} className="w-[151.2px] h-[181px] md:h-[172px] cursor-pointer lg:w-[207.2px] lg:h-[286px]" />
                        <div className="flex flex-col items-center lg:items-start w-full h-[88px] gap-[2px] md:h-[84px] md:gap-[8px] lg:h-[52px]">
                            <h1 className="text-[16px] ">{el.name}</h1>
                            <div className="flex flex-col lg:flex-row justify-between items-center w-[151.2px] h-[51px] gap-[4px] md:gap-[16px] lg:w-[207.2px] lg:h-[19px] lg:gap-0">
                                <div className="flex items-center gap-[4px]"> <Calicon className='w-[20px]' /> <h1 className="text-[12px] text-[#979797]">{el.release}</h1> </div>
                                <div className="flex justify-center items-center gap-[4px]"><h1 className="text-[12px] cursor-pointer">Pre-Order</h1> <Trendarrow className='w-[15px]' /> </div>
                            </div>

                        </div>
                    </div>
                ))

                }
            </div>

        </div>
    )
}
