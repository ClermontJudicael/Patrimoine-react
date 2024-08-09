import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPossessionForm = ({ show, handleClose, handleAdd }) => {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [jour, setJour] = useState('');
  const [valeurConstante, setValeurConstante] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPossession = {
      libelle,
      valeur: Number(valeur),
      dateDebut,
      dateFin: dateFin || null,
      tauxAmortissement: tauxAmortissement || null,
      jour: jour || null,
      valeurConstante: valeurConstante || null,
    };
    handleAdd(newPossession);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une possession</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formLibelle">
            <Form.Label>Libellé</Form.Label>
            <Form.Control
              type="text"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formValeur">
            <Form.Label>Valeur</Form.Label>
            <Form.Control
              type="number"
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDateDebut">
            <Form.Label>Date Début</Form.Label>
            <Form.Control
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDateFin">
            <Form.Label>Date Fin</Form.Label>
            <Form.Control
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTauxAmortissement">
            <Form.Label>Taux Amortissement</Form.Label>
            <Form.Control
              type="number"
              value={tauxAmortissement}
              onChange={(e) => setTauxAmortissement(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formJour">
            <Form.Label>Jour</Form.Label>
            <Form.Control
              type="number"
              value={jour}
              onChange={(e) => setJour(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formValeurConstante">
            <Form.Label>Valeur Constante</Form.Label>
            <Form.Control
              type="number"
              value={valeurConstante}
              onChange={(e) => setValeurConstante(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPossessionForm;
