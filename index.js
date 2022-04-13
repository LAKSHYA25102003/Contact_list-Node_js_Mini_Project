// const express=require("express");
// const path=require("path");
// const port=8000;
// const app=express();

// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,'views'));


// app.get('/',function(req,res){
//     return res.render('home',{title:"My contact list"});
// });

// app.get('/practice',function(req,res){
//     return res.render('practice',{
//         title:"Play with ejs"
//     });
// })


// app.listen(port,function(err){
//     if(err){
//         console.log("oops error");
//     }
//     else
//     {
//         console.log("server is run up successfully on port:",port);
//     }
// })
const express=require("express");
const path=require("path");
const port=8000;

const db=require("./config/mongoose");
const Contact=require("./modals/contact.js");
const app=express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded());

// we can use static file here as well with the hilp of middle ware 
app.use(express.static("assets"));

// middle ware 
// these are the function which are written in app.use(), and it can manipulate the data before reaching the controller , we can create our own middle ware like this
// app.use(function(req,res,next){
//     console.log("middle ware1 is called ");
//     next();
// });

// middle ware 2
// app.use(function(req,res,next){
//     console.log("middleware 2 is called");
//     next();
// })

var contactList=[
    {
        name:"Lakshya",
        mob:"8445087149"
    },
    {
        name:"Neeraj",
        mob:"9149033102"
    },
    {
        name:"Hariom",
        mob:"7500016487"
    },
    {
        name:"Shriom",
        mob:"9759613316"
    }
];


app.get("/",function(req,res)
{
    Contact.find({},function(err,Allcontacts)
    {
        if(err)
        {
            console.log("error");
            return ;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list:Allcontacts
        });

    })
    
    
});

app.get("/practice",function(req,res){
    return res.render("practice",{
        title:"play ground"
    });
});

app.post("/create-contact",function(req,res){
    // return res.redirect('/practice');
    // contactList.push({
    //     name:req.body.name,
    //     mob:req.body.mobile
    // });
    // res.redirect("/");
    Contact.create({
        name:req.body.name,
        mob:req.body.mobile
    },function(err,newContact){
        if(err)
        {
            console.log("ther is an error in creating the contact");
            return ;
        }
        console.log(newContact);
        res.redirect('back');
    });
    
});

app.get("/delete-contact",function(req,res){
    let id=req.query.id;

    // find the conteact in the database 
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in deletion");
            return ;
        }
        res.redirect('/');
    });
});

app.listen(port,function(err){
    if(err)
    {
        console.log("oops error");
    }
    else
    {
        console.log("server is started successfully at port:",port);
    }
});