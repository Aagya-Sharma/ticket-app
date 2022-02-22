const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    const tickets = await Ticket.find({ user: req.user.id })
  
    res.status(200).json(tickets)
  })

//@desc get a single ticket
//@route  GET /api/tickets/:id
//@access private
const getTicket = asyncHandler(async (req,res)=>{

    // res.status(200).json({message:'getTickets'})
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not foound')
    }

    const ticket =await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("no ticket with the id")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("not authorized")
    }


    res.status(200).json(ticket)


})

//@desc create the ticket
//@route POST /api/tickets
//@access private
const createTicket =asyncHandler( async (req,res)=>{
    const {product,description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('please add a product and description')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not foound')
    }

    const ticket = await Ticket.create({
        product,
        description,
        status:'new',
        user:req.user.id
    })
    res.status(201).json(ticket)
})

//@desc delete  the ticket
//@route DELETE /api/tickets/:id
//@access private
const deleteTicket = asyncHandler(async(req,res)=>{
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("no ticket with the id")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(201)
        throw new Error("not authorized")
    }
    
    await ticket.remove()
    

    res.status(201).json({success:true})



})


//@desc update  the ticket
//@route PUT /api/tickets/:id
//@access private
const updateTicket = asyncHandler(async(req,res)=>{
    const ticket = await Ticket.findById(req.params.id)
    const {product,description} = req.body

    if(!ticket){
        res.status(404)
        throw new Error("no ticket with the id")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(201)
        throw new Error("not authorized")
    }

    
    
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,{product,description},{new:true})
    

    res.status(201).json(updatedTicket)



})
module.exports = {
   getTickets,
   createTicket,
   getTicket,
   deleteTicket,
   updateTicket
}

