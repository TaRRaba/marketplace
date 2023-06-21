import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store/hooks';
import { RootState } from '../redux/store/store';

interface IProtectProps {
  children: JSX.Element;
}

export const UserProtection: FC<IProtectProps> = ({ children }) => {
  const user = useAppSelector((state: RootState) => state.users.check);

  if (user) {
    return children;
  }
  return <Navigate to="/" />;
};
