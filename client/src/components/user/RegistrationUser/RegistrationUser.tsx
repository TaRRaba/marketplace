import React, { ChangeEvent, useState } from 'react'
import "./registrationUser.css";
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/store/userSlice';
import { useAppDispatch } from '../../../redux/store/hooks';

export default function RegistrationUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const initRepeatUser = false

  const [repeatUser, setRepeatUser] = useState(initRepeatUser)

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
    // className={modalActive ? "modal active" : "modal"}
    className="modal active"
    >
    <button type='button'
    // onClick={() => setModalActive(false)}
    >X</button>
    <h1>Регистрация</h1>
    <div className='regContainer'>
      <form className='regContainer' onSubmit={handleSubmit} action='#' method='POST'>
        <input type="text" name='name' placeholder='Имя' required/>
        <input type="email" name='email' placeholder='Email' required/>
        <input type='password' name='password' placeholder='Пароль' required/>
        <button type="submit"
        >Зарегистрироваться</button>
      </form>
      {repeatUser && <h1 className='text-rose-500'>Пользователь с такой электронной почтой уже существует</h1>}
    </div>
</div>
  )
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
