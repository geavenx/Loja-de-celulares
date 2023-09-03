"use client";

import { useSearchParams } from "next/navigation";

export default function GetUrlParams({ data }) {
    const searchParams = useSearchParams();
    const params = searchParams.get('marca');
    var phoneFound = false;

    return (
        <h1>{data.map((phone, index) => {
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
                            fill="none" 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            className="w-10 h-10" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                cx="6" 
                                cy="6" 
                                r="3"
                            />
                            <circle 
                                cx="6" 
                                cy="18" 
                                r="3"
                            />
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
                <button className="flex mx-auto mt-8 text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
                    <a href="/dashboard">Voltar</a>
                </button>
              </div>
            </section>
            )}
        </h1>
    )
}

function smartSearch(query, marca) {
    const regex = new RegExp(query, 'i');
    const match = regex.test(marca)
    return match;
}