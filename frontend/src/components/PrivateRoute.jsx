
import { Route, Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ element, isAuthenticated, ...rest }) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
