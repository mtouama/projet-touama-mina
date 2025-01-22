const bcrypt = require('bcrypt');
const Utilisateur = require('../models/utilisateurs.model.js')

const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
  }

const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
     Utilisateurs.findOne({ where: { login: utilisateur.login } })
    .then(data => {
      if (data) {
        const user = {
          id: data.id,
          name: data.nom,
          email: data.email
        };
      
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Utilisateur with login=${utilisateur.login}.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: "Error retrieving Utilisateur with login=" + utilisateur.login
      });
    });
  } else {
    res.status(400).send({
      message: "Login ou password incorrect" 
    });
  }
};

exports.register = (req, res) => {


  //**** */
  const { login, nom, prenom, password } = req.body;

  console.log("passwd: " + password)

  // Validation des données
  if (!login || !nom || !prenom || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Vérification de l'existence d'un utilisateur avec le même login
  Utilisateurs.findOne({ where: { login } })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'Ce login est déjà utilisé.' });
      }

      console.log("passwd: " + password)

      
      // Création d'un nouvel utilisateur
      const newUser = {
        // id: uuidv4(),
        login: login,
        nom: nom,
        prenom: prenom,
        pass: password, // Mot de passe non haché
      };

      // Sauvegarde de l'utilisateur dans la base de données
      return Utilisateurs.create(newUser);
    })
    .then(user => {
      res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
    })
    .catch(error => {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    });
};
