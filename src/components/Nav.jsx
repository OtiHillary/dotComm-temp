import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Paypal, SmsTracking, Message2, User,  ArrowRight2, ShoppingCart, MessageQuestion, SearchNormal } from 'iconsax-react'

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [accDropdown, setAccDropdown] = useState(false);
  const [helpDropdown, setHelpDropdown] = useState(false);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleAccDropdown = () => {
    setAccDropdown(!accDropdown) 
    setHelpDropdown(false)
  };
  const toggleHelpDropdown = () => {
    setHelpDropdown(!helpDropdown) 
    setAccDropdown(false)
  };

  return (
   <nav className="bg-gray-800 bg-opacity-25 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-white border-opacity-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-xl font-bold">Dot<span className='text-[#FF8A65]'>Comm</span></a>
        {/* Search Bar */}
        <div className="flex items-center relative">
          <SearchNormal size="20" color="gray" className='absolute left-2 top-1/2 -translate-y-1/2'/>
          <input
            type="text"
            placeholder="Search products..."
            className="px-6 py-2 ps-10 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Menu Button (Mobile Only) */}
        <button onClick={toggleMenu} className="md:hidden block focus:outline-none">
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Navigation Links (Desktop Only) */}
        <ul className="hidden md:flex items-center text-white">
          <li className="mr-3 relative" onClick={toggleAccDropdown}>
            <a href="#" className="text-white hover:text-gray-400 flex">
              <User size="24" color="#FF8A65" variant="Outline" className='my-auto me-2'/>
              Account
              <ArrowRight2 size="16" color="white" variant="Outline" className={`my-auto mx-1 transition-all`} style={{ transform: `rotate(${ accDropdown? 90 : 0 }deg)` }}/>
            </a>
            {
              accDropdown && (
                <ul className="absolute top-[150%] left-0 bg-gray-700 rounded shadow-md py-2 w-48 z-50">
                  <li>
                    <a href="#" className="flex text-white px-4 py-2 hover:bg-gray-600">
                      <User size="18" color="#FF8A65" variant="Outline" className='my-auto me-2'/>
                      My account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex text-white px-4 py-2 hover:bg-gray-600">
                      <SmsTracking size="18" color="#FF8A65" variant="Outline" className='my-auto me-2'/>
                      Orders
                    </a>
                  </li>
                  <Link to="/login" className="text-white mx-4 my-2 hover:bg-yellow-700 focus:outline-none outline-2 border-1 bg-[#FF8A65] hover:border-yellow-400 px-8 py-1 rounded-md inline-flex items-center">
                    <Message2 size="18" color="white" className='mx-2 my-auto'/>
                    Sign in
                  </Link>
                </ul>
              ) 
            }
          </li>

          <li className="mr-3 relative" onClick={toggleHelpDropdown}>
            <a href="#" className="text-white hover:text-gray-400 flex">
            <MessageQuestion size="24" color="#FF8A65"  className='my-auto me-2'/>
              Help
              <ArrowRight2 size="16" color="white" variant="Outline" className={`my-auto mx-1 transition-all`} style={{ transform: `rotate(${ helpDropdown? 90 : 0 }deg)` }}/>
            </a>
            {
              helpDropdown && (
                <ul className="absolute top-[150%] left-0 bg-gray-700 rounded shadow-md py-2 w-48 z-50">
                  <li>
                    <a href="#" className="flex text-white px-4 py-2 hover:bg-gray-600">
                      <SmsTracking size="18" color="#FF8A65" variant="Outline" className='my-auto me-2'/>
                      Place order
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex text-white px-4 py-2 hover:bg-gray-600">
                      <Truck size="18" color="#FF8A65" variant="Outline" className='my-auto me-2'/>
                      Track order
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex text-white px-4 py-2 hover:bg-gray-600">
                      <Paypal size="18" color="#FF8A65" className='my-auto me-2'/>
                      Payment Options
                    </a>
                  </li>
                  <button className="text-white mx-4 my-2 hover:bg-yellow-700 focus:outline-none outline-2 border-1 bg-[#FF8A65] hover:border-yellow-400 px-8 py-1 rounded-md inline-flex items-center">
                    <Message2 size="18" color="white" className='mx-2 my-auto'/>
                    Chat
                  </button>
                </ul>
              ) 
            }
          </li>
          <li className="mr-3 relative">
            <a href="#" className="text-white hover:text-gray-400 flex">
              <ShoppingCart size="24" color="#FF8A65" variant="Outline" className='my-auto me-2'/>
              Cart
            </a>
          </li>
        </ul>

        {/* Dropdown Menus */}
        <div className="relative">
          <Link
            to={"/login"}
            className="text-white hover:bg-yellow-700 focus:outline-none outline-2 border-1 bg-[#FF8A65] hover:border-yellow-400 px-8 py-1 rounded-md inline-flex items-center"
          >
            login
          </Link>
         </div>
      </div>
   </nav>
  )
}