import { signOut } from "../firebase/firebase";
import AuthProvider from "./authProvider";
import { useNavigate } from "react-router-dom";

const signout = () => {
    const navigate = useNavigate();

    async function handleUserLoggedIn(user) {
      await signOut();
      navigate("/login");
    }
    function handleUserNotLoggedIn() {
      navigate("/login");
    }
  
    return (
      <AuthProvider
        userLoggedIn={handleUserLoggedIn}
        userNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading...
      </AuthProvider>
    );
}

export default signout;