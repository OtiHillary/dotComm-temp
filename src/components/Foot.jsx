import { Facebook, Instagram } from "iconsax-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 bg-opacity-55 text-white py-4 w-full mt-auto border-t border-white border-opacity-20">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Copyright Information */}
        <p className="text-sm">
          © {new Date().getFullYear()} Dot<span className='text-[#FF8A65]'>Comm</span> inc
        </p>

        {/* Social Media Links (Optional) */}
        <ul className="flex items-center space-x-4">
          <li>
            <a href="#" className="text-gray-400 hover:text-gray-300">
               Contact
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-gray-300">
               <Instagram size="24" color="#FF8A65" variant="Bold"/>
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-gray-300">
               <Facebook size="24" color="#FF8A65" variant="Bold"/>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
