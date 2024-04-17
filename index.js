/*
To start a program we use node.js
we can also change by going package.json and make script as object and create "start":"node index.js"
if you want to run instead of start we can use another name so that
    "run_application":"node index.js"
          (In terminal)->npm run run_application 
              use run word to run default name to start the program
*/
const express  = require('express');
const mongoose  = require('mongoose');
const bodyparser = require('body-parser')
const {Expense,Users} = require('./Schema')
//cors used for deployment
const cors = require('cors')
const app = express();

app.use(bodyparser.json())
app.use(cors())


async function connectTodb(){
    try{
        //                                                                                  this Expensetracker is my database name we have to write name in between ? and /
        await mongoose.connect('mongodb+srv://Training:jeeva23D@practice.am5qiwu.mongodb.net/Expensetracker?retryWrites=true&w=majority&appName=Practice')
        const port = process.env.PORT || 5000
        app.listen(port,(error)=>{
        if(!error){
            console.log(`Server is listerning to ${port} port...`)
        }
        else{
            console.log(`Sorry...Its seems like an Erroor on Listerning the port as ${error}`)
        }
    }
        
    )
 
    }
    catch(error){    
        console.log(error)
    }
}
connectTodb()


//Expense Post
app.post('/add-expenses',async function(request,response){
    try{
        await Expense.create({
            "amount": request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(200).json({
            "Status":200,
            "Message":"Expenses Data added ;)",
        })


    }catch(error){
        response.status(404).json({
            "Status":404,
            "Message":"Data not created as collections",
            "Error":error
        })
    }
})
//Expense get
app.get('/get-expenses',async function(request,response){
    try{
        const DisplayExpenses = await Expense.find()
        response.status(200).json(DisplayExpenses);

    }
    catch(error){
        response.status(404).json({
            "Status":404,
            "Message":"Data not found",
            "Error":error
        })
    }
})

//Expense delete
app.delete('/delete-expenses/:id',async function(request,response){
try{
    await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
        "Status":200,
        "Message":"Data deleted",
    })
}catch(error){
    response.status(404).json({
        "Status":404,
        "Message":"Data not deleted",
        "Error":error
    })
}
})

//Expenses patch/update
app.patch('/update-expenses/:id',async function(request,response){
    try{
        await Expense.findByIdAndUpdate(request.params.id,{
            "amount": request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(200).json({
            "Status":200,
            "Message":"Data updated",
        })
    }catch(error){
        response.status(404).json({
            "Status":404,
            "Message":"Data not updated",
            "Error":error
        })
    }
})

//user post
app.post('/add-user',async function(request,response){
    try{
        await Users.create({
            "username": request.body.username,
            "email":request.body.email,
            "password":request.body.password
        })
        response.status(200).json({
            "Status":200,
            "Message":"User Data added ;)",
        })


    }catch(error){
        response.status(404).json({
            "Status":404,
            "Message":"Data not created as collections",
            "Error":error
        })
    }
})

//User get
app.get('/get-user',async function(request,response){
    try{
        const DisplayUsers= await Users.find()
        response.status(200).json(DisplayUsers);

    }
    catch(error){
        response.status(404).json({
            "Status":404,
            "Message":"Data not found",
            "Error":error
        })
    }
})

//User delete

app.delete('/delete-user/:id',async function(request,response){
    try{
        await Users.findByIdAndDelete(request.params.id)


    }
    catch(error){
        response.json({
            "Status":404,
            "Message":"User data not deleted ",
            "Error":error
        })
    }
})

//User patch/update
app.patch('/update-expenses/:id',async function(request,response){
    try{
        await Users.findByIdAndUpdate(request.params.id,{
            "username": request.body.username,
            "email":request.body.email,
            "password":request.body.password
        })
        response.status(200).json({
            "Status":200,
            "Message":"Data updated",
        })
    }catch(error){
        response.status(404).json({
            "Status":404,
            "Message":"Data not updated",
            "Error":error
        })
    }
})
