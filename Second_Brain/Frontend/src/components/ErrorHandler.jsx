import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setError as setAuthError } from "../Features/Auth/slices/auth.slice";
import { setError as setItemError } from "../Features/Item/slices/item.slice";

const ErrorHandler = () => {
  const authError = useSelector((state) => state.auth.error);
  const itemError = useSelector((state) => state.item.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      dispatch(setAuthError(null));
    }
  }, [authError, dispatch]);

  useEffect(() => {
    if (itemError) {
      toast.error(itemError);
      dispatch(setItemError(null));
    }
  }, [itemError, dispatch]);

  return null;
};

export default ErrorHandler;
