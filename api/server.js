let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var cors = require('cors');
var config = require('./config');




let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = 'mongodb+srv://mbds:mbds@premium.hsosy.mongodb.net/premium?retryWrites=true&w=majority';





const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
  },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(cors())
app.options('*', cors())

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')

  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

//implementation de la partie de securité JWT , login ,register
app.use(express.json())
// Registre
app.post(prefix + '/register', async (req, res) => {
  console.log(req.body)
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10)
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    }).then((res) => console.log(res)).exec()



   
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' })
  }
})


//Login
app.post(prefix + '/login', async (req, res) => {


  const user = await User.findOne({
    email: req.body.email,
  })
    .exec()

  if (user) {

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        'igor'
      )
      console.log("token: " + token)

      return res.json({ status: 'ok', email: user.email, token: token })
    } else {

      return res.json({ status: 'error', token: '' })
    }
  } else {
    return res.json({ status: 'error', token: '' })

  }
})


// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


