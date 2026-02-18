import { useEffect, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Viewall from "../icons/viewall.svg?react"
import { domain } from '../store';
import axios from 'axios';

export default function BlogPost() {
    const [blogs, setBlogs] = useState([])
    const [activeDot, setActiveDot] = useState(0)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const itemsPerPage = 5;

    const pages = Math.ceil(blogs.length / itemsPerPage);


    const startIndex = activeDot * itemsPerPage;
    const visibleBlogs = blogs.slice(startIndex, startIndex + itemsPerPage
    );

    useEffect(() => {
        axios
            .get(domain + "/api/blogs?populate=cover")
            .then((res) => {
                const data = res.data.data;
                const sorted = data.sort((a, b) => {
                    const orderA = a.order ?? 999;
                    const orderB = b.order ?? 999;
                    return orderA - orderB;
                });

                setBlogs(sorted);
            })
            .catch((err) => {
                console.error("Failed to fetch Blogs:", err);
            });
    }, []);


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
            {/*////////// Blogs Section///////// */}
            <div className='flex flex-nowrap no-scrollbar overflow-x-auto md:overflow-visible md:grid md:grid-cols-4 md:grid-rows-2 md:auto-rows-fr w-full md:max-w-[884px] h-[243px] gap-[12px] md:h-[380px] lg:max-w-[1200px]'>
                {(isMobile ? blogs : visibleBlogs).map((el, index) => {
                    const isBig = index === 0;

                    return (
                        <div
                            key={el.id}
                            className={`relative rounded-xl min-w-[280px] md:min-w-0 h-[243px] md:h-full bg-[#1C1B29] cursor-pointer overflow-hidden${isMobile ? "" : "transition-transform duration-300 ease-out hover:-translate-y-2"} ${isBig ? "md:col-span-2 md:row-span-2" : ""}`}
                        >

                            <img
                                src={domain + el.cover?.url}
                                alt={el.name}
                                className="absolute rounded-xl inset-0 w-full h-[191px] md:h-full object-cover"
                            />


                            <div className="absolute rounded-xl inset-0 bg-black/30 h-[191px] md:h-full" />

                            <h1 className={`absolute ${isMobile ? "bottom-0 text-[14px] text-center w-[275px]" : ` ${isBig ? "text-[20px] left-3 bottom-4 w-[574px]" : "text-[16px] left-2 bottom-1"}`} text-white `}>
                                {el.description}
                            </h1>
                        </div>

                    );
                })}
            </div>

        </div>
    )
}
