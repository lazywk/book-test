import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";
import { apiSignIn, apiSignUp } from "services/AuthService";
import { onSignInSuccess } from "store/auth/sessionSlice";
import { setUser } from "store/auth/userSlice";
import { REDIRECT_URL_KEY } from "constant/app.constant";
import appConfig from "configs/app.config";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector((state) => state.auth.session);

  const signIn = async (values) => {
    try {
      const resp = await apiSignIn(values);
      if (resp) {
        const { accessToken } = resp;
        dispatch(onSignInSuccess(accessToken));
        if (resp) {
          dispatch(
            setUser(
              {
                email: resp.user.email,
              }
            )
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.non_field_errors || errors.toString(),
      };
    }
  };

  const signUp = async (values) => {
    try {
      const resp = await apiSignUp(values);
      if (resp) {
        const { accessToken } = resp;
        dispatch(onSignInSuccess(accessToken));
        if (resp.user) {
          dispatch(
            setUser(
              resp.user || {
                email: resp.user.email,
              }
            )
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signUp,
  };
}

export default useAuth;
