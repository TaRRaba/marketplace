import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { RootState } from '../redux/store/store';
import { checkSeller, setSeller } from '../redux/store/sellerSlice';

interface IProtectProps {
  children: JSX.Element;
}

export const SellerProtection: FC<IProtectProps> = ({ children }) => {
  const seller = useAppSelector((state: RootState) => state.sellers.check);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect( () => {
    (async function () { try {
        const response = await fetch ('http://localhost:3001/api/auth/checkSeller', {
        credentials: "include",
        })
        const result = await response.json()
        if(result){
          dispatch(checkSeller(true))     
          dispatch(setSeller({id: result.id, name: result.name, email: result.email, INN: result.INN, createdAt: result.createdAt}));
          setLoading(true);     
        }
      } catch (error) {
        console.log(error);
      }      
          
      })()
    }, [])

    if (loading) {
      if (seller) {
        return children;
      }
        return <Navigate to="/" />;
  }
};
