import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Micon from "../icons/M yellow Rate.svg?react";
import Calicon from "../icons/calender icon.svg?react";
import noimage from "../images/Image-not-found.png";
import axios from "axios";
import { domain } from "../store";

export default function SingleGame() {
    const { Gameid } = useParams();

    // 🔥 Temporary mock data (replace later with axios)
    const [game, setGame] = useState({});

    // 🔥
    useEffect(() => {
        axios.get(domain + `/api/games/${Gameid}`, { params: { populate: "*" }, })
            .then((res) => {
                console.log(res.data.data)
                setGame(res.data.data)
            }).catch((err)=>{
                console.log(err)
            })
    }, [Gameid])


    return (
        <div className="min-h-screen bg-[#1C1B29] text-white pt-[100px] px-6 md:px-12 lg:px-20">

            {/* ===== Hero Section ===== */}
            <div
                className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden mb-12"
                style={{
                    backgroundImage: `url(${domain + game?.cover?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute bottom-6 left-6">
                    <h1 className="text-3xl md:text-5xl font-bold">{game.name}</h1>
                </div>
            </div>

            {/* ===== Main Content ===== */}
            <div className="flex flex-col lg:flex-row gap-12">

                {/* ===== Left Section ===== */}
                <div className="flex-1 space-y-8">

                    {/* Rating & Release */}
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Micon className="w-6 h-6" />
                            <span className="text-[#FFCC00] text-xl font-semibold">
                                {game.rate}
                            </span>
                            <span className="text-gray-400">/100</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calicon className="w-6 h-6" />
                            <span>{game.release}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-7 text-justify">
                        {game.description}
                    </p>

                    {/* Platforms */}
                    <div>
                        <h2 className="text-xl mb-3 font-semibold">Available On</h2>
                        <div className="flex flex-wrap gap-3">
                            {game?.platforms?.map((el, index) => (
                                <span
                                    key={index}
                                    className="border border-[#FF5733] px-4 py-2 rounded-full text-sm text-[#FF5733]"
                                >
                                    {el.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Genres */}
                    <div>
                        <h2 className="text-xl mb-3 font-semibold">Genres</h2>
                        <div className="flex flex-wrap gap-3">
                            {game?.genres?.map((el, index) => (
                                <span
                                    key={index}
                                    className="bg-[#2A2838] px-4 py-2 rounded-full text-sm"
                                >
                                    {el.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ===== Right Price Box ===== */}
                <div className="lg:w-[350px]">

                    <div className="bg-[#2A2838] p-6 rounded-2xl shadow-xl space-y-6">

                        <img
                            src={domain + game.image?.[0]?.url}
                            alt={game.name}
                            className="w-full h-[200px] object-cover rounded-xl"
                        />

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="line-through text-gray-400 text-lg">
                                ${game.price}
                            </span>

                            <span className="text-3xl font-bold">
                                ${game.disprice}
                            </span>

                            <span className="bg-[#FF5733] text-xs px-2 py-1 rounded-md">
                                {Math.round(
                                    ((game.price - game.disprice) / game.price) * 100
                                )}
                                %
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-4">
                            <button className="bg-[#FF5733] hover:bg-gray-950 transition rounded-full py-3 text-white font-semibold cursor-pointer">
                                Buy Now
                            </button>

                            <button className="border border-[#FF5733] text-[#FF5733] hover:bg-gray-950 transition rounded-full py-3 cursor-pointer">
                                Add To Wishlist
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* ===== Extra Section ===== */}
            <div className="mt-20 mb-20">
                <h2 className="text-2xl font-semibold mb-6">Game Screenshots</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="h-[150px] bg-[#2A2838] rounded-xl"></div>
                    <div className="h-[150px] bg-[#2A2838] rounded-xl"></div>
                    <div className="h-[150px] bg-[#2A2838] rounded-xl"></div>
                    <div className="h-[150px] bg-[#2A2838] rounded-xl"></div>
                </div>
            </div>

        </div>
    );
}
