import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/navbar'
import Modal from './components/modals/modal'
import LoginModal from './components/modals/login-modal'
import RegisterModal from './components/modals/register-modal'
import ToasterProvider from './providers/ToasterProvider'
import RentModal from './components/modals/rent-modal'
import getCurrentUser from './actions/getCurrentUser'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}
const font = Nunito({ subsets: ['latin'] })


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar currentUser={currentUser}/>
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <ToasterProvider />
        
        {children}
      </body>
    </html>
  )
}
