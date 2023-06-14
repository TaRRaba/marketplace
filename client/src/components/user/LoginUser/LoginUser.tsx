import React, { useState } from 'react'
import "./LoginUser.css";
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { useNavigate } from 'react-router-dom';
import { changeModallog, setUser } from '../../../redux/store/userSlice';
import { RootState } from '../../../redux/store/store';

export default function LoginUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const selectUserModalLog = useAppSelector((state: RootState) => state.users.modallog)

  const setModalInactive = () => {
    dispatch(changeModallog(false))
  }

    // Для активации модалки
    // const setModalInactive = () => {
    //   dispatch(changeModallog(true))
    // }
  
  const initWrongEmail = false
  const initWrongPassword = false

  const [wrongEmail, setWrongEmail] = useState(initWrongEmail)
  const [wrongPassword, setWrongPassword] = useState(initWrongPassword)

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const logData = {
      email: data.get('email'),
      password: data.get('password')
    }
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      credentials: "include",
      body: JSON.stringify(logData)
    })
    const result = await response.json();
    if(result.status === 200){
      setWrongEmail(false)
      setWrongPassword(false)
      dispatch(setUser({id: result.id, name: result.name, email: result.email}))
      dispatch(changeModallog(false))
      navigate('/') // указать куда перекидывать
    } else if (result.status === 403){
      setWrongEmail(false)
      setWrongPassword(true)
    } else if (result.status === 404) {
      setWrongPassword(false)
      setWrongEmail(true)
    }
  } catch (error) {
  console.log(error);
  }  
}

  return (
    <div 
    className={selectUserModalLog ? "modal active" : "modal"}
    >
    <button type='button'
    onClick={setModalInactive}
    >X</button>
    <h1>Авторизация</h1>
    <div className='logContainer'>
      <form className="logContainer" onSubmit={handleSubmit} action='#' method='POST'>
      <input type="email" name='email' placeholder='Email' required/>
        <input type='password' name='password' placeholder='Пароль' required/>
            <button type="submit"
    >Войти</button>
      </form>
      {wrongPassword && <h1 className='text-rose-500'>Неправильный email или пароль</h1>}
      {wrongEmail && <h1 className='text-rose-500'>Необходимо ввести корректные данные в поле email</h1>}
    </div>
</div>
  )
}
