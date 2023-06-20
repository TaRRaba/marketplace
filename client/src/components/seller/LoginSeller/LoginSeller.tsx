import React, { useState } from 'react'
import "./LoginSeller.css";
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { useNavigate } from 'react-router-dom';
import { changeModallogSeller, checkSeller, setSeller } from '../../../redux/store/sellerSlice';
import { RootState } from '../../../redux/store/store';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiMail, HiOutlineKey } from 'react-icons/hi';

export default function LoginSeller() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const selectSellerModalLog = useAppSelector((state: RootState) => state.sellers.modallog)
  
  const initWrongEmail = false
  const initWrongPassword = false

  const [wrongEmail, setWrongEmail] = useState(initWrongEmail)
  const [wrongPassword, setWrongPassword] = useState(initWrongPassword)

    const setModalClose = () => {
      dispatch(changeModallogSeller(undefined))
    }

const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget)
  const logData = {
    email: data.get('email'),
    password: data.get('password')
  }
  try {
    const response = await fetch('http://localhost:3001/api/auth/login/seller', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      credentials: "include",
      body: JSON.stringify(logData)
    })
    const result = await response.json();

    if(result.status === 200){
      setWrongEmail(false)
      setWrongPassword(false)
      dispatch(setSeller({id: result.id, name: result.name, email: result.email, INN: result.INN}))
      setModalClose();
      dispatch(checkSeller(true))  
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

    <Modal 
    show={selectSellerModalLog === 'form-elements'} size="md" popup onClose={setModalClose}
    >
        <Modal.Header />
        <Modal.Body>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit} action='#' method='POST'>
          <div className="space-y-6">
            <h3 className="flex text-xl font-medium text-gray-900 dark:text-white justify-center">Авторизация</h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Ваша почта" />
              </div>
              <TextInput icon={HiMail} type='email' id="email" name='email' placeholder="Email" required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Ваш пароль" />
              </div>
              <TextInput icon={HiOutlineKey} id="password" type="password" name='password' placeholder="Пароль" required />
            </div>

            <div className="w-full">
              <Button className="w-full mt-10" type="submit">Войти</Button>
            </div>
          </div>
          {wrongPassword && <h1 className='text-rose-500'>Неправильный email или пароль</h1>}
          {wrongEmail && <h1 className='text-rose-500'>Необходимо ввести корректные данные в поле email</h1>}
          </form> 
        </Modal.Body>
      </Modal>

  )
}
