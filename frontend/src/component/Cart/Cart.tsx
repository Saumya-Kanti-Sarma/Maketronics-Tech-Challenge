interface CartProps {
  title: string;
  link: string;
  image: string;
  price: string;
  keyword: string[];
}

export default function Cart({ title = "This is Title", link, image, price, keyword }: CartProps) {
  return (
    <div className="bg-[#f5f5f5] flex flex-col justify-between items-center rounded-2xl border-[#00000060] max-w-md w-full p-6 transition-transform duration-300 hover:shadow-lg hover:scale-[1.008] hover:border-[0.5px]">

      <div>
        <img
          src={image}
          alt="Product"
          className="rounded-lg mx-auto mb-4 w-48 h-48 object-contain bg-transparent"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title.slice(0, 70) + (title.length > 100 ? "..." : "")}</h2>
        <p className="text-blue-600 font-bold text-xl mb-4">₹{price}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-sm text-gray-500">{keyword.map((item, index) => (< p className="inline-block" key={index}>{item}{", "}</p>))}</span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
        >
          View Product
        </a>
      </div>
    </div>
  );
}
