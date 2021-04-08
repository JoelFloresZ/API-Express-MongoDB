const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://joelflores:12345678joel@cluster0.rwxgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const listaUser = mongoose.model('usuarios', {
     name:String
});

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));
// Metodo que nos permite poder recibir pasar que vienen desde la url (POST)
app.use(bodyParser.json());
/* app.use(express.bodyParser()); */

app.get('/', (req, res) => {
  res.sendFile('/public');
});


app.post('/api/users', (req, res)=> {
     listaUser.create({
          name: req.body.name,
     }, (err, lista)=> {
          if(err) {
               res.send(err);
          }

          listaUser.find((err, lista)=> {
               if(err) {
                    res.send(err);
               }

               res.json(lista);
          })

     })
});

app.get('/api/users', (req, res) => {
     listaUser.find((err, user) => {
          if(err) {
               res.send(err);
          }

          res.send(user);
     })
});

app.delete('/api/users/:id', (req, res) => {
     listaUser.remove( {
          _id: req.params.id
     }, (err)=> {
          if(err) {
               res.send(err);
          }
     })

     listaUser.find((err, lista) => {
          if(err) {
               res.send(err);
          }

          res.json(lista);
     })
});

app.put('/api/users/:id', (req, res) => {
     listaUser.findOneAndUpdate(
          {_id: req.params.id},
          {name: req.body.name},
          (err) => {
               if(err) {
                    res.send(err)
               }
          }
     );

     listaUser.find((err, lista) => {
          if(err) {
               res.send(err);
          }

          res.json(lista);
     })
});

app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`)
})