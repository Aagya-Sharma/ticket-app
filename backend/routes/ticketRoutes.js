const express = require('express')
const router = express.Router()
const {getTickets,createTicket, getTicket,deleteTicket,updateTicket} = require('../controllers/ticketControllers')



// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getTickets).post(protect,createTicket)
router.route('/:id').get(protect,getTicket)
router.route('/:id').delete(protect,deleteTicket)
router.route('/:id').put(protect,updateTicket)


module.exports = router