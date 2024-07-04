import { ArrowRight2, ShoppingCart, Star1 } from "iconsax-react";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';


export default function HotDeals(){
   const [products, setProducts] = useState([])

   useEffect(() =>{
      fetch('https://fakestoreapi.com/products?limit=6')
      .then(res=>res.json())
      .then(json => {
         console.log(json)
         setProducts(json)
      })
   }, [])

   function rating(num){
      const rate = Math.round(num)
      const jsxArr = []

      for (let i = 0; i < 5; i++) {
         jsxArr.push(
            <Star1 size="15" color={`${ i < rate? '#FF8A65' : 'gray' }`}/>
         )         
      }
      return jsxArr
   }

   return(
      <section className = 'w-11/12 m-auto rounded-lg my-6 bg-gray-800 bg-opacity-25 p-4 backdrop-blur-3xl border border-white border-opacity-20'>
         <div className="w-full flex justify-between">
            <p className="m-4 my-2 font-bold text-xl border-s-2 border-[#FF8A65] text-white ps-6">Top selling items</p>
            <a href='' className="flex my-auto">
               See all
               <ArrowRight2 className="mx-2"/>
            </a>
         </div>
         <div className="flex justify-between">
            {
               products && (
                  products.map((index, key) => {
                     return(
                        <div key={key} className="flex flex-col mx-2 my-4 w-full text-gray-700 bg-white p-2 rounded-xl justify-between border-2 hover:border-[#d87658] transition-all">
                           <img src={index.image} alt="product image" className="w-5/12 aspect-auto my-auto py-6 mx-auto rounded-xl" />

                           <div className="bg-slate-50 rounded-xl p-2">
                              <p className="text-xs font-extrabold my-1">{ index.title || <Skeleton count={3}/>}</p>
                              <div className="flex flex-col justify-between mt-1">
                                 <div className="text-5xl font-extralight flex my-3"> 
                                    <span className="text-xl mb-auto text-[#FF8A65] font-semibold">$</span>
                                    { index.price  || <Skeleton />}
                                 </div>
                                 <div className="flex mt-auto">
                                    {
                                       rating(index.rating.rate).map((index) => {
                                          return(
                                             index || <Skeleton />
                                          )
                                       })
                                    }
                                 </div>
                                 <button className="flex bg-[#FF8A65] text-white rounded-xl mt-3 justify-center">
                                    <ShoppingCart size="24" color="white" variant="Outline" className='my-auto me-2'/>
                                    Cart
                                 </button>
                              </div>
                           </div>
                        </div>
                     )
                  })
               )
            }            
         </div>

      </section>
   )
}