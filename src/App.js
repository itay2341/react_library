import React from "react";
import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes'
import Nav from "./components/Nav";
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import Footer from './components/Footer'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <AnimatedRoutes/>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
