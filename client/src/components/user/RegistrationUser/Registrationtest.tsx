import React, { useState } from 'react'
import "./RegistrationUser.css";
import { useNavigate } from 'react-router-dom';
import { changeModalreg, checkUser, setUser } from '../../../redux/store/userSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiMail, HiUser, HiOutlineKey } from 'react-icons/hi';

export default function RegistrationUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initRepeatUser = false;
  const selectUserModalReg = useAppSelector((state: RootState) => state.users.modalreg)

  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const [repeatUser, setRepeatUser] = useState(initRepeatUser);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget)
      const regData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password')
      } 

      function regEmail(email, name) {
        Email.send({
          SecureToken: 'a3d45322-5353-477e-ae43-06b884d95821',
          To: email,
          From: 'localmarket.elbrus@gmail.com',
          Subject: 'Добро пожаловать в LocalMarket!',
          Body: `Уважаемый(ая) ${name}! Благодарим Вас за регистрацию! Очень надеемся в ближашее время получить от Вас ваш первый заказ!`,
        }).then();
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
        regEmail(result.email, result.name);
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
    className={selectUserModalReg ? "modal active" : "modal"}
    >
    <button type='button'
    onClick={() => dispatch(changeModalreg(false))}
    >X</button>

      <Button onClick={() => props.setOpenModal('form-elements')}>Toggle modal</Button>
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit} action='#' method='POST'>
          <div className="space-y-6">
            <h3 className="flex text-xl font-medium text-gray-900 dark:text-white justify-center">Регистрация</h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Ваше имя" />
              </div>
              <TextInput icon={HiUser} type='text' id="name" name='name' placeholder="Имя" required />
            </div>

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
              <Button className="w-full" type="submit">Зарегистрироваться</Button>
            </div>
          </div>
          </form> 
        </Modal.Body>
      </Modal>
      
      {repeatUser && <h1 className='text-rose-500'>Пользователь с такой электронной почтой уже существует</h1>}
    </div>
  )
}
