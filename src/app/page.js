"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loading";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (user && !error) {
        push('/dashboard');
        return;
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-80 items-center justify-center flex-col">
        <Loading />
      </div>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      user: event.currentTarget.usuario.value,
      password: event.currentTarget.senha.value,
    };

    try {
      const { data } = await axios.post('api/auth/login', payload);

      // redirect to /dashboard if user is authenticated
      push('/dashboard')

    } catch (err) {
      toast.error("Usuário ou senha inválidos", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <ToastContainer />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Loja de celulares
          </h1>
          <p className="mb-8 leading-relaxed">
            Para acessar o conteúdo da loja, basta fazer login com as credenciais da API.
          </p>
        </div>
        <form
          id="search"
          onSubmit={handleSubmit}
        >
          <div className="mb-2">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              required
              className="w-52 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-transparent focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              required
              className="w-52 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-transparent focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="text-center mt-8">
            <button
              className="inline-flex text-white bg-purple-500 border-0 py-2 px-12 focus:outline-none hover:bg-purple-600 rounded text-lg"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

async function getUser() {
  try {
    const { data } = await axios.get('api/auth/me');
    return {
      user: data,
      error: null,
    }
  } catch (err) {
    return {
      user: null,
      error: err.message,
    }
  }
}