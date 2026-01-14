import Logo from "../icons/logo.svg?react";
import Searchicon from "../icons/iconoir_search.svg?react";
import Signup from "../icons/signup.svg?react";
import Login from "../icons/login.svg?react";
import Mobmenu from "../icons/mobile_menu.svg?react";
export default function Header() {
    return (

        <header className='fixed container top-0 z-50 justify-between flex items-center backdrop-blur-xs w-[430px] h-[64px] px-[24px] py-[12px] md:w-[1080px] md:h-[83px] md:py-[10px] md:gap-[20px] lg:w-[1440px] lg:h-[90px] lg:py-[12px]'>
            <div className="cursor-pointer"> <Logo /> </div>
            <div className="hidden md:block"> <Searchicon /> </div>
            <div className='hidden items-center justify-between md:flex lg:w-[811px] lg:h-[23px] font-Vazirmatn'>
                <h1>Home</h1>
                <h1>News</h1>
                <h1>Store</h1>
                <h1>Review</h1>
                <h1>Guides</h1>
                <h1>About Us</h1>
            </div>
            <div className="flex md:gap-[16px]">
                <button className="btn hidden md:flex rounded-full md:w-[104px] md:h-[40px] md:px-[24px] md:py-[8px] bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white">Sign Up</button>
                <button className="btn hidden md:flex rounded-full md:w-[88px] md:h-[40px] md:px-[24px] md:py-[8px] border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white">Login</button>

            </div>

            {/* Mobile */}
            <div className="flex justify-end items-center w-[210px] h-[40px] gap-[12px] md:hidden">
                <div className="md:hidden cursor-pointer"> <Searchicon /> </div>
                <div className="md:hidden cursor-pointer"> <Mobmenu /> </div>
            </div>
        </header>
    )
}
