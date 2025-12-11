import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/*
  PrivateRoute.jsx
  - Composant wrapper pour protéger les routes.
  - Vérifie si l'utilisateur est authentifié : si non, redirige vers `/login`.
  - Optionnellement, vérifie le rôle admin et redirige vers `/dashboard` si accès refusé.
  - NOTE: accepte soit `requireAdmin` soit `adminOnly` (compatibilité avec App.jsx).
*/
const PrivateRoute = ({ children, requireAdmin = false, adminOnly = false }) => {

    const { isAuthenticated, isAdmin } = useAuth();

    // accepter les deux noms de props pour éviter les erreurs d'appel
    const needAdmin = requireAdmin || adminOnly;

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (needAdmin && !isAdmin()) {
        return <Navigate to="/dashboard" />;
    }
    return children;
};

export default PrivateRoute;