import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

import { NFTProvider } from '../context/NFTContext'
import { Navbar, Footer } from '../components'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>

        <Script
          src="https://kit.fontawesome.com/fe1723a8d1.js"
          crossorigin="anonymous"
        />
      </ThemeProvider>
    </NFTProvider>
  )
}
