import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import { Star1, Trash } from 'iconsax-react'


export default function Checkout(){
   const [products, setProducts] = useState([])
   const [quantity, setQuantity] = useState(1)

   useEffect(() => {
      fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(cartData => cartData[0].products.map(product =>
              fetch(`https://fakestoreapi.com/products/${product.productId}`))
        )
        .then(productFetches => {
          Promise.all(productFetches)
            .then(productResponses => {
              return Promise.all(productResponses.map(response => response.json()));
            })
            .then(products => {
               console.log(products)
              setProducts(products); // Example usage
            })
            .catch(error => {
              console.error('Error fetching products:', error); // Handle errors
            });
        })
        .catch(error => {
          console.error('Error fetching cart data:', error); // Handle initial fetch error
        });
   }, []);

   function addCart(){
      console.log('add');
      setQuantity(prevState => prevState + 1)
   }

   function minusCart(){
      console.log('minus');
      setQuantity(prevState => prevState - 1)
   }

   function totalPrices(){
      let element = 0
      for (let index = 0; index < products.length; index++) {
         element += products[index].price
      }
      return element
   }

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
      <section className = 'w-11/12 m-auto flex justify-between my-16'>
         <div className="w-8/12 me-4 bg-gray-800 bg-opacity-25 rounded-lg p-4 backdrop-blur-3xl border border-white border-opacity-20">
            <div className="w-full flex justify-between">
               <p className="m-4 my-2 font-bold text-xl border-s-2 border-[#FF8A65] text-white ps-6">Cart ({products.length})</p>
            </div> 

            {
               products.map((index) => {
                  return(
                     <div key={index.id} className="w-full flex justify-between bg-gray-800 bg-opacity-25 rounded-lg p-4 my-4 backdrop-blur-3xl border border-white border-opacity-20">
                        <div className="flex flex-col">
                           <div className="flex mb-3">
                              <img src={index.image} alt="product image" className="w-24 aspect-auto my-auto mx-auto rounded-xl" />
                              <div>
                                 <p className="text-xl font-semibold my-1 mx-4">{ index.title || <Skeleton count={3}/>}</p>                           
                                 <p className="text-xs font-extralight my-1 mx-4">{ index.description || <Skeleton count={3}/>}</p>  
                              </div>                              
                           </div>
                           <button className="flex bg-[#FF8A65] text-white font-light text-lg rounded-sm justify-center py-1 px-6 w-fit">
                              Remove
                              <Trash size={18} className="my-auto mx-2"/>
                           </button>
                        </div>


                        <div className="flex flex-col justify-between mt-1">
                           <div className="text-5xl font-extralight flex"> 
                              <span className="text-xl mb-auto text-[#FF8A65] font-semibold">$</span>
                              { index.price  || <Skeleton />}
                           </div>

                           <div className="flex">
                              <button className="flex flex-col bg-[#FF8A65] text-white font-bold text-2xl rounded-sm justify-center p-0 w-10 h-10" style={{ lineHeight: 0 }} onClick={ minusCart }> 
                                 <span className="m-auto">-</span> 
                              </button>
                              <div className="flex text-white p-0 px-4 mx-1 rounded-sm justify-center bg-gray-800 bg-opacity-25 backdrop-blur-3xl border">
                                 <span className="my-auto">{ quantity }</span>
                              </div>
                              <button className="flex flex-col bg-[#FF8A65] text-white font-bold text-2xl rounded-sm justify-center p-0 w-10 h-10" style={{ lineHeight: 0 }} onClick={ addCart }> 
                                 <span className="m-auto">+</span> 
                              </button>
                           </div>
                        </div>
                     </div>
                  )
               })
            }

         </div>

         <div className='w-4/12 h-fit bg-gray-800 bg-opacity-25 rounded-lg p-4 backdrop-blur-3xl border border-white border-opacity-20'>
            <div className="w-full flex justify-between">
               <p className="m-4 my-2 font-bold text-xl border-s-2 border-[#FF8A65] text-white ps-6">Checkout summary</p>
            </div>  
            <hr className="opacity-20 my-2" />
            {
               products.map((index) => {
                  return(
                     <div key={index.id} className="w-full flex justify-between p-2 ">

                        <div className="flex flex-col justify-between mt-1">
                           <div className="text-5xl font-extralight flex"> 
                              <span className="text-xl mb-auto text-[#FF8A65] font-semibold">$</span>
                              { index.price  || <Skeleton />}
                           </div>
                        </div>
                     </div>
                  )
               })
            }
            <hr className="opacity-20 my-2" />
            <div className="flex justify-between my-3 font-semibold text-xl">
               <p>Total</p>
               <p>{ totalPrices() }</p> 
            </div>
            <button className="w-full text-white flex justify-center mx-auto my-2 hover:bg-yellow-700 focus:outline-none outline-2 border-1 bg-[#FF8A65] hover:border-yellow-400 px-8 py-2 rounded-md items-center">
               Checkout
            </button>
         </div>

         {/* <div className="flex justify-between">
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
         </div> */}

      </section>
   )
}