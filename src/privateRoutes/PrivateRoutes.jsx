import { useContext } from "react";
import { authContextApi } from "../contextAPI/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoutes = ({ children }) => {

    const { user, loading } = useContext(authContextApi)
    
    if (loading) {
        return <p className=" text-red-600">loading...</p>
    }
    if (user) {
        return children;
    }
        
    return <Navigate to='/login'>Login</Navigate>
};
PrivateRoutes.propTypes = {
    children: PropTypes.node
}
export default PrivateRoutes;