import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTicket,reset,closeTicket} from '../features/tickets/ticketSlice'
import {useParams,useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import { BackButton } from '../components/BackButton'
import {toast} from 'react-toastify'

function Ticket(){
    const{isLoading,isSuccess,ticket,isError,message} = useSelector((state)=>state.tickets)
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    const navigate= useNavigate()

    useEffect(() => {
        return () => {
          if (isSuccess) {
            dispatch(reset())
          }
        }
      }, [dispatch, isSuccess])
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
    },[dispatch,message,ticketId,isError])

    const OnCloseTicket= (ticketId)=>{
        dispatch(closeTicket(ticketId))
        toast.success('ticket closed')
        navigate('/tickets')

    }
    
    if (isLoading) {
        return <Spinner />
      }

    return (
        
       <div className='ticket-page'>
           <header className='ticket-header'>
               <BackButton url ='/tickets'/>
               <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
           </header>
           {ticket.status !== 'closed' && (
               <button onClick={OnCloseTicket} className=' btn btn-block btn-danger'>
                   Close Ticket
               </button>
           )}
       </div>
    )

}
export default Ticket