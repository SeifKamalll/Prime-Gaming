

export default function Faq() {
    return (
        <div className="flex flex-col w-[382px] h-[500px] gap-[24px] md:w-[884px] md:h-[500px] md:gap-[32px] lg:w-[1200px]">
            {/* Faq Text */}
            <div className="w-full flex justify-center items-center h-[50px]">
                <h1 className="text-[32px] font-bold">FAQ</h1>
            </div>
            {/* The FaQs */}
            <div className="flex flex-col w-full h-[406px] gap-[24px] md:h-[404px] rounded-md">

                <details className="collapse collapse-arrow bg-[#181724] rounded-md border-2 border-[#6B2515]" name="my-accordion-det-1">
                    <summary className="collapse-title text-[16px] md:text-[20px] capitalize">What services does Prime Gaming offer</summary>
                    <div className="collapse-content text-[14px] pt-3 md:text-[16px] bg-[#13121E] text-[#979797] border-t-2 border-[#6B2515] capitalize">We provide a range of gaming content, including reviews, guides, and up-to-date gaming news. You can also access exclusive discounts, track your progress, and join our gaming community</div>
                </details>

                <details className="collapse collapse-arrow bg-[#181724] rounded-md border-2 border-[#6B2515]" name="my-accordion-det-1">
                    <summary className="collapse-title text-[16px] md:text-[20px] capitalize">Do I need an account to use the site?</summary>
                    <div className="collapse-content text-[14px] pt-3 md:text-[16px] bg-[#13121E] text-[#979797] border-t-2 border-[#6B2515] capitalize">While browsing is free, registering an account unlocks exclusive features like tracking achievements, discounts, and joining the community</div>
                </details>
                <details className="collapse collapse-arrow bg-[#181724] rounded-md border-2 border-[#6B2515]" name="my-accordion-det-1">
                    <summary className="collapse-title text-[16px] md:text-[20px] capitalize">Are there any subscription fees?</summary>
                    <div className="collapse-content text-[14px] pt-3 md:text-[16px] bg-[#13121E] text-[#979797] border-t-2 border-[#6B2515] capitalize">No, registering on our site is completely free. Some exclusive deals and content are member-only but come at no extra charge</div>
                </details>
                <details className="collapse collapse-arrow bg-[#181724] rounded-md border-2 border-[#6B2515]" name="my-accordion-det-1">
                    <summary className="collapse-title text-[16px] md:text-[20px] capitalize">How can I contact support?</summary>
                    <div className="collapse-content text-[14px] pt-3 md:text-[16px] bg-[#13121E] text-[#979797] border-t-2 border-[#6B2515] capitalize">You can reach our support team via the “Contact Us” page for any inquiries or issues related to your account or services</div>
                </details>

            </div>
        </div>
    )
}
