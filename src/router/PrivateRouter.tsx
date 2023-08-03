import AuthContext from "../services/auth/AuthContext";
import { Navigate } from "react-router-dom";
import * as React from 'react';

const PrivateRoute = ({ component } : any) => {

    return AuthContext.isLoggedIn() ?  React.createElement(component) : <Navigate to="/auth" />;
}

export default PrivateRoute;