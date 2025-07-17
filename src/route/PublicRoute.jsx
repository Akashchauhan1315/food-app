import { Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import UserSignup from '../pages/UserSignup';
import CaptainSignup from '../pages/CaptainSignup';
import CaptainLogin from '../pages/CaptainLogin';
import Start from '../pages/Start';
import { Toaster } from "react-hot-toast";
import Home from '../pages/Home';
import Chat from '../pages/chat';
import PrivateRoute from './PrivateRoute';
import NotFound from '../pages/NotFound';

const PublicRoute = () => {


    return (
        <Routes>
            <Route path='/' element={<Start/>}></Route>
            <Route path='/login' element={<UserLogin/>}></Route>
            <Route path='/signup' element={<UserSignup/>}></Route>
            <Route path='/captain-login' element={<CaptainLogin/>}></Route>
            <Route path='/captain-signup' element={<CaptainSignup/>}></Route>
            <Route path='/captain-home' element={<Home/>}></Route>
            <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}></Route>
             <Route path="*" element={<NotFound />} />
        </Routes>
    )
};


export default PublicRoute;