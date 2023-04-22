import { useNavigate, Link } from "react-router-dom";
import {useEffect} from 'react'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [])


  
  return (
    <div>arrigut appaaa</div>
  )
}

export default App
