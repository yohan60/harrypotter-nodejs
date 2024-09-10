import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Serveur lancé!');
    res.send('Bienvenue sur la page d\'API Harry Potter');
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERREUR INTERRUPTION!');
});

const Personnages = [
    {
        "id": 1,
        "role": "Harry Potter",
        // "age": "17"
    },
    {
        "id": 2,
        "role": "Hermione Granger",
        // "age": "18"
    },
    {
        "id": 3,
        "role": "Ron Weasley",
        // "age": "18"
    },
    {
        "id": 4,
        "role": "Albus Dumbledore",
        // "age": "20"
    },
    {
        "id": 5,
        "role": "Albus Dumbledore",
        // "age": "21"
    },
    {
        "id": 6,
        "role": "Severus Snape",
        // "age": "23"
    },
    {
        "id": 7,
        "role": "Minerva McGonagall",
        // "age": "27"
    },
    {
        "id": 8,
        "role": "Rubeus Hagrid",
        // "age": "28"
    },
    {
        "id": 9,
        "role": "Sirius Black",
        // "age": "30"
    },
    {
        "id": 10,
        "role": "Dolores Umbridge",
        // "age": "35"
    }
];

// Méthode HTTP : GET
// Chemin : /api/personnages
// Fonction : Renvoyer la liste complète des personnages sous forme de JSON
app.get('/api/personnages', (req, res) => {
    res.json(Personnages);
})

// Méthode HTTP : GET
// Chemin : /api/personnages/:id
// Fonction : Rechercher un personnage par ID et le renvoyer en JSON. Si le
// personnage n'est pas trouvé, renvoyer un statut 404 avec un message
// d'erreur.
app.get('/api/personnages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const getPersonnages = Personnages.find(personnage => personnage.id === id);

    if (getPersonnages) {
        res.json({ name: getPersonnages.role });
    } else {
        res.status(404).json({ Message: "Personnage non trouvé" });
    }
});

// Méthode HTTP : POST
// Chemin : /api/personnages
// Fonction : Ajouter un nouveau personnage avec les données fournies dans
// le corps de la requête et le renvoyer en JSON avec un statut 201.
app.post('/api/personnages', (req, res) => {
    const { id, role } = req.body;
    if (!id || !role) {
        return res.status(400).json({ Message: 'Les champs id et role sont obligatoires' });
    }
    Personnages.push({ ...{ id, role } })

    res.status(201).json({ id, role });
})

// Méthode HTTP : PUT
// Chemin : /api/personnages/:id
// Fonction : Trouver un personnage par ID et mettre à jour ses informations
// avec les données fournies dans le corps de la requête. Renvoyer le
// personnage mis à jour en JSON.
app.put('/api/personnages/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { role } = req.body;
    const idPersonnage = Personnages.find((personnage) => personnage.id === parseInt(id, 10))
    if (!idPersonnage) {
        return res.status(404).json("Cet ID n'existe pas, il est donc inchangeable.")
    }
    if (role) idPersonnage.role = role;
    res.status(200).json(`Utilisateur avec l'id : ${id} a été mis à jour `);
})

// Méthode HTTP : DELETE
// Chemin : /api/personnages/:id
// Fonction : Trouver un personnage par ID et le supprimer de la liste.
// Renvoyer le personnage supprimé en JSON.
app.delete('/api/personnages/:id', (req, res) => {
    const { id } = req.params;
    const idPersonnage = Personnages.findIndex((personnage) => personnage.id === parseInt(id, 10))
    if (idPersonnage === -1) {
        return res.status(404).send('Utilisateur a supprimé non trouvé')
    }
    Personnages.splice(idPersonnage, 1);
    res.json(`ID : ${id} a été supprimé`);
});

app.listen(PORT, () => console.log(`Serveur lancé sur le port : http://localhost:${PORT}`));