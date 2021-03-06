import {Link} from 'react-router-dom'
import {FaTicketAlt,FaQuestionCircle} from 'react-icons/fa'
function Home() {
    return (
     <>
     <section className="heading">
       <h1>What do you need help with?/</h1>
       <p>Please choose from an option below</p>
     </section>
     <section>
       <Link 
       to ='/new-ticket' 
       className='btn btn-reverse btn-block'
       >
         <FaQuestionCircle/>Create new Ticket
      </Link>
      <Link 
       to ='/tickets' 
       className='btn btn-block'
       >
         <FaTicketAlt/>view tickets
      </Link>
     </section>
     </>
    );
  }
  
  export default Home;