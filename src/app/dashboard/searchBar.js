"use client";

import { useRouter } from 'next/navigation';
// import { Links } from 'next/link';

export default function SearchBar() {
    const router = useRouter();
    const handleSubmit = (event) => {
        event.preventDefault();

        const marca = event.target.marca.value;
        const url = `http://localhost:3000/dashboard/phones/search?marca=${marca}`;
        router.push(url);
    }

    return (
        <form 
            id="search"
            onSubmit={handleSubmit}
        >
        <label 
          htmlFor="marca" 
          className="leading-7 text-sm text-gray-600"
        >
          Nome da marca
        </label>
        <input 
          type="text" 
          id="marca"
          name="marca"
          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-transparent focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
        />
        <button 
          type="submit" 
          className="inline-flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded mt-4"
        >
          Buscar
        </button>
      </form>

    )
}