import { useDispatch, useSelector } from "react-redux";
import {
  deleteChat,
  fetchChats,
  fetchMessageOfChat,
  getResponse,
  initializeSocket,
} from "../services/chat.api";
import {
  addMessage,
  setChatId,
  setChats,
  setLoading,
  setMessages,
  setError,
} from "../slices/chat.slice";
import { useCallback } from "react";
import { toast } from "react-toastify";

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
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
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
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteChat = async (chatId) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteChat(chatId);
      dispatch(setChats(chats.filter((c) => c._id !== chatId)));
      dispatch(setMessages([]))
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
    dispatch(
      addMessage({
        _id: Date.now(),
        role: "user",
        content: message,
      }),
    );
    dispatch(setLoading(true));
    try {
      const response = await getResponse(message, chatId);
      if (!chatId && response.chat) {
        dispatch(setChatId(response.chat));
      }
      dispatch(addMessage(response.aiMessage));
      await handleFetchChats()
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    initializeSocket,
    handleFetchChats,
    handleMessagesOfChat,
    handleDeleteChat,
    handleResponse,
    loading,
    chats,
    messages,
    chatId,
  };
};

export default useChat;
