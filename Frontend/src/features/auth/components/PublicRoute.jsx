import { useSelector } from "react-redux"
import { Navigate } from "react-router"

const PublicRoute = ({children}) => {

    const {user, loading} = useSelector((state)=> state.auth)

    if(loading){
        return <h1>Loading...</h1>
    }

  return user ? <Navigate to="/home" /> : children
}

export default PublicRoute