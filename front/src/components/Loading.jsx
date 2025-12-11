/*
  Loading.jsx
  - Composant simple affichant un spinner centré.
  - Utilisé pour indiquer les états de chargement global ou local.
*/
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
    </div>
  );
};

export default Loading;