const mongoose= require('mongoose')
const { type } = require('os')


//Collection1
const expenseDetailsSchema = new mongoose.Schema(
    {
        amount:{
            type:Number
        },
        category:{
            type:String
        },
        date:{
            type:String
        }
    },{versionKey:false}
    
)

//Collection2
const  userDetailsSchema = new mongoose.Schema(
    {
        username:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String
        }
    }
)

//to Access that collection convert into module to make operations and access it anywhere

//Note: Always make the model Name varaibles firstletter as captilize
const Expense = mongoose.model('ExpenseDetails', expenseDetailsSchema );
const Users = mongoose.model('UserDetails',userDetailsSchema);


//Export this variables and import it in index.js or where we want to use this collection
module.exports = {Expense,Users};