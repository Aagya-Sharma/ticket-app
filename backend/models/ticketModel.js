const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    user:{
        type :mongoose.Schema.Types.ObjectId,
        required:true,
        rsf :'user'

    },
    product:{
        type :String,
        required:[true,'please choose a product'],
        enum :['iPhone','Macbook Pro','iMac','iPad']

    },      
    description :{
        type :String,
        required:[true,'please enter a description'],
    },
    status :{
        type:String,
        required :true,
        enum :['new','open','closed'],
        default:'new'
    }

},{
    timestamps :true
})

module.exports = mongoose.model('Ticket',ticketSchema) 