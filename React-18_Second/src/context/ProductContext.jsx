import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import {getData} from '../Api/productApi.js'

export const ProContext = createContext()
const ProductContext = (props) => {
    const [products, setproducts] = useState([])

    const setData =async () =>{
        const data = await getData()
        setproducts(data)
    }

    useEffect(() => {
        setData()
    }, [])

    return (
        <ProContext.Provider value={{products}}>
            {props.children}
        </ProContext.Provider>
    )
}

export default ProductContext
