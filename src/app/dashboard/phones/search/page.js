"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/app/components/loading';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


export default function Search() {
  const searchParams = useSearchParams();
  const params = searchParams.get('marca');
  var phoneFound = false;

  const [isLoading, setIsLoading] = useState(true);
  const [body, setBody] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/phones');

      setIsLoading(false);
      setBody(data)
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-80 items-center justify-center flex-col">
        <Loading />
      </div>
    )
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <h1>{body.map((phone, index) => {
            const test = smartSearch(params, phone.marca)
            if (phone.marca === params || test) {
              phoneFound = true;
              return (
                <div
                  className="py-8 flex flex-wrap md:flex-nowrap"
                  key={index}
                >
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span
                      className="font-semibold title-font text-gray-700"
                    >
                      CELULARES
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2
                      className="text-2xl font-medium text-gray-900 title-font mb-2"
                    >
                      {phone.marca}
                    </h2>
                    <p
                      className="leading-relaxed"
                    >
                      Preço: {phone.preco}
                    </p>
                    <p
                      className="leading-relaxed"
                    >
                      Estoque: {phone.estoque}
                    </p>
                    <a
                      className="text-purple-500 inline-flex items-center mt-4"
                      href="/dashboard"
                    >
                      <svg
                        className="w-4 h-4 ml-2 transform rotate-180"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                      Voltar
                    </a>
                  </div>
                </div>
              );
            }

          })}
            {/* If there is no phone found */}
            {!phoneFound && (
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="text-center mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                      Erro!
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                      Nenhum celular desta marca foi encontrado!
                    </p>
                    <div className="flex mt-6 justify-center">
                      <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center"></div>
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                      <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-5 flex-shrink-0">
                      <svg 
                        className="w-12 h-12" 
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      >
							          <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
						          </svg>
                      </div>
                    </div>
                  </div>
                  <button className="flex mx-auto mt-8 text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
                    <Link href="/dashboard">Voltar</Link>
                  </button>
                </div>
              </section>
            )}
          </h1>
        </div>
      </div>
    </section>
  )
}

function smartSearch(query, marca) {
  const regex = new RegExp(query, 'i');
  const match = regex.test(marca)
  return match;
}