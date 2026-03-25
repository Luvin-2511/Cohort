import { useDispatch, useSelector } from "react-redux";
import { fetchChats, fetchMessageOfChat, initializeSocket } from "../services/chat.api";
import { setChats, setLoading, setMessages } from "../slices/chat.slice";

const useChat = () => {
  const loading = useSelector((state) => state.chat.loading);
  const chats = useSelector((state) => state.chat.chats);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const handleFetchChats = async () => {
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
  };

  const handleMessagesOfChat = async (chatId) =>{
    dispatch(setLoading(true))
    try {
      const response = await fetchMessageOfChat(chatId)
      dispatch(setMessages(response.messages))
      return response
    }catch(err){
      console.log(err)
    }finally {
      dispatch(setLoading(false))
    }
  }

  return {
    initializeSocket,
    handleFetchChats,
    handleMessagesOfChat,
    loading,
    chats,
    messages
  };
};

export default useChat;
