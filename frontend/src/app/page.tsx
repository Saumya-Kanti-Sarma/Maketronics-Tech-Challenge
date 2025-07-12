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
  const [searchValue, setSearchValue] = useState('');
  const [hasSubmit, setHasSubmit] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState('');
  const [loads, setloads] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestion] = useState<string[]>([]);
  useEffect(() => {
    const fetchdata = async () => await axios.get('https://maketronics-tech-challenge.onrender.com/api/keywords').then((req) => setSuggestion(req.data));
    fetchdata();
  }, [])
  const filtered = suggestions.filter(item =>
    item.toLowerCase().includes(search.toLowerCase()) && search.length > 0
  );

  const handleSearchSubmit = async () => {
    setLoadMoreBtn("");
    setloads([]);
    const processedSearch = search.replaceAll(" ", "-");
    setSearchValue(processedSearch);  // store it for load more
    setHasSubmit(true);
    setPage(1);  // reset page
    const req = await axios.get(`https://maketronics-tech-challenge.onrender.com/api/filter?keywords=${processedSearch}&page=1`);
    setloads(req.data); // set directly
    setSearch("");
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    const req = await axios.get(`https://maketronics-tech-challenge.onrender.com/api/filter?keywords=${searchValue}&page=${nextPage}`);
    setPage(nextPage);
    if (req.data.length <= 0) setLoadMoreBtn('hidden')
    setloads(prev => [...prev, ...req.data]);

  };


  return (
    <div className={`bg-[#202120] w-full h-[100dvh] flex justify-center items-center relative`}>

      <section className={`flex-1 h-full flex flex-col justify-center items-center ${hasSubmit ? 'justify-end gap-[20px]' : 'justify-center gap-[10vh]'}`}>

        {/* Title */}
        <div className={`flex flex-col w-full gap-3 justify-center items-center ${hasSubmit ? 'hidden' : ''}`}>
          <h1 className="text-6xl font-bold text-white text-center
          max-lg:text-5xl max-md:text-3xl max-sm:text-[18px]
          ">
            Welcome to Universal <b className="text-[#ee6868]   underline underline-offset-9 decoration-3">Book Search</b>
          </h1>
          <p className="text-2xl text-white text-center
          max-lg:text-[18px] max-md:text-[16px] max-sm:text-[14px]
          ">Get access to 1000+ books across variety of topics</p>
        </div>
        {/* Carts */}
        <div className={`h-auto w-[98%] max-w-[1200px] overflow-y-auto ${hasSubmit ? '' : 'hidden'}`}>

          {loads.length > 0 ? (
            <>
              {loads.map((item, index) => (
                <Cart title={item.title} price={item.price} img={item.image} key={index} />
              ))}

              {/* Load More Button */}
              <div className=" w-[98%] max-w-[800px] flex justify-center my-5">
                <button
                  onClick={loadMore}
                  className={` w-full px-6 py-2 bg-[#ffffff14] hover:bg-[#ffffff22] text-white rounded-xl transition ${loadMoreBtn}`}
                >
                  Load More
                </button>
              </div>
            </>
          ) : (
            <>
              {[1, 2, 3].map((_, index) => (
                <div
                  className="flex justify-start p-5 gap-2.5 items-start bg-[#ffffff07] rounded-3xl max-w-[800px] mb-5 opacity-animation"
                  key={index}
                >
                  <div className="flex justify-start items-center">
                    <div className="h-[200px] object-cover w-[160px] bg-[#ffffff27] rounded-2xl"></div>
                  </div>
                  <div className="flex flex-col justify-between items-start h-[200px] w-full">
                    <div className="bg-[#ffffff27] rounded-2xl w-full h-[150px]"></div>
                    <div className="bg-[#ffffff27] rounded-2xl w-full h-[40px]"></div>
                  </div>
                </div>
              ))}
            </>
          )}


        </div>
        {/* Input Area */}
        <div className={`w-[98%] max-w-[1200px] relative ${hasSubmit ? 'mb-5' : 'mb-20'}`}>
          {/* Input */}
          <input
            type="text"
            name="searchbox"
            id="search-bar"
            placeholder="Search java, novels etc.."
            className="bg-[#303131] h-[80px] w-full rounded-3xl border-none text-white pl-5 text-[18px] outline-none"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            //on press enter, I want to submit 
            onSubmit={handleSearchSubmit}
          />

          {/* Search Button */}
          <button className="absolute border-none right-[3%] h-full bg-transparent opacity-50 transition duration-220 hover:opacity-100 cursor-pointer" onClick={handleSearchSubmit}>
            <img src="/search.svg" alt="search" id="search-img"
              className="w-[25px] aspect-square object-cover invert-100" />
          </button>

          {/* Suggestions */}
          {
            filtered.length > 0 && (
              <div className={`w-[98%] max-w-[1200px] absolute left-2 z-10
               ${hasSubmit ? 'bottom-[88px] mb-5 bg-[#242424]' : 'top-[88px] mb-20'}`} style={{ display: filtered[0] == search ? "none" : "" }}>
                <ul className="text-[#ffffff94] w-full">
                  {
                    filtered.splice(0, 5).map((item, index) => (
                      <li
                        key={index}
                        className="border-[1px] border-transparent px-5 py-3 w-full rounded-[4px] opacity-60 bg-[#ffffff21] mb-2
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
