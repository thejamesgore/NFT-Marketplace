import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

import { Navbar, Footer } from '../components'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>

      <Script
        src="https://kit.fontawesome.com/fe1723a8d1.js"
        crossorigin="anonymous"
      />
    </ThemeProvider>
  )
}
