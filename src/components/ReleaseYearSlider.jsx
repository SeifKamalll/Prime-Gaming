import { useState } from "react";

export default function ReleaseYearSlider() {
    const RANGE = {
        min: 1980,
        max: 2026,
    };

    const [years, setYears] = useState({
        min: 1980,
        max: 2026,
    });

    const minPercent =
        ((years.min - RANGE.min) / (RANGE.max - RANGE.min)) * 100;

    const maxPercent =
        ((years.max - RANGE.min) / (RANGE.max - RANGE.min)) * 100;

    const startDrag = (e, type) => {
        e.preventDefault();
        const slider = e.currentTarget.parentElement;
        const rect = slider.getBoundingClientRect();

        const onMove = (ev) => {
            const percent = Math.min(
                100,
                Math.max(0, ((ev.clientX - rect.left) / rect.width) * 100)
            );

            const value = Math.round(
                RANGE.min + (percent / 100) * (RANGE.max - RANGE.min)
            );

            setYears((prev) => {
                if (type === "min" && value < prev.max)
                    return { ...prev, min: value };

                if (type === "max" && value > prev.min)
                    return { ...prev, max: value };

                return prev;
            });
        };

        const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    return (
        <div className="flex flex-col w-full h-[52px] gap-[10px] md:w-[168.67px] lg:w-[266px]">
            {/* Slider */}
            <div className="relative w-full h-[20px] flex items-center">
                {/* Track */}
                <div className="absolute w-full h-[4px] bg-[#2a2938] rounded-full" />

                {/* Active range */}
                <div
                    className="absolute h-[4px] bg-[#FF5733] rounded-full"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                />

                {/* Min handle */}
                <div
                    className="absolute w-[14px] h-[14px] bg-[#FF5733] rounded-full cursor-pointer"
                    style={{ left: `calc(${minPercent}% - 7px)` }}
                    onMouseDown={(e) => startDrag(e, "min")}
                />

                {/* Max handle */}
                <div
                    className="absolute w-[14px] h-[14px] bg-[#FF5733] rounded-full cursor-pointer"
                    style={{ left: `calc(${maxPercent}% - 7px)` }}
                    onMouseDown={(e) => startDrag(e, "max")}
                />
            </div>

            {/* Labels */}
            <div className="flex justify-between w-full h-[22px]">
                <h1 className="text-[14px]">{years.min}</h1>
                <h1 className="text-[14px]">{years.max}</h1>
            </div>
        </div>
    );
}
