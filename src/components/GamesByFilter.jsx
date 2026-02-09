import { useEffect, useState } from "react";
import { domain } from "../store";
import useGameStore from "../store"
import axios from "axios";
import Calicon from "../icons/calender icon.svg?react";
import Micon from "../icons/M yellow Rate.svg?react";
import Trendarrow from "../icons/trending arrow.svg?react";
import Searchicon from "../icons/Searchicon2.svg?react"
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import ReleaseYearSlider from "./ReleaseYearSlider";
import RatingSlider from "./RatingSlider";
export default function GamesByFilter() {
    const games = useGameStore((state) => state.games);
    const setGames = useGameStore((state) => state.setGames);
    const limit = useCardLimit();
    const [categories, setCategories] = useState([])
    const [activeGenres, setActiveGenres] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        let url1 = domain + "/api/games";
        axios.get(url1, { params: { populate: '*' } })
            .then((res) => {
                setGames(res.data.data)
            })
        let url2 = domain + "/api/genres"
        axios.get(url2)
            .then((res) => {
                setCategories(res.data.data)
            })

        let url3 = domain + "/api/platforms"
        axios.get(url3)
            .then((res) => {
                setPlatforms(res.data.data)
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

    const toggleGenre = (id) => {
        setActiveGenres((prev) =>
            prev.includes(id)
                ? prev.filter((genreId) => genreId !== id) // remove
                : [...prev, id] // add
        );
    };

    const getVisibleCount = () => {
        if (window.innerWidth < 768) return 3;      // mobile
        if (window.innerWidth < 1024) return 7;     // tablet
        return 9;                                  // desktop
    };
    const visibleCount = getVisibleCount();

    const handleNext = () => {
        setStartIndex((prev) =>
            Math.min(prev + visibleCount, categories.length - visibleCount)
        );
    };

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - visibleCount, 0));
    };



    return (
        <div className='flex flex-col items-center w-[382px] h-[1493px] gap-[24px] md:w-[884px] md:h-[1221px] md:gap-[32px] lg:w-[1200px] lg:h-[1301px]'>
            {/* Header */}
            <div className='flex flex-col justify-center items-center w-full h-[92px] gap-[4px] md:h-[67px]'>
                <h1 className='text-[24px]'>Games By Filter</h1>
                <h1 className='text-[16px] text-[#979797] text-center'>At This Section You Can Search For Games by multiple filters</h1>
            </div>
            {/* Filters */}
            <div className='flex flex-col w-full h-[671px] gap-[24px] md:h-[350px] md:gap-[32px]'>
                {/* Search */}
                <div className="flex items-center w-full h-[48px] gap-[16px] pl-[12px] rounded-md bg-[#181724]">
                    <Searchicon className="w-[32px] h-[32px]" />
                    <input className="w-full outline-none text-[16px]" placeholder="Game Name" />
                </div>
                {/* Genres */}
                <div className="flex items-center w-full h-[36px] gap-[12px] md:h-[44px] lg:gap-[16px]">
                    <GoArrowLeft onClick={handlePrev} className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] border rounded-md p-[8px] md:p-[12px] cursor-pointer hover:scale-105 transition-[opacity,scale]" />
                    <div className="flex items-center h-full w-[286px] gap-[12px] md:w-[772px] lg:w-[1085px] lg:gap-[16px]">
                        {categories?.slice(startIndex, startIndex + visibleCount).map((el, i) => {
                            const isActive = activeGenres.includes(el.id);
                            return (
                                <button onClick={() => toggleGenre(el.id)} key={el.id} className={`w-[87.33px] h-[34px] py-[6px] md:w-[100px] md:h-[34px] lg:w-[105px] lg:h-[37px] rounded-2xl bg-[#181724] cursor-pointer transition-all ${isActive ? "bg-[#FF5733]" : "bg-[#181724] hover:bg-[#FF5733]"}`}>
                                    <h1 className="text-[14px]">{el.name}</h1>
                                </button>
                            )
                        })}
                    </div>
                    <GoArrowRight onClick={handleNext} className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] border rounded-md p-[8px] md:p-[12px] cursor-pointer hover:scale-105 transition-[opacity,scale]" />
                </div>
                {/* Selectors Line */}
                <div className="flex flex-col md:flex-row w-full h-[186px] gap-[36px] md:h-[38px]">
                    <div className="flex w-full justify-between items-center h-[38px] gap-[19px] md:w-[270.67px] md:gap-[12px] lg:w-[376px] lg:gap-[16px]">
                        <h1 className="text-[16px]">Platform</h1>
                        <select defaultValue="All" className="select select-ghost w-[300px] h-full md:w-[190.67px] lg:w-[280px] cursor-pointer outline-0 bg-[#181724] rounded-md">
                            <option>All</option>
                            {platforms?.map((el, i) => (
                                <option key={el.id}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex w-full justify-between items-center h-[38px] gap-[12px] md:w-[270.67px] md:gap-[12px] lg:w-[376px] lg:gap-[16px]">
                        <h1 className="text-[16px]">Publisher</h1>
                        <select defaultValue="All" className="select select-ghost w-[300px] h-full md:w-[190.67px] lg:w-[280px] cursor-pointer outline-0 bg-[#181724] rounded-md">
                            <option>All</option>
                            <option>Valve</option>
                            <option>Rockstar Games</option>
                            <option>EA</option>
                            <option>Activision</option>
                        </select>
                    </div>
                    <div className="flex w-full justify-between items-center h-[38px] gap-[19px] md:w-[270.67px] md:gap-[12px] lg:w-[376px] lg:gap-[16px]">
                        <h1 className="text-[16px]">Players</h1>
                        <select defaultValue="All" className="select select-ghost w-[300px] h-full md:w-[190.67px] lg:w-[280px] cursor-pointer outline-0 bg-[#181724] rounded-md">
                            <option>All</option>
                            <option>+100</option>
                            <option>+1k</option>
                            <option>+10k</option>
                        </select>
                    </div>
                </div>
                {/* Sliders & Switches Line */}
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full h-[265px] gap-[24px] md:h-[52px] lg:gap-[36px]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full h-[93px] gap-[16px] md:w-[278.67px] md:h-[52px] lg:w-[376px]">
                        <h1 className="text-[16px] lg:w-[98.44px]">Release Year</h1>
                        <ReleaseYearSlider />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full h-[93px] gap-[16px] md:w-[278.67px] md:h-[52px] lg:w-[376px]">
                        <h1 className="text-[16px] lg:w-[98.44px]">Rating</h1>
                        <RatingSlider />
                    </div>
                    {/* Switches */}
                    <div className="flex w-full h-[31px] gap-[122px] items-center md:w-[278.67px] md:gap-[18.67px] lg:w-[376px] lg:gap-[118.44px]">
                        <div className="flex w-[132px] h-[31px] items-center justify-between">
                            <h1 className="text-[20px]">Online</h1>
                            <input type="checkbox" className="toggle scale-x-[1.20] scale-y-[1.15] toggle-md border-[3px] border-[#FF5733] text-[#FF5733] checked:border-[#FF5733] checked:bg-[#FF5733] checked:text-[#1C1B29]" />
                        </div>
                        <div className="flex w-[121px] h-[31px] items-center justify-between">
                            <h1 className="text-[20px]">Free</h1>
                            <input type="checkbox" className="toggle scale-x-[1.20] scale-y-[1.15] toggle-md border-[3px] border-[#FF5733] text-[#FF5733] checked:border-[#FF5733] checked:bg-[#FF5733] checked:text-[#1C1B29]" />
                        </div>
                    </div>
                </div>
                {/* Search Bar */}
                <button className="flex w-full h-[40px] justify-center items-center gap-[8px] bg-[#FF5733] rounded-2xl hover:bg-gray-950 cursor-pointer">
                    <Searchicon className="w-[20px] h-[20px]" />
                    <h1 className="text-[16px]">Search For Games</h1>
                </button>

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
