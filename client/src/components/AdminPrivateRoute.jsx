import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom"

const AdminPrivateRoute = () => {
    const { currentUser } = useSelector(state=> state.user)
  return (
   currentUser && currentUser?.isAdmin ||  currentUser?.updatedUser?.isAdmin ? <Outlet/> : <Navigate to={'sign-in'}/>
  )
}

export default AdminPrivateRoute;