import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { createCollection, getCollections } from "../services/collection.api";

const useCollection = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const handleGetCollections = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCollections();
      if (response && response.collections) {
        setCollections(response.collections);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch collections");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateCollection = async (name) => {
    setLoading(true);
    try {
      const response = await createCollection(name);
      toast.success(response.message || "Collection created");
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create collection");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    collections,
    handleGetCollections,
    handleCreateCollection,
  };
};

export default useCollection;
