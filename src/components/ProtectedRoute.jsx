import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";

export default function ProtectedRoute() {
    const navigate = useNavigate()
    const { user, getUserProfile } = useContext(UserContext)

    const checkUser = async () => {
        console.log("DEBUGG: checkUser", localStorage.getItem('accessToken'));
        try{
            if(!localStorage.getItem('accessToken')) {
                navigate('/login')
                return
            }
            await getUserProfile()
            if(!user) return  navigate('/login')
        }
        catch(err) {
           navigate('/login')
        }
    }

    useEffect(()=>{
        console.log("DEBUGG in ProtectedRoute: user", user);
    }, [user])

    useEffect(()=>{
        checkUser()
    }, [user, getUserProfile, navigate])


  return <Outlet />
  
}