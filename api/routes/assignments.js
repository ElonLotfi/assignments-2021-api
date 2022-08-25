let Assignment = require('../model/assignment');
const jwt = require('jsonwebtoken')

var config = require('../config');

var userNumber = 0 ;
var online  = ""



// version avec pagination
// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    var token = req.headers.authorization;
    console.log("tiktok"  + req.headers.authorization)

    if (!token) return "res.status(401).send({ auth: false, message: 'No token provided.' });"
  
    jwt.verify(token,'igor', function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      });

      var aggregateQuery = Assignment.aggregate();
    
      Assignment.aggregatePaginate(aggregateQuery,
       {
         page: parseInt(req.query.page) || 1,
         limit: parseInt(req.query.limit) || 10,
        },
       (err, assignments) => {
         if (err) {
           res.send(err);
         }
        res.send(assignments);
       }
     );

    }
   

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

function addClientCpt(req,res){
    userNumber++;
    console.log("nombre de client qui attend :: " + userNumber)
    res.json({"nbrClient" : userNumber});
}

function deleteClientCpt(req,res){
    if(userNumber=== 0){}else{userNumber--;}
    console.log("nombre de client qui attend :: " + userNumber)
    res.json({"nbrClient" : userNumber});
}

function isOnline(req,res){
    console.log("ne5dm")
    online = "ne5dm"
    res.json({"status" : "Mahloul"});
}

function isOffline(req,res){
    console.log("ma ne5dmch")
    online = "Msaker"
    res.json({"status" : "Msaker"});
}

function getNbrClient(req,res){
    res.json({"nbrClient" : userNumber});
}

function getStatus(req,res){
    res.json({"status" : online });
}



module.exports = { addClientCpt , deleteClientCpt , isOnline , isOffline , getStatus , getNbrClient};
