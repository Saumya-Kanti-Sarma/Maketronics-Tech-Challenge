'use client';

import Cart from '@/components/Cart/Cart';
import axios from 'axios';
import { useEffect, useState } from 'react';
type Product = {
  title: string;
  price: string;
  image: string;
};

export default function HomePage() {
  const [search, setSearch] = useState(''); //stores search values
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [suggestion, setSuggestion] = useState<string[]>([]); //stores search values
  const [clickedAsideBtn, setclickedAsidebtn] = useState(false); // Checks if aside Btn is clicked
  const handleAside = () => setclickedAsidebtn((prev) => !prev)

  useEffect(() => {
    async function getData() {
      const req_data = await axios.get(`http://localhost:8000/api/?page=${page}`);
      setProducts(req_data.data);
      const req_keyword = await axios.get(`http://localhost:8000/api/keywords`);
      setSuggestion(req_keyword.data);

      console.log(req_data);
      console.log(req_keyword);

    }
    getData();
  }, [page]);
  const filtered =
    suggestion.length > 0
      ? suggestion.filter(
        (item) =>
          item &&
          item.toLowerCase().includes(search.toLowerCase()) &&
          search.length > 0
      )
      : [""];


  return (
    <div className={`bg-[#202120] w-full h-[100dvh] flex justify-center items-center relative`}>
      <div className={`absolute left-1 top-1 transision duration-220 ease-in-out  ${clickedAsideBtn ? 'left-[220px]' : ''}`}>
        <button
          className={`bg-transparent border-none cursor-pointer opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100 `}
          onClick={handleAside}
        >
          <img
            src="/menu.svg"
            alt="menu-btn"
            className={`w-[30px] aspect-square transition-transform duration-300 ease-in-out
        ${clickedAsideBtn ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
      <aside
        className={` absolute h-full bg-[#0e0e0e67] transition-all duration-300 ease-in-out overflow-hidden z-100 w-[220px]
  ${clickedAsideBtn ? "left-[0]" : "left-[-220px]"}`}
      >
      </aside>

      <section className={`flex-1 h-full pb-5 flex flex-col justify-end gap-[20px] items-center relative over`}>

        {/* Carts */}
        <div className="h-auto w-[98%] max-w-[1200px] overflow-y-auto">
          {products.length > 0 ? products.map((item, index) => (
            <Cart title={item.title} price={item.price} img={item.image} key={index} />
          )) : <>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div className="flex justify-start p-5 gap-2.5 items-start bg-[#ffffff07] rounded-3xl max-w-[800px] mb-5 opacity-animation" key={index}>
                <div className="flex justify-start items-center">
                  <div className="h-[200px] object-cover w-[120px] bg-[#ffffff27] rounded-2xl"></div>
                </div>
                <div className="flex flex-col justify-between items-start h-[200px] w-full">
                  <div className="bg-[#ffffff27] rounded-2xl w-full h-[150px]"></div>
                  <div className="bg-[#ffffff27] rounded-2xl w-full h-[40px]"></div>

                </div>
              </div>
            ))}

          </>}

        </div>

        {/* Input Area */}
        <div className="w-[98%] max-w-[1200px] relative flex justify-center">
          {/* Input */}
          <input
            type="text"
            name="searchbox"
            id="search-bar"
            placeholder="Search any books"
            className="bg-[#303131] h-[80px] w-full rounded-3xl border-none text-white pl-5 text-[18px] outline-none"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Search Button */}
          <button className="absolute border-none right-[3%] h-full bg-transparent">
            <img src="/search.svg" alt="search" id="search-img"
              className="w-[25px] aspect-square object-cover invert-100" />
          </button>

          {/* Suggestions */}
          {
            filtered.length > 0 && (
              <div className="w-[98%] max-w-[1200px] absolute left-2 bottom-[88px] z-10" style={{ display: filtered[0] == search ? "none" : "" }}>
                <ul className="text-[#ffffff94] w-full">
                  {
                    filtered.slice(0, 3).map((item, index) => (
                      <li
                        key={index}
                        className="border-[1px] border-transparent px-5 py-3 w-full rounded-[4px] opacity-70
                        transition duration-220 hover:bg-[#ffffff04] hover:border-[#ffffff2f] hover:opacity-100"
                        onClick={() => setSearch(item)}
                      >
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }
        </div>
      </section>
    </div>
  );
}
