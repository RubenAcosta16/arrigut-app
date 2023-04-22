import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth, userExists, getUserInfo } from "../firebase/firebase";

// para saber si hay sesion iniciada
import { onAuthStateChanged } from "firebase/auth";

const authProvider = ({ children, userLoggedIn, userNotLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // aqui devuelve el usuario, si es que existe
    // ya solo lo mando a donde quiero y le pongo un useNavigate
    onAuthStateChanged(auth, async (user) => {
      // console.log(user.uid);
      // loginCheck(user)
      // console.log(user)
      // console.log(user.uid)
      // if(user){
      //     loginCheck(user)
      // }else{
      //     loginCheck(user)
      // }
      if (user) {
        const userInfo = await getUserInfo(user.uid);
        // console.log(userInfo);
        userLoggedIn(userInfo);
      } else {
        userNotLoggedIn();
      }
    });
  }, [navigate, userLoggedIn, userNotLoggedIn]);

  return <div>{children}</div>;
};

export default authProvider;
