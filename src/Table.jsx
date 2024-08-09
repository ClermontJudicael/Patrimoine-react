// src/components/PatrimoineTable.jsx
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const PatrimoineTable = () => {
  const [data, setData] = useState(null);

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

  return (
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
        {data && data.possessions && data.possessions.map((item, index) => (
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
  );
};

export default PatrimoineTable;
