import { useDispatch, useSelector } from "react-redux";
import {
  deleteChat,
  fetchChats,
  fetchMessageOfChat,
  getResponse,
  initializeSocket,
} from "../services/chat.api";
import { setChats, setLoading, setMessages } from "../slices/chat.slice";
import { useCallback } from "react";

const useChat = () => {
  const loading = useSelector((state) => state.chat.loading);
  const chats = useSelector((state) => state.chat.chats);
  const chatId = useSelector((state) => state.chat.chatId);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const handleFetchChats = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetchChats();
      dispatch(setChats(response.chats));
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleMessagesOfChat = async (chatId) => {
    dispatch(setLoading(true));
    try {
      const response = await fetchMessageOfChat(chatId);
      dispatch(setMessages(response.messages));
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteChat = async (chatId) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteChat(chatId);
      dispatch(setChats(chats.filter((c) => c._id !== chatId)));
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResponse = async (message,chatId) => {
    dispatch(setLoading(true))
    try {
      const response = await getResponse(message,chatId)
      return response
    }catch(err){
      console.log(err)
    }
  }

  return {
    initializeSocket,
    handleFetchChats,
    handleMessagesOfChat,
    handleDeleteChat,
    handleResponse,
    loading,
    chats,
    messages,
    chatId
  };
};

export default useChat;
