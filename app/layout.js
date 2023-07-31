import { AuthProvider } from '@/authContext/AuthContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bountiful Budgeting',
  description: 'Manage Your Money',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#141a3b]" }>
        <AuthProvider>

          {children}
        </AuthProvider>
        </body>
    </html>
  )
}
