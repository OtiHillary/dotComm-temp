import { useState, useEffect } from 'react';
import { CallOutgoing, People, TruckFast, Star1, ShoppingCart, ArrowLeft3, ArrowRight3 } from 'iconsax-react'
import Skeleton from 'react-loading-skeleton';


export default function ProductPreview () {
   const [categories, setCategories] = useState([])
   const [products, setProducts] = useState([])
   const [visibleOne, setVisibleOne] = useState(false)
   const [visibleTwo, setVisibleTwo] = useState(false)
   const [currentSlide, setCurrentSlide] = useState(0);
 
   const slides = [
     {
       imageUrl: '../src/assets/1.PNG',
       title: 'Slide 1',
       description: 'This is the description for slide 1.'
     },
     {
       imageUrl: '../src/assets/2.PNG',
       title: 'Slide 2',
       description: 'This is the description for slide 2.'
     },
     {
       imageUrl: '../src/assets/3.PNG',
       title: 'Slide 3',
       description: 'This is the description for slide 3.'
     }
   ];
 
   const handleNextSlide = () => {
     setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
   };
 
   const handlePrevSlide = () => {
     setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
   };

   useEffect(() => {
      const timeoutId = setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 2000);
  
      return () => clearTimeout(timeoutId);
   }, [currentSlide, slides.length]);
 
   useEffect(() => {
      fetch('https://fakestoreapi.com/products/categories')
      .then(res=>res.json())
      .then(json => {
         console.log(json)
         setCategories(json)
      })

   }, [])

   function productType(event) {
      setVisibleOne( true )

      fetch(`https://fakestoreapi.com/products/category/${event.target.innerText}`)
      .then(res=>res.json())
      .then(json => {
         console.log(json)
         setProducts(json)
      })
   }

   function pop(){
      setVisibleOne( false )
      setVisibleTwo( false )
   }

   function unPop(){
      setVisibleTwo( true )
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

   return (
      <section className="flex h-[70vh] w-[95%] m-auto mt-[57px]">
         <div className="flex justify-evenly h-[90%] w-full m-auto relative">
            <div className="min-h-[40%] w-[20%] mb-auto bg-gray-800 bg-opacity-15 backdrop-blur-sm border border-white border-opacity-20 rounded-xl flex flex-col justify-start relative">
               <p className="m-4 font-bold text-xl border-s-2 border-[#FF8A65] text-white ps-6">Categories</p>
               <ul className="px-4 flex flex-col">
                  {
                     categories.map((index, key) => {
                        return(
                           <li key={key} className='flex w-full'>
                              <a href={`/${index}`} className="py-[0.2px] w-full hover:text-[#FF8A65]" onMouseOver={productType} onMouseLeave={pop}>{index}</a>
                           </li>
                        )
                     })
                  }
               </ul>     
            </div>

            <div className={`h-full w-[50%] bg-gray-800 bg-opacity-15 backdrop-blur-sm border overflow-hidden border-white border-opacity-20 rounded-xl ${ (visibleOne || visibleTwo)? 'invisible' : 'visible' }`}>
               <div className="carousel relative w-full h-full">
                  <div className="carousel-inner h-full flex">
                     {slides.map((slide, index) => (
                        <div
                           key={slide.title}
                           className={`transition ease-out duration-500 w-full h-full flex justify-center items-center bg-cover bg-no-repeat text-white absolute top-0 left-0 right-0 z-10 ${
                           index === currentSlide ? 'opacity-100' : 'opacity-0'
                           }`}
                           style={{ backgroundImage: `url(${slide.imageUrl})` }}
                        >
                        </div>
                     ))}
                  </div>

                  <button
                  type="button"
                  className="carousel-control-prev absolute left-0 top-0 bottom-0 flex items-center justify-center p-3 opacity-50 hover:opacity-100 z-20 h-fit rounded-full my-auto mx-4"
                  onClick={handlePrevSlide}
                  >
                     <ArrowLeft3 size={'28'} color='#FF8A65'/>
                  </button>

                  <button
                  type="button"
                  className="carousel-control-next absolute right-0 top-0 bottom-0 flex items-center justify-center p-3 opacity-50 hover:opacity-100 z-20 h-fit rounded-full my-auto mx-4"
                  onClick={handleNextSlide}
                  >
                     <ArrowRight3 size={'28'} color='#FF8A65'/>
                  </button>

                  <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center z-20 p-3 rounded-full bg-slate-50 shadow-md border'>
                     {slides.map((slide, index) => (
                        <div
                           key={slide.title}
                           className={`${index === currentSlide ? 'bg-[#FF8A65]' : 'bg-slate-300'} rounded-full w-3 h-3 border-2 border-gray-50 mx-[0.15rem]`}
                        >
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="h-full w-[20%] flex flex-col justify-between">
                  <div className="h-fit p-1 w-full bg-gray-800 bg-opacity-15 backdrop-blur-sm border border-white border-opacity-20 rounded-xl flex flex-col justify-between">
                     <a href="#"className="p-4 mx-2 border-b border-gray-100 border-opacity-15 flex">
                        <CallOutgoing size="32" className="my-auto mx-3" color="#FF8A65"/>
                        Place an Order
                     </a>
                     <a href="#"className="p-4 mx-2 border-b border-gray-100 border-opacity-15 flex">
                        <People size="32" className="my-auto mx-3" color="#FF8A65"/>
                        Become a Seller
                     </a>
                     <a href="#"className="p-4 mx-2 flex">
                        <TruckFast size="32" className="my-auto mx-3" color="#FF8A65"/>
                        Hot deals
                     </a>
                  </div>
                  <div className="h-full mt-6 w-full bg-gray-800 bg-opacity-15 backdrop-blur-sm border border-white border-opacity-20 rounded-xl overflow-hidden">
                     <div style={{ width: "100%", height:"100%", paddingBottom: "78%", position: "relative"}}>
                        <iframe src="https://giphy.com/embed/fPzHQIBWjiJMc" width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}></iframe>
                     </div>
                  </div>
            </div>  
            
            <div className={`absolute h-full w-[55%] left-[20%] p-4 px-6 top-0 rounded-tr-md rounded-br-md bg-gray-800 bg-opacity-75 backdrop-blur-3xl overflow-y-scroll ${ (visibleOne || visibleTwo)? 'visible' : 'invisible' } hover:visible`} onMouseOver={unPop} onMouseLeave={pop}>
               <ul className="grid grid-cols-4 gap-4">
                     {
                        products && (
                           products.map((index, key) => {
                              return(
                                 <div key={key} className="flex flex-col mb-2 w-44 text-gray-700 bg-white p-2 rounded-xl justify-between border-2 hover:border-[#d87658] transition-all">
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
               </ul>

            </div>     
         </div>
      </section>
   )
}   
