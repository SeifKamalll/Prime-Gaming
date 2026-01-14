import GameCategories from "../components/GameCategories";
import HeroSection from "../components/HeroSection";
export default function HomePage() {

  return (
    <div className='w-full flex flex-col items-center overflow-hidden'>
    <HeroSection/>
    <GameCategories/>
    <div className="h-[500px]"></div>
    </div>
  );
}
