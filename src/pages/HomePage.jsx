import GameCategories from "../components/GameCategories";
import GameOfTheMonth from "../components/GameOfTheMonth";
import HeroSection from "../components/HeroSection";
import TrendingGames from "../components/TrendingGames";
export default function HomePage() {

  return (
    <div className='w-full flex flex-col items-center w-[430px] md:w-[1080px] lg:w-[1440px] gap-[60px] md:gap-[80px] overflow-hidden'>
    <HeroSection/>
    <GameCategories/>
    <TrendingGames/>
    <GameOfTheMonth/>
    </div>
  );
}
