var mysql = require("mysql");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require("morgan");
var express = require("express");
var app = express();


app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({"extended" : "true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}))
app.use(methodOverride("_method"));


var conexion = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "alonsocabralesAC93",
	database: "BlogNode",
	port: 3306
});


/* trae todos los registros de la base de datos */
app.get("/api/blog", function(req, res){
	var query = conexion.query('SELECT * FROM post ORDER BY idPost DESC', {}, function(error, resul){
		if(error){ 
			throw error; 
		} else{
			res.json(resul);
		}
	});
});

/* obtiene un solo registro de la base de datos */
app.get("/api/blog/show/:id", function(req, res){
	var id = req.params.id
	var query = conexion.query('SELECT * FROM post WHERE idPost = ?', [id], function(error, resul){
		if(error){ 
			throw error; 
		} else{
			res.json(resul);
		}
	});
});

/* crea un nuevo registro */
app.post("/api/blog", function(req, res){
	var post = {
		titulo: req.body.titulo,
		descripcion: req.body.descripcion,
		contenido: req.body.contenido
	};
	var query = conexion.query('INSERT INTO post SET ?', post, function(error, resul){
		if (error) 
			{ throw error } 
		else {
			var query = conexion.query('SELECT * FROM post ORDER BY idPost DESC', {}, function(error, resul){
				if(error){ 
					throw error; 
				} else{
					res.json(resul);
				}
			});
		}
	});
});

/* eliminar un registro */
app.delete("/api/blog/delete/:id", function(req, res){
	var id = req.params.id;
	var query = conexion.query('DELETE FROM post WHERE idPost = ?', [id],
		function(error, resul){
		if (error) 
			{ throw error }
		else {
			var query = conexion.query('SELECT * FROM post ORDER BY idPost DESC', {}, function(error, resul){
				if(error){ 
					throw error; 
				} else{
					res.json(resul);
				}
			});
		}
	});
});

/* edita un registro */
app.put("/api/blog/edit/:id", function(req, res){
	var id = req.params.id;
	var params = {
		titulo: req.body.titulo,
		descripcion: req.body.descripcion,
		contenido: req.body.contenido
	};
	var query = conexion.query(
	'UPDATE post SET ? WHERE  idPost = ?',
	[params, id], function(error, resul){
		if (error) { 
			console.error(error);
		}
		else {
			var query = conexion.query('SELECT * FROM post ORDER BY idPost DESC', {}, function(error, resul){
				if(error){ 
					throw error; 
				} else{
					res.json(resul);
				}
			});
		}
	});
})


/* registro de usuario */
app.post("/signup", function(req, res){
	var usuario = {
		nombre: req.body.nombre,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	};
	var query = conexion.query('INSERT INTO usuarios SET ?', usuario, function(error, resul){
		if (error) 
			{ throw error } 
		else {
			res.json(resul);
		}
	});
});

app.get("/signin", function(req, res){
	var usuario = {
		email: req.body.email,
		password: req.body.password
	}
	var query = conexion.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [usuario], function(error, resul){
		if(error){ 
			throw error; 
		} else{
			console.log(resul);
			res.json(resul);
		}
	});
});




app.get("/", function(req, res){
	res.sendFile("./public/signin");
});

app.listen(7000, function(){
	console.log("Listening on port 7000");
});







