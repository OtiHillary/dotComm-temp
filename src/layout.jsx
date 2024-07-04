import Navbar from './components/Nav'
import Footer from './components/Foot'

export function Layout({ children }) {
   return(
      <main className='flex flex-col w-[100vw] min-h-[100vh]'>
         < Navbar />
         {
            children
         }
         <Footer />
      </main>
   )
}

export function NoLayout({ children }) {
   return(
      <main className='flex flex-col w-[100vw] min-h-[100vh]'>
         {
            children
         }
      </main>
   )
}