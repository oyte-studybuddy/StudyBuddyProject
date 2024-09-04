"use client";
// import { ShopifyCustomer } from "lib/shopify/types";

import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  getUserWithToken,
  handleSetCookie,
  handleRemoveCookie,
} from "./auth-handler";
import { useRouter, redirect } from "next/navigation";

import { POST, GET } from "@/app/request";
// import request from "@/app/request";

const initialState = {
  user: null,
  token: null,
  isError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };

    default:
      state;
  }
};

export const AuthContext = createContext({
  state: initialState,
  dispatch: () => null,
  // signout: () => {},
});

const AuthContextProvider = ({ children, accessToken }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [loader, setLoader] = useState(true);

  const router = useRouter();

  const chackAuth = useCallback(async () => {
    if (accessToken) {
      // const user = await getUserWithToken(accessToken);
      const userData = await GET({
        headers: {
          Authorization: accessToken,
        },
        path: "/user",
      });
      // console.log(userData.success,"===========")

      if (userData.success) {
        if (userData.user) {
          dispatch({
            type: "SET_USER",
            payload: { ...state, token: accessToken, user: userData.user },
          });
          localStorage.setItem("id", userData.user._id)
          setLoader(false);
        }
      } else {
        setLoader(false);
        router.refresh("")
        
      }
    } else {
      setLoader(false);

      // router.replace("/signin")
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    chackAuth();
  }, [chackAuth]);

  const signin = async (data) => {
    const response = await POST({
      body: data,
      path: "/signin",
    });



    console.log(response.success)
    if (response.success) {
      // console.log(response.token, "response.success");
     await handleSetCookie(response.token);
      dispatch({
        type: "SET_USER",
        payload: { ...state, token: response.token },
      });
    } else {
      // // console.log(signinResponse, "response");
      // setLoading(false);
      // router.push("/");
      alert("Somethis went to warong")
    }
    return response;
  };

  const signup = async (data) => {
    const response = await POST({
      body: data,
      path: "/signup",
    });
    return response;
  };


  const signout = async () => {
    alert("")
    // cookies().delete("accessToken")
    // await handleRemoveCookie();
    // router.push("/signin")
  };


  return (
    <AuthContext.Provider value={{ state, dispatch, signout, signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
