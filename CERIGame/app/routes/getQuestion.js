
/******** Chargement des Middleware
*
********/
const MongoClient = require('mongodb').MongoClient; //Définition middleware mongodb et instance MongoClient
const express = require('express'); //Import Express

/******** Declaration des variables
 *
 ********/
var router = express.Router(); //Création objet Router
var dsnMongoDB = "mongodb://127.0.0.1:27017/";	//Connexion base mongodb

router.post('/', function(request, response)
{
    //Parametres à passer: nb de questions, thèmes des questions (un théme choisi, un thème random, gangbang de thèmes)
    
    var nbQuestions = parseInt(request.body.nbQuestions, 10); //Récupèration du nombre de questions souhaitées
    var theme =  request.body.theme; //Récupération du thème souhaité

    // Connexion MongoDB
    MongoClient.connect(dsnMongoDB, { useNewUrlParser: true }, function(err, mongoClient) 
    {
        if(err) 
        {
            return console.log('Erreur connexion base de données mongo'); 
        }
        if(mongoClient) 
        {
            // Exécution des requêtes
            var dbo = mongoClient.db("db"); //Base à utiliser
            dbo.collection("quizz").find({thème: theme}/*, {projection: {quizz: {$elemMatch: {id: 10}}}}*/).toArray(function(err,arrayResult) //R2cupération de toutes les infos du thème donné
            {
                if(err)
                {
                    return console.log('Erreur conversion données mongo');                         
                }
                else
                {
                    var arrayQuestions = arrayResult[0].quizz; //Récupération des questions dans le résultat de la requête mongo
                    var arrayReturn = [];
                    var i;
                    for(i=0; i<nbQuestions; ++i) //Pour garder le nombre de questions souhaitées
                    {
                        var rand = Math.floor(Math.random() * Math.floor(arrayQuestions.length)); //On en choisit au hasard parmi toutes celles disponibles
                        arrayReturn.push(arrayQuestions[rand]); //On l'ajoute au tableau de retour
                        arrayQuestions.splice(rand, 1); //On la supprime de l'ancien tableau pour éviter les doublons
                    } 
                    console.log(arrayReturn); 
                    mongoClient.close();
                    response.send(arrayReturn);
                }
            });    
        }
    });        
});

/******** Export
 *
 ********/
module.exports = router;    //L'objet router est transmis lorsque le fichier index.js est importé
