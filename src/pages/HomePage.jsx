import GameCategories from "../components/GameCategories";
import HeroSection from "../components/HeroSection";
import TrendingGames from "../components/TrendingGames";
export default function HomePage() {

  return (
    <div className='w-full flex flex-col items-center gap-[60px] md:gap-[80px] overflow-hidden'>
    <HeroSection/>
    <GameCategories/>
    <TrendingGames/>
    </div>
  );
}
