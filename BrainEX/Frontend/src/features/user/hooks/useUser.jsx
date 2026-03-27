import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, setLoading } from "../slices/user.slice";
import { getNewTitle, getRename } from "../services/user.service";
import { setUser } from "../../auth/slices/auth.slice";
import { toast } from "react-toastify";
import useChat from "../../chats/hooks/useChat";

const useUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const fontSize = useSelector((state) => state.user.fontSize);
  const {handleFetchChats} = useChat()

  const handleRename = async (name) => {
    dispatch(setLoading(true));
    try {
      const response = await getRename(name);
      dispatch(setUser(response.user));
      toast.success(response.message);
      return response;
    } catch (err) {
      dispatch(setErrors(err.data.response.message || "Internal Server error !"))
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleNewTitle = async (chatId, title) => {
    dispatch(setLoading(true));
    try {
      const response = await getNewTitle(chatId, title);
      await handleFetchChats()
      toast.success(response.message)
      return response;
    } catch (err) {
      dispatch(setErrors(err.data.response.message || "Internal Server error !"))
    }finally {
      dispatch(setLoading(false))
    }
  };

  return {
    handleRename,
    handleNewTitle,
    loading,
    fontSize
  };
};

export default useUser;
