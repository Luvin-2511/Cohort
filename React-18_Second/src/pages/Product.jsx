import React, { useContext } from 'react'
import { ProContext } from '../context/ProductContext'
import { Link } from 'react-router-dom';

const Product = () => {
  const { products } = useContext(ProContext)
  console.log(products);


  return (
    <div className='min-h-screen w-full flex-wrap p-4 flex gap-5'>
      {!products ? <div>
        Loading
      </div> :
        <>
          {
            products.map((elem, idx) => {
              return <Link
                key={idx}
                to={`/Products/${idx + 1}`}
                className='h-[30rem] hover:scale-105 transition-all duration-300 hover:bg-[rgb(255,255,255,0.15)] w-[24%] p-6 bg-[rgb(255,255,255,0.1)] backdrop-blur-xl shrink-0 text-center flex flex-col gap-10 rounded-2xl cursor-pointer'>
                <img className='h-[80%] w-full object-contain' src={elem.image} alt="" />
                <h2 className='text-xl font-semibold'>{elem.title}</h2>
              </Link>
            })
          }
        </>
      }
    </div>
  )
}

export default Product
