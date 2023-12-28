
//react.js for sticky notes functionality
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

let tasklist = ["Buy my dog new clothes", "Give food to my plants", "Eat some cotton candy", "Prepare for speech"];
let checkedList = ["Drink grandma's lemon juice"];

app.get("/", (req,res) => {
  const data = {
    tasks : tasklist,
    completed : checkedList
  };
  res.render("index.ejs", data);
});

app.post("/addtask", (req,res) => {
    tasklist.push(req.body['newtask']);
    res.redirect("/");
});

app.get("/", (req,res) => {
    const data = {
        tasks : tasklist,
        completed : checkedList
    };
    res.render("index.ejs", data);
});
app.post("/removetask", (req,res) => {
  var temp = req.body['checkthat'];
  console.log(temp);
  if(typeof(temp) === "string"){
    var arr = temp.split();
    checkedList.push(...arr);
  }
  else{
    checkedList.push(...temp);
  }
  console.log(checkedList);
  if(checkedList[0] === "Drink grandma's lemon juice"){
    checkedList.shift();
  }
  if(typeof(temp) === "string"){
    for(let k = 0; k < tasklist.length ; k++) {
      if(tasklist[k] === temp){
        tasklist.splice(k,1);
      }
    }
  }
  else{
    let j = 0;
    for(let i = 0; i < tasklist.length ; i++){
      if(tasklist[i] === temp[j]){
        tasklist.splice(i,1);
        i = -1;
        j = j + 1;
      }
    }
  }
  console.log(tasklist);
  res.redirect("/");
});

app.get("/", (req,res) => {
  const data = {
      tasks : tasklist,
      completed : checkedList
  };
  res.render("index.ejs", data);
});
//implement forEach
app.post("/unremovetask", (req,res) => {
  var uncheckedList = req.body['uncheck'];
  console.log(uncheckedList);
  if(typeof(uncheckedList) === "undefined" && typeof(checkedList) === "string"){
    tasklist.push(checkedList);
    console.log(tasklist);
  }
  else if(typeof(uncheckedList) === "undefined" && typeof(checkedList) != "string"){
    for(let i = 0; i < checkedList.length; i++){
      tasklist.push(checkedList.pop());
    }
    if(checkedList.length > 0){
      tasklist.push(checkedList.pop());
    }
  }
  else if(typeof(uncheckedList) === "string" && typeof(checkedList) != "string"){
    for(let i = 0; i < checkedList.length; i++){
      if(checkedList[i]!=uncheckedList){
        tasklist.push(checkedList[i]);
        checkedList.splice(i,1);
      }
    }
  }
  else if(typeof(uncheckedList) === "string" && typeof(checkedList) === "string"){
    alert("You haven't unremoved any task!");
  }
  else if(uncheckedList.length > 0){
    for(let i = 0; i < checkedList.length; i++) {
      if(!(uncheckedList.includes(checkedList[i]))){
        tasklist.push(checkedList[i]);
        checkedList.splice(i,1);
      }
      
    }
  }
  res.redirect("/");
});

app.get("/", (req,res) => {
  const data = {
      tasks : tasklist,
      completed : checkedList
  };
  res.render("index.ejs", data);
});



app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
