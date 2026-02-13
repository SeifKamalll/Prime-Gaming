import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function MainLayout() {

  return (
    <div className="w-full flex flex-col items-center font-Vazirmatn bg-[#1C1B29]">
        <Header/>
        <Outlet />
        <Footer/>
    </div>
  );
}
