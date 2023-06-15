import React, { ChangeEvent, useState } from 'react'
import "./RegistrationUser.css";
import { useNavigate } from 'react-router-dom';
import { changeModalreg, checkUser, setUser } from '../../../redux/store/userSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';

export default function RegistrationUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initRepeatUser = false;
  const selectUserModalReg = useAppSelector((state: RootState) => state.users.modalreg)

  // Для активации модалки
  // const setModalActive = () => {
  //   dispatch(changeModalreg(true))
  // }

  const [repeatUser, setRepeatUser] = useState(initRepeatUser);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget)
      const regData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password')
      }
      
      try {
        const response: Response = await fetch('http://localhost:3001/api/auth/registration', {
          method: "POST",
          headers: {'Content-Type' : 'application/json'},
          credentials: "include",
          body: JSON.stringify(regData)
        })
        const result = await response.json();

        if (result.status === 201) {
        setRepeatUser(false)
        dispatch(setUser({id: result.id, name: result.name, email: result.email}))
        dispatch(changeModalreg(false))
        dispatch(checkUser(true))  
        navigate('/') // указать куда перекидывать
        } else {
          setRepeatUser(true);
        }
      } catch (error) {
        console.log(error);
      }
    } 

  return (
    <div 
    className={selectUserModalReg ? "modal active" : "modal"}>
    <button type='button'
    onClick={() => dispatch(changeModalreg(false))}
    >X</button>
    <h1>Регистрация</h1>
    <div className='regContainer'>
      <form className='regContainer' onSubmit={handleSubmit} action='#' method='POST'>
        <input type="text" name='name' placeholder='Имя' required/>
        <input type="email" name='email' placeholder='Email' required/>
        <input type='password' name='password' placeholder='Пароль' required/>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {repeatUser && <h1 className='text-rose-500'>Пользователь с такой электронной почтой уже существует</h1>}
    </div>
</div>
  )
}
