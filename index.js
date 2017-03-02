
var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'to_do'
});
// connection.connect(function(err, result){
//   if(err){
//     console.log(err.toString());                          //if run correct
//     return;
//   }
//   console.log(result);
//   console.log("conected database");
// });

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("html_content"));


app.get('/todos', function(req, res){
  connection.query('select * from todos', function(err, rows){
    if(err){
  console.log("Error reading flash cards");
  return res.sendStatus(500);
    }
    res.json(rows);
  });
});

app.post('/todos', function(req, res){
var query = `INSERT INTO todos(description, status)
      VALUES('${req.body.description}', '${req.body.status}')`;
connection.query(query, function(err, result){
  if(err){
    console.log("Error reading data: "+res,toString());
    return res.sendStatus();
  }
  res.json(result);
});
});

app.put('/todos', function(req, res){
  var q = `UPDATE todos set description='${req.body.description}', status='${req.body.status}'
  where id=${req.body.id}`;
  connection.query(q, function(err, result){
    if(err){
      console.log("Error updating todos with id: "+req.body.id);
      console.log(err.toString());
      return res.sendStatus(500);
    }
    res.json(result);
  });
});






app.listen(8880);
