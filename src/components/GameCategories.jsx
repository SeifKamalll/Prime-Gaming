import { useEffect, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { domain } from '../store';
import axios from 'axios';

export default function GameCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(domain + "/api/genres?populate=cover")
      .then((res) => {
        const data = res.data.data;
        console.log(res.data.data)
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

  return (
    <div className='flex flex-col justify-center items-center w-[573px] h-[270px] gap-[24px] md:w-[1080px] md:h-[449px] md:px-[98px] lg:w-[1440px] lg:h-[527px] lg:gap-[32px] lg:px-[120px]'>
      <div className='flex w-[382px] items-center h-[36px] md:w-[884px] md:h-[51px] lg:w-[1200px] lg:h-[51px] '>

        <h1 className='w-[280px] h-[31px] text-[20px] md:w-[812px] md:h-[38px] md:text-[24px] lg:w-[1128px] lg:h-[38px]'>Game Categories</h1>

        <div className='hidden md:flex md:flex-col md:w-[72px] md:h-[51px] md:gap-[8px]'>
          <div className='flex md:gap-[8px] md:w-[72px] md:h-[31px]'>
            <button className="cursor-pointer flex justify-center items-center w-[32px] h-[32px] hover:h-[30px] border rounded-md text-[#ededed]">
              <GoArrowLeft size={20} />
            </button>
            <button className="cursor-pointer flex justify-center items-center w-[32px] h-[32px] hover:h-[30px] border rounded-md text-[#ededed]">
              <GoArrowRight size={20} />
            </button>
          </div>

          <div className='flex justify-center items-center w-[72px] h-[12px] gap-[5px]'>
            <div className={`bg-[#452154] hover:bg-[#FF5733] w-[20px] h-[8px] hover:w-[38px] hover:h-[12px] rounded-sm cursor-pointer`}></div>
            <div className={`bg-[#452154] hover:bg-[#FF5733] w-[20px] h-[8px] hover:w-[38px] hover:h-[12px] rounded-sm cursor-pointer`}></div>
          </div>
        </div>

      </div>

      <div className='flex flex-nowrap overflow-x-auto md:overflow-visible md:grid md:grid-cols-4 md:grid-rows-2 md:gap-[20px] lg:gap-[24px] w-[573px] h-[210px] gap-[12px] md:w-[884px] md:h-[374px] md:gap-[20px] lg:w-[1200px] lg:h-[444px] lg:gap-[24px]'>
        {categories.map((el, index) => {
          const isBig = index === 0 || index === 5;

          return (
            <div
              key={el.id}
              className={`relative rounded-xl md:transition-transform md:duration-300 md:ease-out md:hover:-translate-y-3 min-w-[280.5px] h-[194px] bg-center bg-[#1C1B29] cursor-pointer overflow-hidden ${isBig ? "col-span-2" : ""
                }`}
                style={{ backgroundImage: `url(${domain + el.cover?.url})`}}
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
