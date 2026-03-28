import { useDispatch, useSelector } from "react-redux";
import {
  deleteChat,
  fetchChats,
  fetchMessageOfChat,
  getRandomPrompt,
  getResponse,
} from "../services/chat.api";
import {
  addMessage,
  setChatId,
  setChats,
  setLoading,
  setMessages,
  setError,
  setFetchingChats,
  setPrompts,
} from "../slices/chat.slice";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useChat = () => {
  const loading = useSelector((state) => state.chat.loading);
  const chats = useSelector((state) => state.chat.chats);
  const chatId = useSelector((state) => state.chat.chatId);
  const messages = useSelector((state) => state.chat.messages);
  const isFetchingChats = useSelector((state)=>state.chat.isFetchingChats)
  const prompts = useSelector((state)=>state.chat.prompts)
  const dispatch = useDispatch();

  const handleFetchChats = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetchChats();
      dispatch(setChats(response.chats));
      return response;
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleMessagesOfChat = async (chatId) => {
    dispatch(setFetchingChats(true));
    try {
      const response = await fetchMessageOfChat(chatId);
      dispatch(setMessages(response.messages));
      return response;
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setFetchingChats(false));
    }
  };

  const handleDeleteChat = async (chatId) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteChat(chatId);
      dispatch(setChats(chats.filter((c) => c._id !== chatId)));
      dispatch(setMessages([]));
      toast.success(response.message);
      return response;
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResponse = async (message, chatId) => {
    if (message != "") {
      dispatch(
        addMessage({
          _id: Date.now(),
          role: "user",
          content: message,
        }),
      );
    }
    dispatch(setLoading(true));
    try {
      const response = await getResponse(message, chatId);
      if (!chatId && response.chat) {
        dispatch(setChatId(response.chat));
      }
      dispatch(addMessage(response.aiMessage));
      await handleFetchChats();
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRandomPrompt = async (number)=> {
    dispatch(setLoading(true))
    try{
      const response = await getRandomPrompt(number)
      dispatch(setPrompts(response.response))
      return response.response
    }catch(err){
      setError(err?.response?.data?.message || "Something went wrong")
    }finally {
      dispatch(setLoading(false))
    }
  }

  return {
    handleFetchChats,
    handleMessagesOfChat,
    handleDeleteChat,
    handleRandomPrompt,
    handleResponse,
    loading,
    isFetchingChats,
    chats,
    messages,
    chatId,
    prompts
  };
};

export default useChat;
