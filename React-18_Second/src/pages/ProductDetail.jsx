import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProContext } from '../context/ProductContext'

const ProductDetail = () => {
  const { products } = useContext(ProContext)
  const { id } = useParams()

  const selectedProduct = products.find((elem) => Number(id) === elem.id)

  return (
    <div className='p-10'>
      {!selectedProduct ?
        <div>
          <div className='loader h-[50rem] w-full transition-all duration-300 w-[24%] p-6 bg-[rgb(255,255,255,0.1)] backdrop-blur-xl shrink-0 text-center flex flex gap-10 rounded-2xl cursor-pointer'>
          </div>
        </div>
        :
        <div className='min-h-[50rem] w-full transition-all duration-300 w-[24%] p-6 bg-[rgb(255,255,255,0.1)] backdrop-blur-xl shrink-0 text-center flex flex gap-10 rounded-2xl cursor-pointer'>
          <div className='flex flex-col h-[50rem] w-[50rem] gap-10'>
            <img className='h-[80%] w-full object-contain' src={selectedProduct.image} alt="" />
            <h2 className='text-4xl font-semibold'>{selectedProduct.title}</h2>
          </div>
          <div className='w-[50%] flex flex-col items-center justify-around p-10 px-20'>
            <h2 className='text-2xl font-bold capitalize'>Category : {selectedProduct.category}</h2>
            <h2 className=' text-3xl font-semibold text-gray-500 p-10'>{selectedProduct.description}</h2>
            <div className='w-full flex items-center justify-between'>
              <h3 className=' text-3xl font-bold'>Price : ${selectedProduct.price}</h3>
              <h3 className='text-3xl font-bold'>Rating : {selectedProduct.rating.rate}</h3>
            </div>
            <button className='text-4xl bg-emerald-500  px-4 py-2 rounded hover:bg-emerald-600 transition-all  font-bold cursor-pointer'>Add To Cart</button>
          </div>
        </div>
      }
    </div>
  )
}

export default ProductDetail
