import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogin from './pages/CaptainLogin';
import Start from './pages/Start';
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import { useEffect } from 'react';
import Chat from './pages/chat';
import PublicRoute from './route/PublicRoute';


const  App = () => {


  return (
    <>
    <Toaster/>
    <PublicRoute/>
    
    </>
  );
}

export default App;
