import Geralt from "../images/geralt.jpg";
import Micon from "../icons/M yellow Rate.svg?react";
import Calicon from "../icons/calender icon.svg?react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../store";
import noimage from "../images/Image-not-found.png"
export default function HeroSection() {
  const [games, setgames] = useState([])
  const [activeGame, setActiveGame] = useState(null);
  const [popularGames, setPopularGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    let url1 = domain + "/api/games";
    axios.get(url1, {
      params: { populate: "*" },
    }).then(res => {
      setgames(res.data.data);
    });

    axios.get(url1, { params: { populate: '*', sort: ["order:asc"], filters: { Popular: { $eq: true } } } })
      .then((res) => {
        console.log(res.data.data)
        setPopularGames(res.data.data)
        setActiveGame(res.data.data[0])
        setCurrentIndex(0);
      })
  }, [])

  const changeGame = (direction) => {
    if (!activeGame || popularGames.length === 0) return;

    let nextIndex;

    if (direction === "next") {
      nextIndex =
        currentIndex === popularGames.length - 1
          ? 0
          : currentIndex + 1;
    } else if (direction === "prev") {
      nextIndex =
        currentIndex === 0
          ? popularGames.length - 1
          : currentIndex - 1;
    }
    setCurrentIndex(nextIndex);
    setActiveGame(popularGames[nextIndex]);
  };

  useEffect(() => {
    if (popularGames.length === 0) return;

    const interval = setInterval(() => {
      changeGame("next");
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [popularGames.length, currentIndex]);


  return (
    <div className="relative flex w-full h-[486px] p-[24px] md:max-w-[1080px] md:h-[696px] lg:w-[1440px] lg:max-w-[1440px] lg:h-[860px] lg:p-[120px] bg-cover bg-center " style={{ backgroundImage: activeGame ? `url(${domain + activeGame?.cover?.url})` : `url(${Geralt})` }}>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute h-full left-0 top-0 max-w-[55%] md:bg-linear-to-r from-[#1C1B29] via-[#1C1B29] to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-[40%] md:bg-linear-to-t from-[#1C1B29] to-transparent"></div>
      <div className="hidden md:flex z-40 w-full md:max-w-[884px] md:max-h-[500px] md:gap-[20px] lg:w-[1200px] lg:max-w-[1200px lg:h-[620px] lg:max-h-[620px] lg:gap-[36px]">
        <div className="flex flex-col justify-end md:max-w-[323px] md:max-h-[500px] md:gap-[32px] lg:w-[333px] lg:max-w-[333px] lg:h-[620px] lg:max-h-[620px]">
          <div className="flex flex-col md:w-full md:h-auto md:gap-[8px] lg:h-auto">
            <h1 className="font-bold text-[40px]">{activeGame?.name}</h1>
            <h1 className="text-[16px] font-extralight tracking-normal text-justify leading-[25px]">{activeGame?.des}</h1>
          </div>
          <div className="flex flex-col md:w-full md:h-[249px] lg:h-[253px] md:gap-[28px]">
            <div className="flex justify-between md:w-full md:h-[38px]">
              <div className="flex items-center md:gap-[10px] md:w-[50%]"><Micon /><div className="flex justify-center items-center"><h1 className="text-[24px] text-[#FFCC00]">{activeGame?.rate}</h1><h1 className="text-[#979797] text-[16px]">/100</h1></div> </div>
              <div className="flex items-center md:w-[50%] md:gap-[10px]"> <Calicon /> <h1>{activeGame?.date}</h1> </div>
            </div>
            <div className="flex md:w-full md:h-[54px]">
              <div className="flex flex-col justify-center items-center md:w-[50%]"> <h1 className="text-[20px]">Available For:</h1> <h1 className="text-[16px] text-[#979797]">{activeGame?.platforms?.slice(0, 3).map((el) => (el.name)).join(" - ")}</h1> </div>
              <div className="flex flex-col justify-center items-center md:w-[50%]"> <h1 className="text-[20px]">Genre:</h1> <h1 className="text-[16px] text-[#979797]">{activeGame?.genres?.map((el) => el.name).join(" - ")}</h1></div>
            </div>
            <div className="flex flex-wrap md:w-full md:h-auto md:gap-[8px]">
              {activeGame?.platforms?.map((el) => (
                <button
                  key={el.id}
                  className="btn btn-outline rounded-box md:w-[105.67px] text-[16px] text-[#979797]">{el.name} </button>
              ))}
            </div>
            <div className="flex md:w-full md:h-[40px] lg:h-[44px] md:gap-[12px]">
              <button className="btn rounded-full md:w-[144px] bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white">Buy Now</button>
              <button className="btn rounded-full border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white md:w-[177px]">Game review</button>
            </div>
          </div>
        </div>

        <div className="flex items-end md:w-[541px] md:h-[500px] lg:w-[831px] lg:h-[620px]">
          <div className="flex flex-col md:w-full md:h-[243px] md:gap-[20px] lg:w-full lg:h-[304px]">
            <div className="flex justify-center items-center md:w-full md:h-[44px] md:gap-[10px]">
              <h1 className="md:w-[433px] md:h-[31px] lg:w-[723px]">The Most <span className="text-[#FF5733]">Pupular</span> Games</h1>
              <button onClick={() => { changeGame('prev') }} className="cursor-pointer hover:scale-110 transition-[opacity,scale] border rounded-md p-[11px] text-[#ededed]">
                <GoArrowLeft className="" size={20} />
              </button>
              <button onClick={() => { changeGame('next') }} className="cursor-pointer hover:scale-110 transition-[opacity,scale] border rounded-md p-[11px] text-[#ededed]">
                <GoArrowRight size={20} />
              </button>
            </div>
            <div className="flex items-end md:w-full md:h-[179px] md:gap-[8px] lg:w-[831px] lg:h-[240px] lg:gap-[16px]">
              {popularGames.map((el, index) => (
                <div key={el.documentId} className="hover-3d cursor-pointer" onClick={() => { setActiveGame(el); setCurrentIndex(index); }}>
                  <figure className={`lg:w-[153.4px] md:h-[220px] rounded-2xl ${activeGame?.id === el.id ? "md:h-[240px]" : ""}`}>
                    <img src={el.image ? domain + el.image[0].url : noimage} className="md:h-full" alt="Tailwind CSS 3D card" />
                  </figure>
                  {/* 8 empty divs needed for the 3D effect */}
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <span className={`absolute bottom-4 left-4 max-w-[100px] text-white transition-opacity ${currentIndex === index ? "opacity-100" : "opacity-0"}`}>
                    {el.name}
                  </span>
                </div>

              ))}


            </div>
          </div>
        </div>


      </div>

      {/* Mobile Version */}

      <div className="md:hidden flex flex-col w-full h-full gap-[48px] justify-end items-center z-40">

        <div className="flex w-[382px] h-[40px] justify-between">
          <button onClick={() => { changeGame('prev') }} className="cursor-pointer hover:scale-105 transition-[opacity,scale] border rounded-md p-[10px] text-[#ededed]">
            <GoArrowLeft size={20} />
          </button>
          <button onClick={() => { changeGame('next') }} className="cursor-pointer hover:scale-105 transition-[opacity,scale] border rounded-md p-[10px] text-[#ededed]">
            <GoArrowRight size={20} />
          </button>   </div>

        <div className="flex flex-col items-center w-[382px] h-[175px] gap-[16px]">
          <h1 className="font-bold w-full h-[50px] text-center text-[32px]">{activeGame?.name}</h1>

          <div className="flex w-full justify-center items-center h-[31px] gap-[32px]">
            <div className="flex items-center justify-center gap-[12px] h-[31px] w-[89px]"><Micon className='w-[24px]' /> <div className="flex justify-center items-center"><h1 className="text-[20px] text-[#FFCC00]">{activeGame?.rate}</h1><h1 className="text-[#979797] text-[14px]">/100</h1></div> </div>
            <div className="flex items-center w-[132px] h-[25px] gap-[12px]"> <Calicon className="w-[24px]" /> <h1 className="text-[16px]">{activeGame?.date}</h1> </div>
          </div>

          <div className="w-full h-[44px] flex justify-center items-center gap-[12px]">
            <button className="btn rounded-full w-[185px] h-[44px] bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white">Buy Now</button>
            <button className="btn rounded-full border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white w-[185px] h-[44px]">Game review</button>
          </div>

          <div className="flex w-[161px] h-[10px] gap-[4px]">
            {popularGames?.map((el, i) => (
              <div onClick={() => setActiveGame(el)} key={el.id} className={`bg-[#8C301C] hover:bg-[#FF5733] w-[25px] h-[6px] hover:w-[45px] hover:h-[10px] rounded-sm cursor-pointer ${activeGame?.id === el.id ? "bg-[#FF5733]" : ""}`}></div>

            ))}

          </div>

        </div>

      </div>

      {/* End Of Mobile Version */}

    </div>
  )
}
