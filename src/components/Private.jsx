import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Navigate } from "react-router-dom";
import  Spinner from "./Spinner";


export default function Private({children}) {
    const { user, loading} = useContext(UserContext)
   
    if(loading) return <Spinner />

    if(!user) return <Navigate to="/login" />  
    return children
}