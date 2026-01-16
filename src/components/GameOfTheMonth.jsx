import { useEffect, useState } from "react";
import useGameStore, { domain } from "../store";
import axios from "axios";
import Micon from "../icons/M yellow Rate.svg?react";
import Calicon from "../icons/calender icon.svg?react";
import trailer1 from "../Games/gameofthemonth/trailer1.png?react"
import trailer2 from "../Games/gameofthemonth/trailer2.png?react"
import trailer3 from "../Games/gameofthemonth/trailer3.png?react"
import trailer4 from "../Games/gameofthemonth/trailer4.png?react"
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function GameOfTheMonth() {
    const games = useGameStore((state) => state.games);
    const setGames = useGameStore((state) => state.setGames);
    const game = useGameStore((state) => state.game);
    const setGame = useGameStore((state) => state.setGame);
    const [activeDot, setActiveDot] = useState(0)
    const [activeTrailer, setActiveTrailer] = useState(0)

    const dotsCount = 4;

    useEffect(() => {
        axios.get(domain + `/api/games/mx66fil05qvv06t2n5qnv6se?populate=*`).then((res) => {
            setGame(res.data.data)
        })
    }, [])


    return (
        <div className="flex flex-col w-[382px] h-[1920px] gap-[24px] md:w-[884px] md:h-[847px] lg:w-[1200px] lg:h-[856px]">
            {/* Header Text */}
            <div className="flex w-full h-[38px] lg:px-[120px] justify-center items-center"> <h1 className="text-[24px]">Game Of The Month</h1> </div>
            {/* Game Details */}
            <div className="flex flex-col md:flex-row w-full h-[881px] md:h-[452px] lg:h-[457px] gap-[24px] lg:gap-[36px]">
                {/* Left Div / in Mobile First */}
                <div className="flex flex-col w-full h-[490px] md:w-[430px] md:h-[452px] lg:w-[582px] lg:h-[457px] gap-[16px]">
                    <div className="flex flex-col w-full h-[193px] gap-[8px] md:h-[171px] lg:h-[189px]">
                        <h1 className="text-[20px]">Black Myth Wukong</h1>
                        <h1 className="text-[14px] capitalize text-justify font-extralight lg:text-[16px]">Black Myth: Wukong is an action RPG inspired by the legendary Chinese novel "Journey to the West." The game takes players on an epic journey as the Monkey King, Wukong, battling through mythological creatures and mastering magical abilities. Featuring stunning visuals, challenging combat, and an immersive world, Black Myth: Wukong aims to set a new standard for action RPGs.</h1>
                    </div>
                    <div className="flex flex-col w-full h-[281px] gap-[12px] lg:gap-[16px] md:w-[430px] md:h-[265px] lg:w-[582px] lg:h-[252px]">
                        <div className="flex w-full md:items-center h-[149px] md:h-[133px] lg:h-[108px] gap-[28px]">
                            <div className="flex flex-col md:justify-between w-[177px] h-[102px] gap-[16px] md:gap-0 md:w-[201px] md:h-[133px] lg:w-[277px] lg:h-[108px]"> <div className="flex w-full gap-[12px]"> <Micon /> <div className="flex items-center"><h1 className="text-[24px] text-[#FFCC00]">{game?.rate}</h1><h1 className="text-[#979797] text-[16px]">/100</h1> </div> </div>
                                <div className="flex items-center w-full h-[32px] gap-[12px]"> <Calicon className="w-[32px]" /> <h1 className="text-[14px] font-light">{game?.date}</h1> </div>
                            </div>

                            <div className="flex flex-col items-center md:justify-between w-[177px] h-full gap-[16px] md:w-[201px] md:gap-0 lg:w-[277px]">
                                <div className="availableFor flex flex-col items-center w-full h-[79px] lg:h-[54px]"> <h1 className="text-[20px]">Available For:</h1> <h1 className="text-[16px] text-[#979797]"> {game?.platforms?.slice(0,3).map((el) => (el.name)).join(" - ")} </h1> </div>
                                <div className="Genre flex flex-col items-center w-full h-[54px]"> <h1 className="text-[20px]">Genre:</h1> <h1 className="text-[16px] text-[#979797]">{game?.genres?.map((el) => el.name).join(" ")}</h1> </div>
                            </div>
                        </div>
                        <div className="platforms w-full flex flex-wrap h-[68px] gap-[8px]">
                            {game?.platforms?.map((el, i) => (
                                <button key={el.id} className="w-[187px] h-[30px] md:w-[211px] lg:w-[287px] px-[20px] py-[4px] btn btn-outline rounded-box text-[16px] text-[#979797]">{el.name}</button>
                            ))}

                        </div>
                        <div className="buttons flex w-full h-[40px] gap-[12px] lg:h-[44px]">
                            <button className="btn rounded-full bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white w-[185px] h-full md:w-[209px] lg:w-[285px] px-[24px] py-[8px] lg:px-[36px]">Buy Now</button>
                            <button className="btn rounded-full border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white w-[185px] h-full md:w-[209px] lg:w-[285px] px-[24px] py-[8px] lg:px-[36px]">Game review</button>

                        </div>
                    </div>
                </div>
                {/* Right Div / in Mobile Second */}
                <div className="flex flex-col w-full h-[391px] gap-[16px] md:w-[430px] md:h-[452px] lg:w-[582px] lg:h-[457px]">
                    <div className="flex justify-between w-full h-[51px]"> <h1 className="text-[20px]">Trailer & Gallery</h1>
                        <div className='flex flex-col w-[96px] h-[51px] gap-[8px]'>
                            <div className='flex gap-[8px] w-full md:h-[31px]'>
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
                    <div className="relative w-full h-[224px] md:h-[285px] lg:h-[290px] bg-center bg-cover cursor-pointer" style={{ backgroundImage: `url(${domain + game?.cover?.url})` }}>
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="flex items-center w-full h-[84px] gap-[8px] lg:gap-[12px]">
                        <img className="w-[157px] h-[84px] cursor-pointer" src={trailer1} alt="trailer" /><img className="w-[67px] h-[60px] md:w-[83px] lg:w-[129.67px] cursor-pointer" src={trailer2} alt="trailer" /><img className="w-[67px] h-[60px] md:w-[83px] lg:w-[129.67px] cursor-pointer" src={trailer3} alt="trailer" /><img className="w-[67px] h-[60px] md:w-[83px] lg:w-[129.67px] cursor-pointer" src={trailer4} alt="trailer" />
                    </div>
                </div>
            </div>
        </div>
    )
}
