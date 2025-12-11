# Application Revision

## Description
L'application Revision est une plateforme conçue pour gérer les utilisateurs et les rôles, avec une interface utilisateur moderne et une API backend robuste. Elle est construite avec une architecture front-end et back-end séparée, permettant une gestion efficace et une extensibilité.

## Fonctionnalités principales
- Authentification et gestion des utilisateurs
- Gestion des rôles et permissions
- Interface utilisateur réactive et moderne
- API RESTful pour les opérations CRUD

## Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Une base de données compatible (par exemple, MySQL)

### Étapes d'installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/pstawi/revisionBack.git
   ```

2. Accédez au dossier du projet :
   ```bash
   cd revision
   ```

3. Installez les dépendances pour le backend :
   ```bash
   npm install
   ```

4. Configurez la base de données dans `config/bdd.js`.

5. Démarrez le serveur backend :
   ```bash
   node index.js
   ```

6. Accédez au dossier `front` pour le frontend :
   ```bash
   cd front
   ```

7. Installez les dépendances pour le frontend :
   ```bash
   npm install
   ```

8. Lancez le serveur de développement pour le frontend :
   ```bash
   npm run dev
   ```

## Utilisation

1. Accédez à l'application via votre navigateur à l'adresse suivante :
   ```
   http://localhost:3000
   ```

2. Connectez-vous avec vos identifiants ou créez un compte.

3. Naviguez entre les différentes pages pour gérer les utilisateurs, les rôles, etc.

## Documentation

### Structure du projet

#### Backend
- `controller/` : Contient les contrôleurs pour gérer les requêtes.
- `middleware/` : Contient les middlewares pour la validation des rôles et des tokens.
- `model/` : Définit les modèles de données.
- `route/` : Définit les routes de l'API.
- `config/` : Contient les fichiers de configuration.

#### Frontend
- `src/` : Contient le code source React.
  - `components/` : Composants réutilisables.
  - `context/` : Gestion du contexte global (ex. AuthContext).
  - `pages/` : Pages principales de l'application.
  - `services/` : Services pour les appels API.

### API
L'API backend expose les routes suivantes :
- `POST /login` : Authentification utilisateur.
- `GET /users` : Récupération de la liste des utilisateurs.
- `POST /users` : Création d'un utilisateur.
- `PUT /users/:id` : Mise à jour d'un utilisateur.
- `DELETE /users/:id` : Suppression d'un utilisateur.

### Scripts disponibles

#### Backend
- `npm start` : Démarre le serveur backend.

#### Frontend
- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Génère une version de production.

## Contribution
Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue sur le dépôt GitHub.
