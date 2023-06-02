import { Navigate } from 'react-router-dom';
import { APIResponse, checkAuthentication } from './APIResponse';

interface PrivateRouteProps {
    component: React.ComponentType;
    isAdminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAdminOnly }) => {
    const responseString = localStorage.getItem('profile');
    const isAuthenticated = checkAuthentication(responseString);
    const isAdmin = isAdminOnly && isAuthenticated ? checkAdmin(responseString) : true;

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    if (isAdminOnly && !isAdmin) {
        return <Navigate to="/" />;
    }

    return <Component />;
};

function checkAdmin(responseString: string | null): boolean {
    if (!responseString) {
        return false;
    }

    try {
        const apiResponse: APIResponse = JSON.parse(responseString);
        const { isAdmin } = apiResponse.result;
        return !!isAdmin;
    } catch (error) {
        console.error('Failed to parse API response:', error);
        return false;
    }
}

export default PrivateRoute;