// src/components/PatrimoineTable.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import Possession from './patrimoine_economique/models/possessions/Possession'; // Assurez-vous que le chemin d'importation est correct

const PatrimoineTable = () => {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [totalValue, setTotalValue] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/1')
      .then(response => {
        console.log(response.data); // Vérifiez les données reçues
        if (response.data && response.data.data && response.data.data.possessions) {
          setData(response.data.data);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    const dateActuelle = new Date(selectedDate);
    let total = 0;

    data.possessions.forEach(item => {
      const possession = new Possession(
        item.possesseur,
        item.libelle,
        item.valeur,
        new Date(item.dateDebut),
        item.dateFin ? new Date(item.dateFin) : null,
        item.tauxAmortissement
      );

      total += possession.getValeurApresAmortissement(dateActuelle);
    });

    setTotalValue(total);
  };

  if (!data) {
    return <p>Chargement des données...</p>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col md={8}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Valeur</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Taux Amortissement</th>
                <th>Jour</th>
                <th>Valeur Constante</th>
              </tr>
            </thead>
            <tbody>
              {data.possessions.map((item, index) => (
                <tr key={index}>
                  <td>{item.libelle}</td>
                  <td>{item.valeur}</td>
                  <td>{item.dateDebut}</td>
                  <td>{item.dateFin}</td>
                  <td>{item.tauxAmortissement}</td>
                  <td>{item.jour}</td>
                  <td>{item.valeurConstante}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
          <Form>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Sélectionner une date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} className="w-100">
              Valider
            </Button>
          </Form>
          {totalValue !== null && (
            <Alert variant="info" className="mt-5" style={{ marginLeft: '20px' }}>
              Valeur totale après amortissement : {totalValue.toFixed(2)}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PatrimoineTable;
