import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setError,
  setLoading,
  setItems,
  setMatchedItems,
  setResurfacedItems,
  setRelatedItems,
} from "../slices/item.slice";
import {
  saveItem,
  getItems,
  searchItems,
  getRelatedItems,
  deleteItem,
  getGraph,
} from "../services/item.api";

const useItem = () => {
  const loading = useSelector((state) => state.item.loading);
  const error = useSelector((state) => state.item.error);
  const items = useSelector((state) => state.item.items);
  const matchedItems = useSelector((state) => state.item.matchedItems);
  const resurfacedItems = useSelector((state) => state.item.resurfacedItems);
  const relatedItems = useSelector((state) => state.item.relatedItems);

  const dispatch = useDispatch();

  const handleSaveItem = async (url) => {
    dispatch(setLoading(true));
    try {
      const response = await saveItem(url);
      toast.success(response.message || "Item saved successfully!");
      return response;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Internal Server Error";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetItems = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getItems();
      dispatch(setItems(response.items));
      return response;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Internal Server Error";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearchItems = async (q) => {
    dispatch(setLoading(true));
    try {
      const response = await searchItems(q);
      dispatch(setMatchedItems(response.matchedItems));
      return response;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Internal Server Error";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetResurfacedItems = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getResurfacedItems();
      dispatch(setResurfacedItems(response.items));
      return response;
    } catch (err) {
      console.warn("Could not fetch resurfaced items:", err?.message || err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetRelatedItems = async (itemId) => {
    dispatch(setLoading(true));
    try {
      const response = await getRelatedItems(itemId);
      dispatch(setRelatedItems(response.relatedItems));
      return response;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Internal Server Error";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteItem = async (itemId) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteItem(itemId);
      toast.success(response.message || "Item deleted!");
      return response;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Failed to delete item";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetGraph = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getGraph();
      return response;
    } catch (err) {
      console.warn("Could not fetch graph data:", err?.message || err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    loading,
    error,
    items,
    matchedItems,
    resurfacedItems,
    relatedItems,
    handleSaveItem,
    handleGetItems,
    handleSearchItems,
    handleGetResurfacedItems,
    handleGetRelatedItems,
    handleDeleteItem,
    handleGetGraph,
  };
};

export default useItem;
