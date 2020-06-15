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
    const sqlValues = `%${req.params.search}%`;
    connection.query('SELECT * FROM events WHERE name LIKE ?', sqlValues, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lor de la récupération des événements');
      } else {
        if (results.length === 0) {
          res.status(404).send('Il n\'existe pas d\'événements contenant cette chaîne de caractères')
        } else {
          res.json(results);          
        }

      }
    });
})

// Récupération des données "commence par"

app.get('/api/events/startwith/:search', (req, res) => {
  const sqlValues = `${req.params.search}%`;
  connection.query('SELECT * FROM events WHERE name LIKE ?', sqlValues, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des événements');
    } else {
      if (results.length === 0) {
        res.status(404).send('Il n\'existe pas d\'événements commençant par cette chaîne de caractères !')
      } else {
        res.json(results);
      }
      
    }
  });
});

// Récupération des données "supérieur à "

app.get('/api/events/superiorto/:date', (req, res) => {
  const sqlValues = `${req.params.date}`;
  connection.query('SELECT * FROM events WHERE date > ?', sqlValues, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des événements');
    } else {
      if (results.length === 0) {
        res.status(404).send('Il n\'y a pas d\'événements après cette date !')
      } else {
      res.json(results);
      }
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
