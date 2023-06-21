import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store/hooks';
import { RootState } from '../redux/store/store';

interface IProtectProps {
  children: JSX.Element;
}

export const SellerProtection: FC<IProtectProps> = ({ children }) => {
  const seller = useAppSelector((state: RootState) => state.sellers.check);

  if (seller) {
    return children;
  }
  return <Navigate to="/" />;
};
