import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(user);
  if (!user.email && !isLoading) {
    return <Navigate to={'/login'} state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
