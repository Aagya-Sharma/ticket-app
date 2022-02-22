import Spinner from './Spinner';
import useAuthStatus from '../hooks/useAuthStatus'
import {Navigate,Outlet} from 'react-router-dom'

function PrivateRoute (){
    const {isLoggedIn,isCheckingStatus} = useAuthStatus()

    if(isCheckingStatus){
        return <Spinner/>
    }

    return isLoggedIn ? <Outlet /> : <Navigate to ='/login'/>

}
 
export default PrivateRoute