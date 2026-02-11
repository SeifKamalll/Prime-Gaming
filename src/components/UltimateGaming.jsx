import { useState } from "react";
import User from "../icons/mi_user.svg?react";
import Mail from "../icons/mail.svg?react";
import Google from "../icons/googleicon.svg?react";

export default function UltimateGaming() {
    const [activeTab, setActiveTab] = useState("signup");


    return (
        <div className="flex flex-col md:flex-row w-[382px] h-[904px] gap-[16px] md:w-[884px] md:h-[391px] lg:w-[1200px] lg:h-[372px] lg:gap-[24px]">
            {/* Left or Top(Mobile) Section */}
            <div className="flex flex-col items-center w-full h-[516px] gap-[12px] md:w-[434px] md:h-full lg:w-[588px] lg:gap-[16px]">
                <h1 className="w-full h-[31px] md:h-[38px] text-center md:text-left text-[20px] md:text-[24px]">Unlock the Ultimate <span className="text-[#FF5733]">Gaming Experience</span></h1>
                <h1 className="w-full h-[57px] lg:h-[44px] text-[12px] text-justify lg:text-[14px] capitalize">Sign up now to dive into exclusive content, track your progress, and connect with a global community of gamers. Don't miss out on special offers made just for you!</h1>
                <div className="flex flex-col md:flex-row md:flex-wrap w-full h-[404px] gap-[12px] md:h-[272px] lg:h-[252px] lg:gap-[24px]">
                    <div className="1 flex flex-col items-center w-full h-[92px] p-[12px] gap-[8px] md:w-[211px] md:h-[130px] lg:w-[282px] lg:h-[114px] bg-[#181724] rounded-md shadow-[0_0_1px_0px_#FF5733]">
                        <h1 className="text-[14px] lg:text-[16px] text-center">Access <span className="text-[#FF5733]">Exclusive Games</span></h1>
                        <h1 className="text-[12px] text-justify">Get early access to new releases and hidden gems, only for registered members. Be the first to play!</h1>
                    </div>
                    <div className="2 flex flex-col items-center w-full h-[92px] p-[12px] gap-[8px] md:w-[211px] md:h-[130px] lg:w-[282px] lg:h-[114px] bg-[#181724] rounded-md shadow-[0_0_1px_0px_#FF5733]">
                        <h1 className="text-[14px] lg:text-[16px] text-center">Track <span className="text-[#FF5733]">Stats <span className="text-white">&</span> Achievements</span></h1>
                        <h1 className="text-[12px] text-justify">Monitor gameplay stats, track achievements, and share your progress with fellow gamers easily</h1>
                    </div>
                    <div className="3 flex flex-col items-center w-full h-[92px] p-[12px] gap-[8px] md:w-[211px] md:h-[130px] lg:w-[282px] lg:h-[114px] bg-[#181724] rounded-md shadow-[0_0_1px_0px_#FF5733]">
                        <h1 className="text-[14px] lg:text-[16px] text-center">Join Our <span className="text-[#FF5733]">Community</span></h1>
                        <h1 className="text-[12px] text-justify">Connect with a passionate community of gamers. Share tips, strategies, and gaming experiences</h1>
                    </div>
                    <div className="4 flex flex-col items-center w-full h-[92px] p-[12px] gap-[8px] md:w-[211px] md:h-[130px] lg:w-[282px] lg:h-[114px] bg-[#181724] rounded-md shadow-[0_0_1px_0px_#FF5733]">
                        <h1 className="text-[14px] lg:text-[16px] text-center">Exclusive <span className="text-[#FF5733]">Discounts <span className="text-white">&</span> Offers</span></h1>
                        <h1 className="text-[12px] text-justify">Enjoy member-only discounts on top-rated games, DLCs, and in-game items. Save on your favorites!</h1>
                    </div>
                </div>
            </div>
            {/* Right or Bottom(Mobile) Section */}
            <div className="flex flex-col w-full h-[372px] px-[24px] py-[16px] gap-[16px] md:w-[434px] md:h-full lg:w-[588px] rounded-xl bg-[#181724]">
                <div className="flex flex-col items-center w-full h-[203px] gap-[8px]">
                    <div className="flex justify-center gap-[16px] w-full h-[41px]">
                        <button onClick={() => setActiveTab("signup")} className={`${activeTab === "signup" ? "underline underline-offset-[12px] text-[#FF5733] text-[24px]" : "text-[#FFB2A1] text-[20px]"} font-bold cursor-pointer`}>Sign Up</button>
                        <button onClick={() => setActiveTab("login")} className={`${activeTab === "login" ? "underline underline-offset-[12px] text-[#FF5733] text-[24px]" : "text-[#FFB2A1] text-[20px]"} font-bold cursor-pointer`}>Login</button>
                    </div>
                    <div className="flex flex-col w-full h-[73px] gap-[8px]">
                        <h1 className="text-[16px]">Name</h1>
                        <div className="flex items-center gap-[4px] w-full pl-[8px] py-[8px] border rounded">
                            <User className="w-[24px] h-[24px]" />
                            <input className="text-[14px] w-full outline-none" type="text" placeholder="Enter Your Name" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-[73px] gap-[8px]">
                        <h1 className="text-[16px]">E-Mail</h1>
                        <div className="flex items-center gap-[6px] w-full pl-[8px] py-[8px] border rounded">
                            <Mail className="w-[24px] h-[24px]" />
                            <input className="text-[14px] w-full outline-none" type="text" placeholder="Enter Your E-Mail" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full h-[121px] gap-[8px]">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-full w-full h-[44px] bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-[18px] text-white cursor-pointer">Sign Up</button>
                    <div className="flex justify-center items-center w-full gap-[10px] h-[24px]">
                        <div className="w-[152.5px] md:w-[178.5px] lg:w-[255.5px] h-[1px] bg-white"></div>
                        <h1 className="text-[16px]">Or</h1>
                        <div className="w-[152.5px] md:w-[178.5px] lg:w-[255.5px] h-[1px] bg-white"></div>
                    </div>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center justify-center gap-[6px] rounded-full w-full h-[44px] hover:bg-black border text-[16px] text-white cursor-pointer"><Google className="w-[24px] h-[24px]" /> <h1 className="text-[16px]">Sign Up With Google</h1></button>

                </div>

            </div>

        </div>
    )
}
