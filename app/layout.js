
import { ReduxProvider } from '@/redux/provider'
import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sociophere',
  description: 'Ride the Wave of Social Engagement',
}

export default function RootLayout({ children }) {

  return (

    <html lang="en">
      <body className={inter.className}>
      <link href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css" rel="stylesheet"></link>
      <ReduxProvider>
        {children}
      </ReduxProvider>
      </body>
    </html>

  )
}
