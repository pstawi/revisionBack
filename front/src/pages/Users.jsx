/*
    Users.jsx
    - Page de gestion des utilisateurs (accessible uniquement aux admins).
    - Récupère la liste des utilisateurs (`getAllUsers`) et permet :
        - édition d'un utilisateur (modal) via `updateUser`
        - suppression d'un utilisateur via `deleteUser`
    - Le composant maintient l'état local pour la sélection, l'édition et les modals.
*/
import { useAuth } from "../context/AuthContext";
import { Container, Card, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import { useState, useEffect, use } from "react";
import * as userService from "../services/userService";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        prenom: '',
        nom: '',
        login: '',
        password: ''
    });

    const { isAdmin } = useAuth();

    const allUsers = async () => {

        try {

            const response = await userService.getAllUsers();
            setUsers(response.data);
            setError('');

        } catch (error) {
            setError('Erreur lors de la récupération des utilisateurs');
            throw error;
        }
    };

    const  handleEdit = (user) => {

        setSelectedUser(user);
        setEditFormData({
            prenom: user.prenom,
            nom: user.nom,
            login: user.login,
            password: '',
            roleId: user.roleId
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateUser(selectedUser.id, editFormData);
            setShowEditModal(false);
            allUsers();
        } catch (error) {
            setError('Erreur lors de la mise à jour de l\'utilisateur');
        }
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await userService.deleteUser(selectedUser.id);
            setShowDeleteModal(false);
            allUsers();
        } catch (error) {
            setError('Erreur lors de la suppression de l\'utilisateur');
        }
    };

    useEffect(() => {
        if (isAdmin()) {
            allUsers();
        }
    }, []);


        return (<>

            <Container className="mt-5">
                <h2 className="mb-4">Gestion des utilisateurs</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Login</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.prenom}</td>
                                <td>{user.nom}</td>
                                <td>{user.login}</td>
                                <td>{user.roleId === 1 ? 'Admin' : 'Utilisateur'}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal d'édition */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier l'utilisateur</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleEditSubmit}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editFormData.prenom}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, prenom: e.target.value })
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editFormData.nom}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, nom: e.target.value })
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Login</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editFormData.login}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, login: e.target.value })
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nouveau mot de passe (laisser vide pour ne pas changer)</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={editFormData.password}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, password: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Rôle</Form.Label>
                                <Form.Select
                                    value={editFormData.roleId}
                                    onChange={(e) =>
                                        setEditFormData({ ...editFormData, roleId: parseInt(e.target.value) })
                                    }
                                >
                                    <option value={1}>Admin</option>
                                    <option value={2}>Utilisateur</option>
                                </Form.Select>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                Enregistrer
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* Modal de suppression */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmer la suppression</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser?.prenom} {selectedUser?.nom} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>


        </>);
    }

    export default Users;