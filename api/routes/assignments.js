let Assignment = require('../model/assignment');
const jwt = require('jsonwebtoken')

var config = require('../config');



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

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.note = req.body.note
    assignment.nomDevoir = req.body.nomDevoir
    assignment.remarque = req.body.remarque
    var mydate = new Date(req.body.dateDeRendu);
    var newdate= (mydate.getMonth() + 1) + '/' + mydate.getDate() + '/' +  mydate.getFullYear();
    assignment.dateDeRendu = newdate
    assignment.rendu = req.body.rendu;
    assignment.matiere= req.body.matiere;
    console.log("POST assignment reçu :");
    console.log(assignment)
    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
