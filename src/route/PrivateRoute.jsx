import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { throttle } from "lodash";
import { toast } from "react-hot-toast";

const PrivateRoute = ({children}) => {

    const { userToken} = useSelector((state) => state.auth);
    
    if (!userToken) 
    {
        toast.error('PLEASE LOGIN', {
            title: "PLEASE LOGIN !!!!! ",
            description: "",
            status: "error",
            duration: 1000,
            isClosable: true,
            position: 'right', 
        });

        return <Navigate to={"/"} />;
    }

    return children;

};

export default PrivateRoute;

