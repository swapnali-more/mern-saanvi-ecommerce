import { Navigate, Route } from 'react-router-dom';
import { checkAdmin, checkAuthentication } from './APIResponse';

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
  

export default PrivateRoute;