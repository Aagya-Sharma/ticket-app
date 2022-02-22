import { useEffect } from 'react';
import {useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import {createTicket,reset} from '../features/tickets/ticketSlice'
import {toast} from 'react-toastify'
import { BackButton } from '../components/BackButton';


function NewTicket(){
    const {user} = useSelector((state)=>state.auth)
    const {isSuccess,isError,message,isLoading} = useSelector((state)=>state.tickets)
    const [name] = useState(user.name)
    const [email ] = useState(user.email)
    const [product,setProduct] = useState('')
    const [desc,setDesc] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit =(e)=>{
        e.preventDefault()
        dispatch(createTicket({product,description :desc}))

    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    },[isError,isSuccess,dispatch,navigate,message])

    if(isLoading){
        <Spinner/>
    }
    return (
        <>
        <BackButton url ='/'></BackButton>
        <section className='heading'>
            <h1>Create a ticket</h1>
            <p>
                Please fill the form below
            </p>
        </section>
        <section className='form'>
            <div className='form-group'>
                <label htmlFor='name'> Customer Name</label>
                <input type='text' className='form-control' value={name} id='name' name='name'/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'> Customer Email</label>
                <input type='text' className='form-control' value={email} id='email' name='email'/>
            </div>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='product'>Product</label>
                <select id='product' value={product} onChange={(e)=>setProduct(e.target.value)}>
                    <option value='iPhone'>iPhone</option>
                    <option value= 'Macbook Pro'>Macbook Pro</option>
                    <option value= 'iMac'>iMac</option>
                    <option value= 'iPad'>iPad</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='desc'>Description</label>
                <textarea name='desc' id='desc' value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
            </div>
            <div className='form-group'>
                <button className='btn btn-block'>Submit</button>
            </div>
            </form>

        </section>
        </>
    )

}

export default NewTicket;