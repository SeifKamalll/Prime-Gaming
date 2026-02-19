import Logo from "../icons/logo.svg?react";
import Searchicon from "../icons/iconoir_search.svg?react";
import Mobmenu from "../icons/mobile_menu.svg?react";
import Arrowdown from "../icons/arrowdownheader.svg?react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Header() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);


    useEffect(() => {
        let token = localStorage.getItem("token") || sessionStorage.getItem("token")
        setToken(token);
    }, [])

    const Logout = () => {
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
        navigate(0);
    }

    return (

        <header className='fixed container top-0 z-50 justify-between flex items-center backdrop-blur-xs w-[430px] h-[64px] px-[24px] py-[12px] md:w-[1080px] md:h-[83px] md:py-[10px] md:gap-[20px] lg:w-[1440px] lg:h-[90px] lg:py-[12px]'>
            <div onClick={()=>{navigate(`/`)}} className="cursor-pointer"> <Logo /> </div>
            <div className="hidden md:block"> <Searchicon /> </div>
            <div className='hidden items-center justify-between md:flex lg:w-[811px] lg:h-[23px] font-Vazirmatn'>
                <h1>Home</h1>
                <h1 className="flex justify-center items-center gap-[4px]">News <Arrowdown /> </h1>
                <h1 className="flex justify-center items-center gap-[4px]">Store <Arrowdown /> </h1>
                <h1 className="flex justify-center items-center gap-[4px]">Review <Arrowdown /> </h1>
                <h1 className="flex justify-center items-center gap-[4px]">Guides <Arrowdown /> </h1>
                <h1>About Us</h1>
            </div>
            <div className="flex md:gap-[16px]">
                <button onClick={() => { navigate("/register") }} className={`${token ? "hidden" : "btn hidden md:flex rounded-full md:w-[104px] md:h-[40px] md:px-[24px] md:py-[8px] bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white"}`}>Sign Up</button>
                <button onClick={() => { navigate("/login") }} className={`${token ? "hidden" : "btn hidden md:flex rounded-full md:w-[88px] md:h-[40px] md:px-[24px] md:py-[8px] border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white"}`}>Login</button>
                <button onClick={Logout} className={`${token ? "btn hidden md:flex rounded-full md:w-[88px] md:h-[40px] md:px-[24px] md:py-[8px] border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white" : "hidden"}`}>Logout</button>

            </div>

            {/* Mobile */}
            <div className="flex justify-end items-center w-[210px] h-[40px] gap-[12px] md:hidden">
                <button onClick={() => { navigate("/login") }} className={`${token ? "hidden" : "btn flex md:hidden rounded-full w-[88px] h-[40px] px-[24px] py-[8px] border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white"}`}>Login</button>
                <button onClick={Logout} className={`${token ? "btn flex md:hidden rounded-full w-[88px] h-[40px] px-[24px] py-[8px] border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white" : "hidden"}`}>Logout</button>
                <div className="md:hidden cursor-pointer"> <Searchicon /> </div>
                <div className="md:hidden cursor-pointer"> <Mobmenu /> </div>
            </div>
        </header>
    )
}
