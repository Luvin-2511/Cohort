import { useDispatch, useSelector } from "react-redux";
import { addMsg, setError, setLoading } from "../slices/game.slice";
import { getAiResponse } from "../services/game.service";

const useGame = () => {
  const loading = useSelector((state) => state.game.loading);
  const error = useSelector((state) => state.game.error);
  const currentProduct = useSelector((state) => state.game.currentProduct);
  const allMsg = useSelector((state) => state.game.allMsg);
  const dispatch = useDispatch();
  
  const handleAiResponse = async (messages, productId, userMessage) => {
    dispatch(setLoading(true))
    const userMsg = {
      role:"user",
      content: userMessage,
    }
    const updatedMsg = [...messages, userMsg];
    dispatch(addMsg(userMsg))
    try {
      const response = await getAiResponse(updatedMsg, productId, userMessage)
      dispatch(addMsg({
        role:"ai",
        content:response.response.reply,
        price:response.response.offeredPrice
      }))
      return response
    }catch(err){
      dispatch(setError(err?.response?.data?.message || "Internal Server Error !"))
    }finally{
      dispatch(setLoading(false))
    }
  }

  return {
    loading,
    error,
    currentProduct,
    allMsg,
    handleAiResponse
  };
};

export default useGame;
