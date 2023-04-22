import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { useState } from "react";

import AuthProvider from "./authProvider";


const login = () => {
    const navigate = useNavigate();
  const [currentState, setcurrentState] = useState(0);

  // const signInForm=useRef() bootstrap

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(e.target["email"].value);
    // console.log(e.target["password"].value);

    const email = e.target["email"].value;
    const passsword = e.target["password"].value;

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        passsword
      );

      console.log(credentials);

      //   console.log(credentials);

      // cosa especial de bootstrap
      // const signInModal = document.querySelector("#signinModal");
      // const modal = bootstrap.Modal.getInstance(signInModal);
      // modal.hide();

      // showMessage("Welcome "+credentials.user.email)
      console.log("Welcome " + credentials.user.email);
    } catch (error) {
      // console.log(error)
      if (error.code === "auth/wrong-password") {
        // showMessage("Wrong password","e")
        console.log("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        // showMessage("User not found","e")
        console.log("User not found");
      } else {
        // showMessage(error.message,"e")
        console.log(error.message);
      }
    }
  }

  function handleUserLoggedIn() {
    navigate("/dashboard");
  }

  function handleUserNotLoggedIn() {
    setcurrentState(4);
  }

  if (currentState == 4) {
    return (
      <div>
        <Link to="/">Pagina principal</Link>

        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="text" placeholder="Title" id="email" required />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <AuthProvider
        userLoggedIn={handleUserLoggedIn}
        userNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading...
      </AuthProvider>
    </div>
  );
}

export default login;


// arrigut@gmail.com
// distr1bu1dora157