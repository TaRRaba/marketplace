import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { RootState } from '../redux/store/store';
import { checkUser, setUser } from '../redux/store/userSlice';

interface IProtectProps {
  children: JSX.Element;
}

export const UserProtection: FC<IProtectProps> = ({ children }) => {
  const user = useAppSelector((state: RootState) => state.users.check);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect( () => {
    (async function () { try {
        const response = await fetch ('http://localhost:3001/api/auth/checkUser', {
        credentials: "include",
        })
        const result = await response.json()
        if (result){
          dispatch(checkUser(true))
          dispatch(setUser({id: result.id, name: result.name, email: result.email, createdAt: result.createdAt}))
          setLoading(true); 
        }
    
      } catch (error) {
        console.log(error);
      }      
          
      })()
    }, [])

    if (loading) {
      if (user) {
        return children;
      }
        return <Navigate to="/" />;
  }
};
