"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/app/components/loading';

export default function PhonesPage() {
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
          <div>
            <h1>{body.map((phone, index) => {
              return (
                <>
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
                        Preço: R${phone.preco}
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
                </>
              )
            })}
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
