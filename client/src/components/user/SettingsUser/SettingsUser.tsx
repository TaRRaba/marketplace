import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { RootState } from '../../../redux/store/store'
import { patchUserData } from '../../../redux/thunks/userThunks/patchUserData.thunk'
import { putUserPassword } from '../../../redux/thunks/userThunks/putUserPassword.thunk'
import { deleteUser, resetCheckUser } from '../../../redux/store/userSlice'
import { delUser } from '../../../redux/thunks/userThunks/delUser.thunk'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'


export default function SettingsUser() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state: RootState) => state.users.users);
  const [userEditProfile, setUserEditProfile] = useState(false);
  const [userChangePassword, setUserChangePassword] = useState(false);
  const [inputValueUser, setInputValueUser] = useState({ name: '', email: '' });
  const [inputValuePassword, setInputValuePassword] = useState({ password: '' });
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if (userData) {
      setInputValueUser({ name: userData.name, email: userData.email });
    }
  }, [userData]);
  
  const editUserProfile = () => {
    setUserEditProfile(true)
  }

  const editUserPassword = () => {
    setUserChangePassword(true)
  }


  const saveUserPassword = () => {
    if(inputValuePassword.password === ''){
      setUserChangePassword(false)
    } else{     
      setUserChangePassword(false)
      const data = {id: userData.id,        
      password: inputValuePassword.password}
      dispatch(putUserPassword(data))
    }
  }

  const saveUserProfile = () => {
    setUserEditProfile(false)
    const data = {id: userData.id,
      name:inputValueUser.name,
    email: inputValueUser.email}
    dispatch(patchUserData(data))
  }

  const changeUserData = (e) => {
    setInputValueUser((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }
  const changeUserPassword = (e) => {
    setInputValuePassword((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const delUserHandler = () => {
   const data = { id: userData.id}
   setOpen(false)
    dispatch(delUser(data))
    dispatch(resetCheckUser(false))
    dispatch(deleteUser({}))
    navigate("/")
  }
  
  
  
  return (
    <div className='grid gap-8'>
      {userEditProfile ? 
      <>
            <div className='flex items-center'>
       <h1>Имя: </h1>
       <input onChange={changeUserData} type='text' name="name" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' defaultValue={userData.name}/>

      </div>
      <div className='flex items-center'>
       <h1>Email: </h1>
       <input onChange={changeUserData} type='text' name="email" className='ml-2 border-2 border-gray-500 rounded-lg w-1/4 text-center' defaultValue={userData.email}/>

      </div>
      <div className='flex justify-center'>
        <button
            onClick={saveUserProfile}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
           Сохранить изменения
        </button>
        </div>
        
      </> : 
      <>
     <h1>Имя: {userData.name}</h1>
      
      <h2>Email: {userData.email}</h2>

      <div className='flex justify-center'>
        <button onClick={editUserProfile}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
      </>
      }
      {userChangePassword ? <>
        <div className='flex items-center'>
        <h2>Пароль: </h2>
        <input onChange={changeUserPassword} type='password' name="password" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' required/>
        </div>
        <div className='flex justify-center'>
        <button
            onClick={saveUserPassword}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Сохранить новый пароль
        </button>
        </div>
        
      </> :
      <>
      <h2>Пароль: •••••••••••</h2>
        <div className='flex justify-center'>
        <button
            onClick={editUserPassword}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
      </>
      }
        <div className='flex justify-center'>
        <button
            onClick={() => setOpen(true)}
            type="button"
            className="rounded-md bg-red-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
            Удалить профиль
        </button>
        </div>
        <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Предупреждение
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Вы уверены, что хотите удалить свой профиль? <br></br> Вы потеряете историю соих заказов!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={delUserHandler}
                  >
                    Да, удалить
                  </button>
                  <button
                    type="button"
                    className=" mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Назад
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
  )
}
