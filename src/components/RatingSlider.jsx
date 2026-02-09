import { useState } from "react";

export default function RatingSlider() {
    const RANGE = {
        min: 0,
        max: 10,
    };

    const [rating, setRating] = useState({
        min: 0,
        max: 10,
    });

    const minPercent =
        ((rating.min - RANGE.min) / (RANGE.max - RANGE.min)) * 100;

    const maxPercent =
        ((rating.max - RANGE.min) / (RANGE.max - RANGE.min)) * 100;

    const startDrag = (e, type) => {
        e.preventDefault();
        const slider = e.currentTarget.parentElement;
        const rect = slider.getBoundingClientRect();

        const onMove = (ev) => {
            const percent = Math.min(
                100,
                Math.max(0, ((ev.clientX - rect.left) / rect.width) * 100)
            );

            const value = Number(
                (
                    RANGE.min +
                    (percent / 100) * (RANGE.max - RANGE.min)
                ).toFixed(1)
            );

            setRating((prev) => {
                if (type === "min" && value <= prev.max)
                    return { ...prev, min: value };

                if (type === "max" && value >= prev.min)
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
                <h1 className="text-[14px]">{rating.min}</h1>
                <h1 className="text-[14px]">{rating.max}</h1>
            </div>
        </div>
    );
}
