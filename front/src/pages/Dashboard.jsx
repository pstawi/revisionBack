/*
  Dashboard.jsx
  - Vue principale après connexion.
  - Affiche des informations basiques de l'utilisateur et un message spécifique
    si l'utilisateur est admin.
*/
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {

    const { user, isAdmin } = useAuth();


    return (<>

        <Container className="mt-5">
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h3>Tableau de bord</h3>
                        </Card.Header>
                        <Card.Body>
                            <h5>Bienvenue !</h5>
                            <p>Vous êtes connecté avec l'ID utilisateur: {user?.id}</p>
                            <p>Rôle: {isAdmin() ? 'Administrateur' : 'Utilisateur'}</p>
                            {isAdmin() && (
                                <div className="mt-4">
                                    <p className="text-muted">
                                        En tant qu'administrateur, vous avez accès à la gestion des utilisateurs.
                                    </p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>);
}

export default Dashboard;