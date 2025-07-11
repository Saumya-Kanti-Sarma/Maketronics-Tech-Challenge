"use client";
import { useEffect, useState } from "react";
import Cart from "@/component/Cart/Cart";
import axios from "axios";
import { Menu } from "lucide-react"; // for toggle icon

interface Product {
  title: string;
  link: string;
  image: string;
  price: string;
  keyword: string[];
}



export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setcategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios("/api/products");
        setProducts(res.data);
        setFiltered(res.data); // initially all products

        const allKeywords: string[] = Array.from(
          new Set(
            res.data.flatMap((item: Product) => item.keyword.map(k => k.trim().toLowerCase()))
          )
        );
        setcategories(allKeywords)
        setLoadingCategory(false)

      } catch (error) {
        console.error("cannot fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // when category is selected, filter
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      if (selectedCategory) {
        const filteredProducts = products.filter((product) =>
          product.keyword.map(k => k.toLowerCase()).includes(selectedCategory.toLowerCase())
        );
        setFiltered(filteredProducts);
      } else {
        setFiltered(products);
      }
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [selectedCategory, products]);


  return (
    <div className="flex h-[calc(100dvh-60px)] w-full" onClick={() => setShowSidebar(false)}>


      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md z-40 w-full max-lg:absolute  max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:w-[220px] transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:flex md:w-[280px] p-4`}
      >
        <div className="w-full">
          <h1 className="text-lg font-bold mb-4 text-blue-800">All Categories</h1>
          <ul className="space-y-2 w-full">
            {loadingCategory ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <li key={idx} className="h-10 w-full bg-gray-300 rounded animate-pulse mx-[auto] my-0 mb-10"></li>
              ))
            ) : (
              <>
                <li
                  onClick={() => setSelectedCategory(null)}
                  className={`cursor-pointer hover:text-blue-500 ${selectedCategory === null ? "text-blue-600 font-semibold" : ""
                    }`}
                >
                  All
                </li>
                {categories.map((cat, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowSidebar(false);
                    }}
                    className={`cursor-pointer hover:text-blue-500 ${selectedCategory?.toLowerCase() === cat.toLowerCase()
                      ? "text-blue-600 font-semibold"
                      : ""
                      }`}
                  >
                    {cat}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 flex-1 h-full overflow-y-auto overflow-x-hidden">

        <div className="flex justify-start gap-5 items-center">
          {/* Sidebar toggle for small screens */}
          <button
            className="w-[35px] h-[35px] bg-blue-700 text-white rounded flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation(); // <-- prevents parent div's click
              setShowSidebar(!showSidebar);
            }}
          >
            <Menu size={20} />
          </button>

          <h1 className="text-2xl font-bold text-blue-700">Product List</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 animate-pulse space-y-4"
              >
                <div className="w-full h-40 bg-gray-300 rounded-md" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
                <div className="h-8 bg-gray-300 rounded w-full" />
              </div>
            ))
            : filtered.map((product, index) => (
              <Cart key={index} title={product.title} image={product.image} link={product.link} price={product.price} keyword={product.keyword} />
            ))}
        </div>
      </div>
    </div>
  );
}
