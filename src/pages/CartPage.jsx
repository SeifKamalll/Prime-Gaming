
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { useCart } from '../store';
import toast from 'react-hot-toast';

export default function CartPage() {
    const { items, total } = useCart();
    const [token, setToken] = useState(null);


    useEffect(() => {
        let token = localStorage.getItem("token") || sessionStorage.getItem("token")
        setToken(token);
    }, [])


    const CheckOut = () => {
        if (total <= 0) {
            toast.error("Please Add Games First")
        } else {
            token ? toast.success("Checkout Successful") : toast.error("Please Login First")
        }
    }

    return (
        <div className="container mx-auto flex flex-col items-center px-4 pb-[15px] lg:py-[40px]">
            <div className="w-full flex flex-col lg:flex-row justify-center gap-8 pt-20">
                <div className="w-full max-h-[500px] flex flex-col gap-[30px]">
                    <h1 className="text-[24px] leading-[24px] tracking-normal font-semibold">Shopping Cart</h1>
                    <div className="flex flex-col gap-[30px] overflow-auto">
                        {items.map((el) => (
                            <CartItem key={el.documentId} game={el} />
                        ))}
                    </div>
                </div>
                <div className="w-full lg:max-w-[536px] lg:h-[500px] h-fit border border-[#FF5733] rounded-[10px] px-6 py-8 lg:px-[35px] lg:py-[30px] flex flex-col gap-[45px] bg-transparent">
                    <h2 className="text-[20px] font-semibold text-white text-center">Order Summary</h2>

                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[14px]">Discount code / Promo code</label>
                        <input type="text" placeholder="Code" className="input outline-0 border-[#FF5733] w-full h-[56px] bg-transparent text-[14px] text-white placeholder:text-[#9E9E9E]" />
                        <button
                            type="button"
                            className="absolute right-3 top-[39px] px-6 h-9 rounded-md border border-[#FF5733] text-sm bg-transparent hover:bg-black cursor-pointer">
                            Apply
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <span className="font-semibold text-[18px]">Subtotal</span>
                            <span className="font-semibold">${total}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[#6B6B6B] font-medium">Estimated Tax</span>
                            <span className="font-semibold">${(0.14 * total)}</span>
                        </div>


                        <div className="flex justify-between pt-2">
                            <span className="font-semibold text-[18px]">Total</span>
                            <span className="font-semibold text-[18px]">${Math.round(1.14 * total)}</span>
                        </div>
                    </div>
                    <button onClick={CheckOut} className="w-full btn rounded-lg h-[56px] bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white">Checkout</button>
                </div>
            </div>
        </div>
    );
}
