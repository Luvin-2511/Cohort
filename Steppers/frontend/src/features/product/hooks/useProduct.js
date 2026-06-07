import React from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading, setProduct } from "../slices/product.slice";
import { createProduct, fetchProducts } from "../services/product.api";

const useProduct = () => {
  const dispatch = useDispatch();
  const handleCreateProduct = async (formData) => {
    try {
      dispatch(setLoading(true));
      const res = await createProduct(formData);
      return res;
    } catch (err) {
      dispatch(
        setError(
          err?.response?.data.message || "Error while creating product !",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetchProducts();
      dispatch(setProduct(res.products));
      return res;
    } catch (err) {
      dispatch(
        setError(
          err?.response?.data.message || "Error while creating product !",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleCreateProduct,
    handleFetchProducts,
  };
};

export default useProduct;
