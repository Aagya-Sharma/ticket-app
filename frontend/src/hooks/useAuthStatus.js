import {useState,useEffect}  from 'react'
import {useSelector} from'react-redux'

function useAuthStatus(){
    const [isCheckingStatus,setIsCheckingStatus] = useState(true)
    const [isLoggedIn,setIsLoggedIn] = useState(false) 

    const {user} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(user){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
        setIsCheckingStatus(false)

    },[user])

return {isLoggedIn,isCheckingStatus}
}

export default useAuthStatus