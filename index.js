const express = require('express');
const connection = require('./conf');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon application de gestion d\'événements !')
})

// Récupération de l'ensemble des données de la table

app.get('/api/events', (req, res) => {
    connection.query('SELECT * FROM events', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des événements');
    } else {
      res.json(results);
    }
  });
});

// Récupération du nom et de la date des événements

app.get('/api/events/resume', (req, res) => {
  connection.query('SELECT id, name, date FROM events', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des noms et dates');
    } else {
      res.json(results);
    }
  })
})

// Récupération des données "contient"

app.get('/api/events/contains/:search', (req, res) => {
    console.log(req.params.search);
    connection.query('SELECT * FROM events WHERE is_public = ?', req.params.search, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lor de la récupération des événements');
      } else {
        res.json(results);
      }
    });
})

// Récupération des données "commence par"

// Récupération des données "supérieur à "

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
