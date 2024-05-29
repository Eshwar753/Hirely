import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecruiterRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isRecruiter ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
export default RecruiterRoute;