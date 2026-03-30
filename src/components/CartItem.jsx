import { IoMdClose } from 'react-icons/io';
import { domain, useCart } from '../store';

export default function CartItem({ game }) {
    const { incrmentQty, decrmentQty, removeFromCart } = useCart();

    return (
        <div className="flex w-full h-[120px] md:h-[130px] gap-4 items-center bg-gray-950/40 rounded-lg p-1">
            <div className="h-full w-[30%] md:w-[20%] border-[#FF5733] border rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover object-center" src={game.cover ? domain + game.cover?.url : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} alt="" />
            </div>
            <div className="flex items-center h-full w-[70%] md:w-[80%] gap-5 justify-between p-2">
                <div className="h-full flex flex-col justify-between ">
                    <h1 className="font-normal text-[14px] md:text-[16px] tracking-normal">{game.name}</h1>
                    <h1 className="font-normal text-[14px] md:text-[14px] tracking-normal">Price : {game.disprice ? game.disprice : game.price}$</h1>
                </div>
                <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-center items-center gap-8 md:gap-9">
                        <h1>{game.qty * (game.disprice ? game.disprice : game.price)}$</h1>
                        <IoMdClose onClick={() => removeFromCart(game.documentId)} className="cursor-pointer text-[#FF5733] hover:scale-125 hover-3d" />
                    </div>
                    <div className="flex items-center justify-center gap-6 rounded-md overflow-hidden">
                        <button className="text-[#FF5733] md:text-xl hover:scale-150 hover-3d cursor-pointer flex justify-center items-center" onClick={() => decrmentQty(game.documentId)}>
                            −
                        </button>

                        <div className="select-none">{game.qty}</div>

                        <button className="text-[#FF5733] md:text-xl hover:scale-150 hover-3d cursor-pointer flex justify-center items-center" onClick={() => incrmentQty(game.documentId)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
