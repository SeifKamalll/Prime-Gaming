import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Viewall from "../icons/viewall.svg?react"
import ghostoftsushima from "../images/ghostoftsushima.png"
import { domain } from "../store";
import axios from "axios";
import { useEffect, useState } from "react";
import Micon from "../icons/M yellow Rate.svg?react";
import Calicon from "../icons/calender icon.svg?react";
import Viewsicon from "../icons/viewsicon.svg?react";
import Comments from "../icons/commentsicon.svg?react";
import Staricon from "../icons/staricon.svg?react";
import { useNavigate } from "react-router-dom";

export default function Reviews() {
    const navigate = useNavigate()

    const [activeDot, setActiveDot] = useState(0)
    const [reviews, SetReviews] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const itemsPerPage = 4;

    const pages = Math.ceil(reviews.length / itemsPerPage);

    const startIndex = activeDot * itemsPerPage;
    const visibleReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        let url1 = domain + "/api/games";
        axios.get(url1, { params: { populate: '*', filters: { Review: { $eq: true } } } })
            .then((res) => {
                SetReviews(res.data.data)
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
        <div className="flex flex-col justify-center w-full h-[650px] gap-[24px] md:w-[884px] md:h-[895px] lg:w-[1200px] lg:h-[563px] lg:gap-[32px]">
            {/* Game Reviews Text & Arrows Control */}
            <div className='flex justify-center items-center h-[36px] w-full md:h-[51px] lg:max-w-[1200px] lg:h-[51px] '>

                <div className="flex w-[280px] h-[31px] md:w-[812px] md:h-[38px] md:w-[704px] lg:w-[1200px] md:h-[40px] lg:gap-[48px] lg:h-[44px]">
                    <h1 className='text-[20px] md:text-[24px]'>Game Reviews</h1>
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
            {/* Second Part  */}
            <div className="flex overflow-x-auto no-scrollbar w-full h-[590px] md:h-[820px] lg:h-[480px] gap-[16px] md:gap-[12px] md:flex-col lg:grid lg:grid-cols-2">
                {/* Cards */}
                {(isMobile ? reviews : visibleReviews)?.map((el, i) => (
                    <div key={el.id} className="flex flex-col md:flex-row w-[310px] h-full gap-[10px] p-[8px] md:w-full md:h-[196px] lg:w-[588px] lg:h-[228px] border border-[#9763AD] rounded-xl">
                        <img src={domain + el.image?.[0]?.url} alt={el.name} onClick={()=>{navigate(`/Games/${el.documentId}`)}} className="w-full h-[194px] md:w-[140px] md:h-[180px] lg:h-[212px] object-cover cursor-pointer" />
                        <div className="flex flex-col w-[294px] h-[255px] gap-[16px] md:w-[540px] md:h-[180px] md:gap-[8px] lg:w-[306px] lg:h-[212px]">
                            <div className="flex flex-col">
                                <h1 className="text-[16px]">{el.name} <span className="text-[#979797]">({el.release})</span></h1>
                                <hr />
                            </div>
                            <h1 className="text-[12px] text-[#979797] md:h-[114px] overflow-auto capitalize text-justify">{el.description}</h1>
                            {/* Genres */}
                            <div className="flex items-center gap-[4px]">
                                <button className="text-[10px] bg-[#181724] w-[61px] h-[24px] rounded-2xl px-[8px] py-[4px]">Action</button>
                                <button className="text-[10px] bg-[#181724] w-[61px] h-[24px] rounded-2xl px-[8px] py-[4px]">RPG</button>
                                <button className="text-[10px] bg-[#181724] w-[61px] h-[24px] rounded-2xl px-[8px] py-[4px]">Samurai</button>
                                <button className="text-[10px] bg-[#181724] w-[61px] h-[24px] rounded-2xl px-[8px] py-[4px]">Adventure</button>
                            </div>
                            <div className="flex justify-center md:justify-between items-center gap-[32px]">
                                <div className="flex gap-[8px]"> <Micon className='w-[20px] h-[20px]' /> <h1 className="text-[#979797] text-[12px]"><span className="text-[#FFCC00] text-[16px]">{el.rate}</span>/100</h1> </div>
                                <div className="flex gap-[8px]"> <Calicon className='w-[20px] h-[20px]' /> <h1 className="text-[12px]">{el.date}</h1> </div>
                            </div>
                        </div>
                        <div className="lastpart flex flex-col w-[294px] h-[93px] gap-[8px] md:w-[148px] md:h-[180px] md:gap-0 lg:w-[102px] lg:h-[212px]">
                            <div className="firstone flex justify-center items-center md:justify-between md:flex-col w-[294px] h-[49px] md:w-[148px] md:h-[144px] lg:w-[102px] lg:h-[176px]">
                                <div className="flex flex-col items-center w-[98px] h-[49px] gap-[4px]">
                                    <Viewsicon className='w-[20px] h-[20px]' /> <h1 className="text-[14px]">1200+ <span className="text-[#979797]">Views</span></h1> </div>
                                <div className="flex flex-col items-center w-[98px] h-[49px] gap-[4px]">
                                    <Comments className='w-[20px] h-[20px]' /> <h1 className="text-[14px]">112 <span className="text-[#979797]">Comments</span></h1> </div>
                                <div className="flex flex-col items-center w-[98px] h-[49px] gap-[4px]">
                                    <Staricon className='w-[20px] h-[20px]' /> <h1 className="text-[14px]">8.7<span className="text-[#979797]">/10</span></h1> </div>
                            </div>
                            <button className="btn rounded-2xl bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white text-[12px] font-light w-[294px] h-[36px] md:w-[148px] lg:w-[102px]">Full Review</button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
