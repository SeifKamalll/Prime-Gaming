import Logo from "../icons/logo.svg?react";
import Facebook from "../icons/facebook.svg?react";
import Instagram from "../icons/instagram.svg?react";
import Twitter from "../icons/twitter.svg?react";
import Youtube from "../icons/youtube.svg?react";
import Location from "../icons/location.svg?react";
import Telephone from "../icons/telephone.svg?react";
import Mail from "../icons/lastmail.svg?react";


export default function Footer() {
    return (
        <div className="flex justify-center items-center bg-[#171621] w-full h-[707.5px] md:h-[343.5px] lg:h-[366.5px]">
            <div className="flex flex-col md:flex-row bg-[#171621] w-[382px] h-[643.5px] gap-[24px] md:w-[884px] md:h-[223.5.5px] md:gap-[12px] lg:w-[1200px] lg:h-[246.5px]">
                {/* First Section */}
                <div className="flex flex-col justify-center w-full h-[201.5px] gap-[12px] md:w-[311px] md:h-[223.5px] lg:w-[493px] lg:h-[246.5px] lg:gap-[24px]">
                    <div className="flex items-center w-full h-[57px] gap-[24px] lg:h-[66px]">
                        <div className="cursor-pointer"> <Logo className="w-[67px] h-[57px] lg:w-[77px] lg:h-[66px]" /> </div> <h1 className="text-[14px] lg:text-[16px]">Unleash your gaming potential with Prime Gaming</h1>
                    </div>
                    <h1 className="w-full h-[88px] text-justify text-[14px] md:text-[16px] text-[#888888] capitalize">Step into the future of gaming with Prime Gaming. Explore top-tier reviews, news, and in-depth analysis on the latest and greatest games. Join the gaming community now to get exclusive content and features.</h1>
                    <div className="flex w-full justify-center h-[32.5px] gap-[85.66px]">
                        <Facebook className="w-[24px] h-[24px]" /> <Instagram className="w-[24px] h-[24px]" /> <Twitter className="w-[24px] h-[24px]" /> <Youtube className="w-[35px] h-[24.5px]" />
                    </div>
                </div>
                {/* Middle Section */}
                <div className="flex w-full h-[213px] md:w-[359px] lg:w-[493px] lg:h-[227px] lg:gap-[4px]">
                    <div className="flex flex-col items-center w-[127.33px] h-full gap-[36px] md:w-[119.67px] lg:w-[161.67px]">
                        <h1 className="h-[25px] lg:h-[31px] text-[16px] lg:text-[20px] text-[#FF5733]">Explore</h1>
                        <div className="flex flex-col items-center w-full h-[152px] gap-[24px] lg:h-[160px]">
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Trending Games</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Upcoming Releases</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Reviews</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">News</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-[127.33px] h-full gap-[36px] md:w-[119.67px] lg:w-[161.67px]">
                        <h1 className="h-[25px] lg:h-[31px] text-[16px] lg:text-[20px] text-[#FF5733]">Resources</h1>
                        <div className="flex flex-col items-center w-full h-[152px] gap-[24px] lg:h-[160px]">
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">FAQ</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Tutorials</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Community Forums</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Membership</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-[127.33px] h-full gap-[36px] md:w-[119.67px] lg:w-[161.67px]">
                        <h1 className="h-[25px] lg:h-[31px] text-[16px] lg:text-[20px] text-[#FF5733]">Programs</h1>
                        <div className="flex flex-col items-center w-full h-[152px] gap-[24px] lg:h-[160px]">
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Game Of The Month</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Game Of The Year</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Developers Spotlight</h1>
                            <h1 className="text-[13px] lg:text-[14px] text-[#888888] h-[20px]">Beta Access</h1>
                        </div>
                    </div>
                </div>
                {/* Last Section */}
                <div className="flex flex-col items-center w-full h-[181px] gap-[36px] md:w-[190px] md:gap-[24px] lg:h-[187px]">
                    <h1 className="h-[25px] lg:h-[31px] text-[16px] lg:text-[20px] text-[#B53E24]">Contact Us</h1>
                    <div className="flex flex-col items-center w-[190px] h-[120px] gap-[24px]">
                        <div className="flex w-full h-[24px] gap-[4px]"> <Location className="w-[24px] h-[24px]" /> <h1 className="text-[14px] text-[#888888]">Usa - Washington DC</h1> </div>
                        <div className="flex w-full h-[24px] gap-[4px]"> <Telephone className="w-[24px] h-[24px]" /> <h1 className="text-[14px] text-[#888888]">1234-56789</h1> </div>
                        <div className="flex w-full h-[24px] gap-[4px]"> <Mail className="w-[24px] h-[24px]" /> <h1 className="text-[14px] text-[#888888]">PrimeGmain@Gmail.com</h1> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
