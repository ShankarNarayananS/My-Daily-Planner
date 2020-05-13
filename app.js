var PORT = process.env.PORT || 3000;
var express = require("express");
var  app= express();
var bodyParse =require("body-parser"); 
var mongoose = require("mongoose"); // kind of a like a wrapper for mongodb
//mongoose connect
mongoose.connect("mongodb://localhost/todo"); // put your database name here in place of 'todo'

app.set("view engine","ejs");
app.use(bodyParse.urlencoded({extended: true}));
//mongoose schema
var todoSchema = new mongoose.Schema({ // here it will create a collection named todos
name:String
});
 var Todo = mongoose.model("Todo",todoSchema);
// var todoList=[
 //"wash the car",
 //	"eat and sleep"]
 	
 
 //====Express routes===//
 app.get("/",function(req,res){
 	Todo.find({},function(err,todoList){
 		if(err) console.log(err);
 		else
 		{
 		res.render("index.ejs",{todoList: todoList});
 }	})
 	

 });
 //submit button route
 app.post("/newtodo",function(req,res){
console.log("List submitted");
var newItem = new Todo({
	name:req.body.item
	});
 Todo.create(newItem,function(err,Todo){
	if(err) console.log(err);
	else{
		console.log("Inserted Item:",+newItem);
	}
})
res.redirect("/");
 });

 //==catch other routes
 app.get("*",function(req,res){
res.send("<h1>Invalid page</h1>");
 });

 //server listening on port 3000
 app.listen(PORT,function(){
    console.log("server started on port 3000");
 });
