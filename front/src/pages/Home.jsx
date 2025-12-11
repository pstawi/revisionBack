/*
  Home.jsx
  - Page d'accueil publique présentant l'application.
  - Propose des actions différentes selon si l'utilisateur est connecté ou non.
*/
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1 className="display-4">Bienvenue sur l'Application Révision</h1>
        <p className="lead">
          Application de gestion des utilisateurs avec authentification
        </p>
        {!isAuthenticated() && (
          <div className="mt-4">
            <Button as={Link} to="/login" variant="primary" className="me-2">
              Se connecter
            </Button>
            <Button as={Link} to="/register" variant="outline-primary">
              S'inscrire
            </Button>
          </div>
        )}
        {isAuthenticated() && (
          <div className="mt-4">
            <Button as={Link} to="/dashboard" variant="primary">
              Accéder au tableau de bord
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;

