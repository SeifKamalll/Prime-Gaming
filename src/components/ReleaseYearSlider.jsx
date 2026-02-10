export default function ReleaseYearSlider({ value, onChange }) {
    const RANGE = {
        min: 1980,
        max: 2026,
    };

    const years = {
        min: value[0],
        max: value[1],
    };

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

            const newValue = Math.round(
                RANGE.min + (percent / 100) * (RANGE.max - RANGE.min)
            );

            if (type === "min" && newValue < years.max) {
                onChange([newValue, years.max]);
            }

            if (type === "max" && newValue > years.min) {
                onChange([years.min, newValue]);
            }
        };

        const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    return (
        <div className="flex flex-col w-full h-[52px] gap-[10px]">
            <div className="relative w-full h-[20px] flex items-center">
                <div className="absolute w-full h-[4px] bg-[#2a2938] rounded-full" />
                <div
                    className="absolute h-[4px] bg-[#FF5733] rounded-full"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                />
                <div
                    className="absolute w-[14px] h-[14px] bg-[#FF5733] rounded-full cursor-pointer"
                    style={{ left: `calc(${minPercent}% - 7px)` }}
                    onMouseDown={(e) => startDrag(e, "min")}
                />
                <div
                    className="absolute w-[14px] h-[14px] bg-[#FF5733] rounded-full cursor-pointer"
                    style={{ left: `calc(${maxPercent}% - 7px)` }}
                    onMouseDown={(e) => startDrag(e, "max")}
                />
            </div>

            <div className="flex justify-between">
                <span>{years.min}</span>
                <span>{years.max}</span>
            </div>
        </div>
    );
}
