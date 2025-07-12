interface cartProps {
  img: string,
  title: string,
  price: string,
}
const Cart: React.FC<cartProps> = ({ img, title, price }) => {
  return (
    <div className="flex justify-start p-5 gap-2.5 items-start bg-[#ffffff07] rounded-3xl max-w-[800px] mb-5 ">
      <div className="flex justify-start items-center">
        <img src={img} alt="img.jpeg" className="h-[200px] object-cover min-w-[140px]" />
      </div>
      <div className="flex flex-col justify-between items-start h-[200px] w-full">
        <h2 className="text-2xl font-bold text-white max-sm:text-[14px]">{title}</h2>
        <p className=" text-4xl text-[#ffffff] max-sm:text-[20px]">₹{price}</p>
        <button className="p-5 bg-[#949494] text-white border-none rounded-2xl bold w-[90%] cursor-pointer opacity-60 transition duration-190 hover:opacity-100 max-sm:p-2 max-sm:rounded-[10px]"><b>Buy Now</b></button>
      </div>
    </div>
  )
}

export default Cart