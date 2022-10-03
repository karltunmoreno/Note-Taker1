const express = require("express");
const path = require("path")
const notes = require("./db/db.json")
const fs = require("fs");
const { METHODS } = require("http");
//const uuidv1 = require("uuid/v1");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) =>{
    console.info(`${req.method} request received to add a review`);
    console.log(notes)
    const newNote = {
        title:req.body.title,
        text:req.body.text,
        id:Math.floor(Math.random()*1000)
    }
    const note=[...notes,newNote]
    fs.writeFile('./db/db.json',JSON.stringify(note),function (error){
        res.json(note)
        
    });
    console.log(note)

})
app.get('/api/notes', (req, res) =>{
    fs.readFile('./db/db.json',"utf-8", function(err,data){
        let parseNotes = [].concat(JSON.parse(data))
        console.log(parseNotes)
        res.json(parseNotes)
    })
    //const note = require("./db/db.json")
    //res.json(note)
})

app.delete(`/api/notes/:id`,(req, res) =>{

})




app.listen(PORT,()=> console.log(`http://localhost:${PORT}`));


