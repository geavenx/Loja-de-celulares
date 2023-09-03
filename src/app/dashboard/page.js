"use client"

import SearchBar from "./searchBar";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { push } = useRouter();
  const handleLogout = async () => {
    await axios.post('api/auth/logout');
    push('/');
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"
          >Loja de celulares
          </h1>
          <p className="mb-8 leading-relaxed"
          >Seja bem-vindo!
          </p>
          <div className="flex justify-center">
            <Link
              className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg"
              href="/dashboard/phones"
            >
              Ver todos
            </Link>
            <button
              className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="justify-center w-1/4 pt-12">
          <h2 className="title-font sm:text-2xl mb-4 font-medium text-gray-900">
            Filtrar
          </h2>
          <SearchBar />
        </div>
      </div>
    </section>
  )
}
