import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const { login } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "921569473631-fqog35ntnsmc1d77gop6rddpif86qu9q.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const accessToken = response.authentication.accessToken;

      getUserInfo(accessToken);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userInfo = await response.json();

      console.log("User email:", userInfo.email);

      login(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return { promptAsync };
};
