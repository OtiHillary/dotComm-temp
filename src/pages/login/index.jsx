import { useState } from "react";
// import Skeleton from 'react-loading-skeleton';
import { ArrowRight  } from "iconsax-react";

export default function Login() {
   const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

   const handleInputChange = (event) => {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   };

   function loginAcess(e) {
      e.preventDefault()
      //"mor_2314",
      //"83r5^_"
      console.log(formData)
      fetch('https://fakestoreapi.com/auth/login',{
         method:'POST',
         body:JSON.stringify({
             username: formData.username,
             password: formData.password
         })
     })
         .then(res=>res.json())
         .then((json) => {
            console.log(json)
            if (json.token) {
               localStorage.setItem(json.token)
               window.location.href = "/"
            }
         })
   }

   return(
      <section className="flex h-[100vh]">
         <div className="w-6/12 h-full flex flex-col justify-center">
            <h1 className="mx-auto p-0 font-bold">Welcome to Dot<span className="text-[#FF8A65]">Comm</span></h1>
   `        <div className="w-7/12 mx-auto rounded-lg bg-gray-800 bg-opacity-25 px-4 py-8 backdrop-blur-3xl border border-white border-opacity-20">
               <div className="w-full flex justify-start">
                  <p className="my-2 font-bold text-xl border-s-2 border-[#FF8A65] text-white ps-8">Login</p>
               </div>
               <form onSubmitCapture={loginAcess}>
                  <label className='w-full' htmlFor="email">
                     <input onChange={handleInputChange} className="p-4 px-8 bg-white bg-opacity-15 rounded-lg w-full my-2" type="text" name="username" placeholder="Enter username..." />
                  </label>

                  <label className='w-full' htmlFor="password">
                     <input onChange={handleInputChange} className="p-4 px-8 bg-white bg-opacity-15 rounded-lg w-full my-2" type="password" name="password" placeholder="Enter password..." />
                  </label>
                  <button type="submit" className="flex bg-[#FF8A65] text-white rounded-xl mt-6 justify-center w-full">
                     Login
                     <ArrowRight  size="24" color="white" variant="Outline" className='my-auto ms-2'/>
                  </button>
                  <a href="/signup" className="w-full my-4 text-right font-thin underline underline-offset-2 text-[#FF8A65] hover:text-[#d47255]">{`I don't have an account`}</a>
               </form>
            </div>`            
         </div>
  
         <div className="bg-white bg-opacity-50 w-6/12 relative overflow-hidden">
            <img src="/src/assets/login-left.jpg" alt="desc-image" className="scale-[2] absolute top-[20%] right-24" />
         </div>    
      </section>

   )
}