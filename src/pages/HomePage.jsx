import BlogPost from "../components/BlogPost";
import Faq from "../components/Faq";
import GameCategories from "../components/GameCategories";
import GameOfTheMonth from "../components/GameOfTheMonth";
import GamesByFilter from "../components/GamesByFilter";
import HeroSection from "../components/HeroSection";
import Reviews from "../components/Reviews";
import TrendingGames from "../components/TrendingGames";
import UltimateGaming from "../components/UltimateGaming";
import UpcomingGames from "../components/UpcomingGames";
export default function HomePage() {

  return (
    <div className='w-full flex flex-col items-center w-[430px] md:w-[1080px] lg:w-[1440px] gap-[60px] md:gap-[80px] overflow-hidden'>
    <HeroSection/>
    <GameCategories/>
    <TrendingGames/>
    <GameOfTheMonth/>
    <Reviews/>
    <UpcomingGames/>
    <GamesByFilter/>
    <BlogPost/>
    <UltimateGaming/>
    <Faq/>
    </div>
  );
}
