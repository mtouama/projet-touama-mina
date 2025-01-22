// exports.get = (req, res) => {
//     Catalogue.findAll()
//         .then(catalogue => {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).send(catalogue);
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération des données :', error);
//             res.status(500).send({ message: 'Erreur lors de la récupération des données.' });
//         });
// };



const db = require("../models");
const Catalogue = db.catalogues;

exports.get = (req, res) => {
    Catalogue.findAll().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};