import { toast } from "react-hot-toast";

const showToast = ({ type, message }) => {

    if(type === 'error')
    {
        toast.error(message,{
            title: message,
            description: "",
            status: type,
            duration: 1000,
            isClosable: true,
            position: 'top-right', 
        });
    }
    else if(type === 'success')
    {
        toast.success(message,{
            title: message,
            description: "",
            status: type,
            duration: 1000,
            isClosable: true,
            position: 'top-right', 
        });
    }

    
};

export  {showToast};