import { useEffect, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { domain } from '../store';
import axios from 'axios';
import Viewall from "../icons/viewall.svg?react"

export default function GameCategories() {
  const [categories, setCategories] = useState([]);
  const [activeDot, setActiveDot] = useState(0)

  const itemsPerPage = 6;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const pages = Math.ceil(categories.length / itemsPerPage);


  const startIndex = activeDot * itemsPerPage;
  const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage
  );

  useEffect(() => {
    axios
      .get(domain + "/api/genres?populate=cover")
      .then((res) => {
        const data = res.data.data;
        const sorted = data.sort((a, b) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          return orderA - orderB;
        });

        setCategories(sorted);
      })
      .catch((err) => {
        console.error("Failed to fetch genres:", err);
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
    <div className='flex flex-col justify-center items-center h-[254px] w-full gap-[24px] md:h-[449px] lg:h-[527px] lg:gap-[32px]'>
      <div className='flex w-[382px] items-center h-[36px] md:w-[884px] md:h-[51px] lg:w-[1200px] lg:max-w-[1200px] lg:h-[51px] '>

        <h1 className='w-[280px] h-[31px] text-[20px] md:w-[812px] md:h-[38px] md:text-[24px] lg:w-[1128px] lg:h-[38px]'>Game Categories</h1>
        <div className="md:hidden cursor-pointer w-[102px] px-[16px] py-[6px]"> <Viewall /> </div>
        <div className='hidden md:flex md:flex-col md:w-[72px] md:h-[51px] md:gap-[8px]'>
          <div className='flex md:gap-[8px] md:w-[72px] md:h-[31px]'>
            <button onClick={() => setActiveDot((prev) => prev === 0 ? pages - 1 : prev - 1)} className="cursor-pointer flex justify-center items-center w-[32px] h-[32px] hover:scale-105 transition-[opacity,scale] border rounded-md text-[#ededed]">
              <GoArrowLeft size={20} />
            </button>
            <button onClick={() => setActiveDot((prev) => prev === pages - 1 ? 0 : prev + 1)} className="cursor-pointer flex justify-center items-center w-[32px] h-[32px] hover:scale-105 transition-[opacity,scale] border rounded-md text-[#ededed]">
              <GoArrowRight size={20} />
            </button>
          </div>

          <div className='flex justify-center items-center w-[72px] h-[12px] gap-[5px]'>
            {Array.from({ length: pages }).map((_, index) => (
              <div key={index} onClick={() => { setActiveDot(index) }} className={`${activeDot === index ? "bg-[#FF5733] h-[12px] w-[38px]" : "w-[20px] h-[8px] bg-[#452154]"} hover:w-[38px] hover:h-[12px] hover:bg-[#ff2f00] rounded-sm cursor-pointer`}></div>
            ))}
          </div>
        </div>

      </div>

      <div className='flex flex-nowrap no-scrollbar overflow-x-auto md:overflow-visible md:grid md:grid-cols-4 md:grid-rows-2 w-[406px] md:w-full md:max-w-[884px] h-[210px] gap-[12px] md:h-[374px] md:gap-[20px] lg:max-w-[1200px] lg:h-[444px] lg:gap-x-[24px]'>
        {(isMobile ? categories : visibleCategories).map((el, index) => {
          const isBig = index === 0 || index === 5;

          return (
            <div
              key={el.id}
              className={`relative rounded-xl md:transition-transform md:duration-300 md:ease-out md:hover:-translate-y-2 min-w-[280.5px] w-[573px] md:w-full md:max-w-[884px] h-[194px] bg-center bg-[#1C1B29] cursor-pointer overflow-hidden ${isBig ? "col-span-2" : ""
                }`}
              style={{ backgroundImage: `url(${domain + el.cover?.url})` }}
            >

              <div className="absolute inset-0 bg-black/30" />

              <span className="absolute bottom-4 left-4 text-white font-semibold">
                {el.name}
              </span>
            </div>

          );
        })}
      </div>

    </div>
  )
}
