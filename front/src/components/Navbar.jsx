
/*
  Navbar.jsx
  - Barre de navigation principale.
  - Affiche des liens différents selon l'état d'authentification.
  - Si l'utilisateur est admin, affiche le lien vers la gestion des utilisateurs.
  - Gère la déconnexion via `logout()` puis redirection vers `/login`.
*/
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {


    const { isAuthenticated, isAdmin, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimer le token et rediriger l'utilisateur
        logout();
        navigate('/login');
    };

    return ( <>
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Application Révision
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated() && (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                {isAdmin() && (
                  <Nav.Link as={Link} to="/users">
                    Utilisateurs
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated() ? (
              <>
                <span className="me-3 text-light d-flex align-items-center">
                  Connecté en tant que: {user?.id}
                  {isAdmin() && ' (Admin)'}
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Connexion
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Inscription
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>


    </>  );
}
 
export default Navbar;