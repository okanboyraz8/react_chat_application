// pages 
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"
import './style.scss'

//react-router-dom package
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// useContext: Context'i aktif hale getirip giriş yapan kullanıcıya ulaşmamız lazım. O yüzden de React içerisinde
// bulunan useContext'i kullanabiliriz.Böylelikle loginUser'a ulaşabiliriz...
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {

  const { loginUser } = useContext(AuthContext);

  const RoutingControl = ({ children }) => {
    if(!loginUser){
      return <Navigate to="/login" />
    }
    
    return children
  };

  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<RoutingControl><Home /></RoutingControl>} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
