var exp = require("express");
var app = exp();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.use(exp.static(__dirname + "/views"))
app.use(exp.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended:true}))
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/abcd",{useNewUrlParser:true});
var sch = new mongoose.Schema({
	name:{
		type:String,
		required:"required"
	},
	completed:{
		type:Boolean,
		default:false
	},
	date:{
		type:Date,
		default:Date.now
	}
});
var todo = mongoose.model("todo",sch);
// todo.create({
// 	name:"dadadsa"
// },function(data,err){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(data);
// });
app.get("/",function(req,res){
	res.sendFile("index.html");
})
app.get("/api",function(req,res){
	todo.find({},function(err,data){
		if(err)
			console.log(err);
		else
			res.json(data);
	})
});
app.get("/api/:id",function(req,res){
	todo.findById(req.params.id,function(err,data){
		if(err)
			console.log(err);
		else
			res.json(data);
	})
})
app.post("/api",function(req,res){
	todo.create(req.body,function(err,data){
		if(err)
			console.log(err)
		else
			res.json(data);
	})
})
app.put("/api/:id",function(req,res){
	todo.findByIdAndUpdate(req.params.id,req.body,function(err,data){
	if(err)
		console.log(err);
	else
		res.json(data);
	})
})
app.delete("/api/:id",function(req,res){
	todo.findByIdAndRemove(req.params.id,function(err,data){
		if(err)
			console.log(err);
		else
			res.send("deleted")
	})
})
app.listen(3000,process.env.IP,function(){
	console.log("server started")
});