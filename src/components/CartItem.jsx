import { IoMdClose } from 'react-icons/io';
import { domain, useCart } from '../store';

export default function CartItem({ game }) {
    const { incrmentQty, decrmentQty, removeFromCart } = useCart();

    return (
        <div className="flex w-full gap-4 items-center bg-gray-950/40 rounded-lg p-1">
            <div className="flex justify-center items-center h-30 w-30 border-[#FF5733] border rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover" src={game.cover ? domain + game.cover?.url : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} alt="" />
            </div>
            <div className="flex w-full h-[88px] justify-between">
                <div className="flex flex-col gap-10">
                    <h1 className="w-50 font-normal text-[16px] leading-[24px] tracking-normal">{game.name}</h1>
                    <h1 className="font-normal text-[14px] leading-[24px] tracking-normal">Price : $ {game.disprice ? game.disprice : game.price} </h1>
                </div>
                <div className="flex flex-col w-[110px] h-[88px] gap-[40px]">
                    <div className="flex justify-center items-center gap-10">
                        <h1>${game.qty * (game.disprice ? game.disprice : game.price)}</h1>
                        <IoMdClose onClick={() => removeFromCart(game.documentId)} className="cursor-pointer text-[#FF5733] hover:scale-125 hover-3d" />
                    </div>
                    <div className="flex items-center rounded-md overflow-hidden">
                        <button className="px-3 py-1 text-[#FF5733] hover:bg-black cursor-pointer" onClick={() => decrmentQty(game.documentId)}>
                            −
                        </button>

                        <div className="px-4 select-none">{game.qty}</div>

                        <button className="px-3 py-1 text-[#FF5733] hover:bg-black cursor-pointer" onClick={() => incrmentQty(game.documentId)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
