import './globals.css'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Footer from '@/app/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Loja de Celulares',
  description: 'Projeto para fase 2 do estágio Sec4you',

}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html >
  )
}
