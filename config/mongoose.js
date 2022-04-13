// we require the library to connect with the manogoose
// const mongoose=require("mongoose");
// // connect with the library 
// mongoose.connect("mongodb://localhost/contacts_list_db");
// const db=mongoose.connection;
// db.on('error',console.error.bind(console,'connectio error'));
// db.once('open',function(){
//     console.log("succesfully to the database");
// });
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/contact_list_db");

const db=mongoose.connection;

db.on('error',console.error.bind("there is connection error"));
db.once('open',function(){
    console.log("mangoose is connected with data base very succesfully");
});