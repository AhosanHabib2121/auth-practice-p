import { useContext } from "react";
import { authContextApi } from "../contextAPI/AuthContext";

const useAuth = () => {

    const all = useContext(authContextApi);    
    return all;
};

export default useAuth;