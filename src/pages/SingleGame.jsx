import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Micon from "../icons/M yellow Rate.svg?react";
import Calicon from "../icons/calender icon.svg?react";
import axios from "axios";
import { domain, useCart } from "../store";

export default function SingleGame() {
  const { Gameid } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(domain + `/api/games/${Gameid}`, { params: { populate: "*" } })
      .then((res) => {
        setGame(res.data.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [Gameid]);

  if (loading) return <div className="min-h-screen bg-[#1C1B29] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#1C1B29] text-white pt-[120px] pb-24">
      <div className="max-w-[1300px] mx-auto px-6">

        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ================= LEFT SIDE - IMAGE GALLERY ================= */}
          <div className="w-full">

            {/* Main Image */}
            <div className="w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden bg-[#2A2838]">
              <img
                src={domain + game?.cover?.url}
                alt={game?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[90px] bg-[#2A2838] rounded-xl border border-white/10 hover:border-[#FF5733] transition cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE - DETAILS ================= */}
          <div className="w-full min-w-0">

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {game?.name}
            </h1>

            {/* Rating + Release */}
            <div className="flex items-center gap-10 mb-8">

              <div className="flex items-center gap-3">
                <Micon className="w-6 h-6" />
                <span className="text-[#FFCC00] text-2xl font-bold">
                  {game?.rate || 0}
                </span>
                <span className="text-gray-500">/100</span>
              </div>

              <div className="flex items-center gap-3">
                <Calicon className="w-6 h-6" />
                <span className="text-gray-300">
                  {game?.release || "TBA"}
                </span>
              </div>
            </div>

            {/* Description (fixed area height) */}
            <div className="bg-[#2A2838]/40 rounded-2xl p-6 mb-10 min-h-[140px]">
              <p className="text-gray-300 leading-7">
                {game?.des || "No description available."}
              </p>
            </div>

            {/* Platforms */}
            <div className="mb-8">
              <h3 className="text-sm uppercase text-gray-500 mb-4 font-semibold">
                Available On
              </h3>
              <div className="flex flex-wrap gap-3">
                {game?.platforms?.map((el, index) => (
                  <span
                    key={index}
                    className="border border-[#FF5733] text-[#FF5733] px-4 py-2 rounded-full text-sm"
                  >
                    {el.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div className="mb-10">
              <h3 className="text-sm uppercase text-gray-500 mb-4 font-semibold">
                Genres
              </h3>
              <div className="flex flex-wrap gap-3">
                {game?.genres?.map((el, index) => (
                  <span
                    key={index}
                    className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm"
                  >
                    {el.name}
                  </span>
                ))}
              </div>
            </div>

            {/* PRICE CARD */}
            <div className="bg-[#2A2838] rounded-3xl p-8 border border-white/5">

              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="line-through text-gray-500 text-sm">
                    ${game?.price}
                  </p>
                  <p className="text-4xl font-black">
                    ${game?.disprice}
                  </p>
                </div>

                <div className="bg-[#FF5733] px-4 py-2 rounded-xl font-bold">
                  -{Math.round(((game?.price - game?.disprice) / game?.price) * 100)}%
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() =>{ addToCart(game);}} className="transition py-4 rounded-2xl font-bold cursor-pointer bg-[#FF5733] hover:bg-gray-950 border border-[#FF5733] text-white">
                  Add To Cart
                </button>

                <button className="border border-[#FF5733] text-[#FF5733] hover:bg-gray-950 hover:text-white transition py-4 rounded-2xl font-bold cursor-pointer">
                  Add To Wishlist
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}