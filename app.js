const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'\\public'));


mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://admin:aa000000@cluster0.9rbla2m.mongodb.net/?retryWrites=true&w=majority')
.then(() => app.listen(3000,()=>{console.log('Connect to databasse\nApp is listening on port 3000...')}))
.catch((err)=>{console.log(err)})

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//Define a Schema
const BlogPost = new Schema({
  id:ObjectId,
  author: {type:String,default:'No name'},
  title: {type:String,default:'No title'},
  body: {type:String,default:'No body'},
  date: {type:Date,default:Date.now},
});

//Define a Model
const Diary = mongoose.model('damn', BlogPost);

const instance = new Diary()

// =============================================== CRUD =============================================== //

// ==================== Create ==================== //

function Save(author,title,content){
    instance.author = author
    instance.title = title
    instance.body = content

    instance.save(function (err) {
        if(!err){
            console.log('Your Diary is saved!')
        }else{
            console.log(err)
        }
      });
}

// ==================== Read ==================== //

function findData(query){
    Diary.find(query,(err,docs)=>{
        if(err){
            console.log(err)
        }else{
            console.log(docs)
            console.log(`${docs.length} results founded.`)
        }
    })
}

function findOneData(query){
    Diary.findOne(query,(err,docs)=>{
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
}

// ==================== Update ==================== //

function updateOneDate(query,updateContent){
    Diary.updateOne(query,updateContent,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
}

function updateDate(query,updateContent){
    Diary.updateMany(query,updateContent,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
}

// ==================== Delete ==================== //

function deleteOneData(query){
    Diary.deleteOne(query,(err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
}

function deleteData(query){
    Diary.deleteMany(query,(err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
}

function deleteAllData(){
    deleteData({})
}

// =============================================== End ===============================================

const query = {}

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post('/',(req,res)=>{
    Save(req.body.name,req.body.title,req.body.content)
    res.redirect("/");
})


var x = mongoose.modelNames()
