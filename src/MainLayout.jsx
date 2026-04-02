import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from "framer-motion";
import { ReactLenis } from 'lenis/react'
export default function MainLayout() {
    const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <ReactLenis root options={{ 
      lerp: 0.1,           // Adjust this between 0.01 and 0.1 (lower is slower)
      wheelMultiplier: 1, 
      smoothWheel: true 
    }}>
        <Header/>
    <div className="w-full flex flex-col items-center font-Vazirmatn bg-[#1C1B29]">

         {/* The Progress Bar Container */}
        <div className="hidden md:block fixed right-5 top-[35dvh] w-[6px] h-[200px] z-50 bg-gray-700/30 rounded-full">
          <motion.div
            className="w-full bg-[#FF5733] origin-top rounded-full"
            style={{
              scaleY: smoothProgress,
              height: "100%" // Critical: The internal div needs a height to scale!
            }}
          />
        </div>
        <Outlet />

    </div>
        <Footer/>
    </ReactLenis>
  );
}
