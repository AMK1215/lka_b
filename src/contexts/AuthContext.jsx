import { createContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from "react-router-dom";
import en_data from "../lang/en";
import mm_data from "../lang/mm";

const AuthContext = createContext({
  auth: null,
  user: null,
  updateProfile: () => {},
  updateLanguage: () => {},
  content: null,
});

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [url, setUrl] = useState("")
  const { data: userData, error } = useFetch(url ?? "");
  const [profile, setProfile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [content, setContent] = useState(en_data);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && userData) {
      setUrl(BASE_URL + "/user")
      setProfile(userData);
    }
  }, [token, userData]);

  useEffect(() => {
    const lan = localStorage.getItem("lan");
    if (lan) {
      setLanguage(lan);
    } else {
      setLanguage("en");
    }
  }, []);

  const updateProfile = (newProfile) => setProfile(newProfile);
  const updateLanguage = (newLanguage) => {
    if (newLanguage !== language) {
      let lan = localStorage.setItem("lan", newLanguage);
      setLanguage(newLanguage);
      if (newLanguage === "mm") {
        setContent(mm_data);
      } else {
        setContent(en_data);
      }
    }
  };

  useEffect(() => {
    if (language === "mm") {
      setContent(mm_data);
    } else {
      setContent(en_data);
    }
  }, [language])


  

  const value = useMemo(() => ({
    auth: token,
    user: profile,
    lan: language,
    content: content,
    updateProfile,
    updateLanguage,
  }), [token, profile, language]);



  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };