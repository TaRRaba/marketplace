import React, { useState } from 'react'
import "./RegistrationSeller.css";
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { useNavigate } from 'react-router-dom';
import { changeModalregSeller, checkSeller, setSeller } from '../../../redux/store/sellerSlice';
import { RootState } from '../../../redux/store/store';

export default function RegistrationSeller() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initRepeatSeller = false;
  const selectSellerModalReg = useAppSelector((state: RootState) => state.sellers.modalreg)

    // Для активации модалки
  // const setModalActive = () => {
  //   dispatch(changeModalreg(true))
  // }

  const [repeatSeller, setRepeatSeller] = useState(initRepeatSeller);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const regData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      INN: data.get('INN')
    }

    function regEmail(email, name) {
      Email.send({
        SecureToken: 'a3d45322-5353-477e-ae43-06b884d95821',
        To: email,
        From: 'localmarket.elbrus@gmail.com',
        Subject: 'Добро пожаловать в LocalMarket!',
        Body: `${name}, благодарим Вас за регистрацию! Рады, что Вы решили стать нашим партнером, желаем высоких продаж и развития!`,
      }).then();
    }

    try {
      const response: Response = await fetch('http://localhost:3001/api/auth/registration/seller', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        credentials: 'include',
        body: JSON.stringify(regData)
      })
      const result = await response.json();

      if (result.status === 201) {
        setRepeatSeller(false)
        dispatch(setSeller({id: result.id, name: result.name, email: result.email, INN: result.INN}))
        dispatch(checkSeller(true)) 
        dispatch(changeModalregSeller(false))
        regEmail(result.email, result.name);
        navigate('/') // указать куда перекидывать
      } else {
        setRepeatSeller(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div 
    className={selectSellerModalReg ? "modal active" : "modal"}>
    <button type='button'
    onClick={() => dispatch(changeModalregSeller(false))}
    >X</button>
    <h1>Регистрация</h1>
    <div className='regContainer'>
      <form className='regContainer' onSubmit={handleSubmit} action='#' method='POST'>
        <input type="text" name='name' placeholder='Имя' required/>
        <input type="email" name='email' placeholder='Email' required/>
        <input type="text" name='INN' placeholder='ИНН' required/>
        <input type='password' name='password' placeholder='Пароль' required/>
        <button type="submit">Зарегистрироваться</button>
        </form>
        {repeatSeller && <h1 className='text-rose-500'>Пользователь с такой электронной почтой уже существует</h1>}
    </div>
</div>
  )
}
