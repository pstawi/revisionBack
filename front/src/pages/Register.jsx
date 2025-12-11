/*
    Register.jsx
    - Formulaire d'inscription utilisateur.
    - Appelle le service `register` pour créer un nouvel utilisateur côté backend.
    - En cas de succès, redirige vers `/login`.
    - Remarque: le hook `useAuth` expose aussi une méthode `register` potentielle,
        mais ici le module `authService.register` est utilisé directement.
*/
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { register } from "../services/authService";
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const Register = () => {

    const navigate = useNavigate();
    const { Register } = useAuth();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: ''
    });


   const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(formData);
    };

   const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await register(formData);

        if (response.success) {
            navigate('/login');
        } else {
            setSuccess(response.message);
        }
    };

    return (<>

        <Container className="mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <Card.Header>
                            <h3 className="text-center mb-0">Inscription</h3>
                        </Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formPrenom">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Entrez votre prénom"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formNom">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Entrez votre nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formLogin">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Choisissez un login"
                                        name="login"
                                        value={formData.login}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Choisissez un mot de passe"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                    {loading ? 'Inscription...' : 'S\'inscrire'}
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <Link to="/login">Déjà un compte ? Connectez-vous</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    </>);
}

export default Register;