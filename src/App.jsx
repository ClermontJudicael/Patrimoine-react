// src/App.jsx
import React from 'react';
import PatrimoineTable from './Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="App">
    <h1>Tableau des Patrimoines</h1>
    <PatrimoineTable />
  </div>
);

export default App;
