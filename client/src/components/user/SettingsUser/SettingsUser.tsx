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
import { getCart } from '../../../redux/thunks/cartThunks/getCart.thunk'
import { getFav } from '../../../redux/thunks/favThunks/getFav.thunk'


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

  useEffect(() => {
    if (userData.id) {
      dispatch(getCart())
      dispatch(getFav())
  }
  }, [userData])
  
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

<div className="h-3/5 bg-gray-100 p-8">
            <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
              <div className="w-full flex flex-col 2xl:w-1/3">
                <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                  <h4 className="text-xl mb-10 text-gray-900 font-bold">Учетная запись</h4>
                  <ul className="mt-2 mb-5 text-gray-700">
                    <li className="flex border-b py-2">
                      <span className="font-bold flex items-center w-52">Имя:</span>
                      {userEditProfile ? 
                      <input onChange={changeUserData} id="userNameInp" name="name" type="text" autoComplete="text" className="w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={userData.name}/>
                      :
                      <span id="userName" className="text-gray-700">{userData.name}</span>
                    }
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold flex items-center w-52">E-mail:</span>
                      {userEditProfile ? 
                      <input onChange={changeUserData} id="userNameInp" name="email" type="text" autoComplete="text" className="w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={userData.email}/>
                      :
                      <span id="userName" className="text-gray-700">{userData.email}</span>
                      }
                      <h3 id="emptyEmail" className="ml-5 text-center text-md font-bold leading-9 tracking-tight text-red-600" style={{ display: 'none' }}>Это поле обязательно!</h3>
                      <h3 id="correctEmail" className="ml-5 text-center text-md font-bold leading-9 tracking-tight text-red-600" style={{ display: 'none' }}>Некорректный e-mail!</h3>
                      <h3 id="emailError" className="ml-5 text-center text-md font-bold leading-9 tracking-tight text-red-600" style={{ display: 'none' }}>Такой e-mail уже зарегистрирован!</h3>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold flex items-center w-52">Дата регистрации:</span>
                      <span className="text-gray-700">{new Date(userData.createdAt).toLocaleDateString('RU-ru')}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold flex items-center w-52">Пароль:</span>
                      {userChangePassword ?
                      <input onChange={changeUserPassword} id="passInp" name="password" type="password" autoComplete="text" className="w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
                      :
                      <span id="pass" className="text-gray-700 flex items-center">•••••••••••</span>
                      }
                      {userChangePassword ?
                      <button id="savePass" onClick={saveUserPassword} type="submit" className="text-sm cursor-pointer rounded-lg bg-green-700 ml-5 px-4 py-1.5 text-white hover:bg-green-800">Сохранить</button>
                      :
                      <button id="changePass" onClick={editUserPassword} type="submit" className="text-sm cursor-pointer rounded-lg bg-teal-500 ml-5 px-4 py-1.5 text-white hover:bg-teal-600">Изменить</button>
                      }
                      <h3 id="emptyPass" className="ml-5 text-center text-md font-bold leading-9 tracking-tight text-red-600" style={{ display: 'none' }}>Это поле обязательно!</h3>
                    </li>
                  </ul>
                  <div className="flex gap-4">
                    {userEditProfile ? 
                    <button id="saveBtn" onClick={saveUserProfile} type="submit" className="text-sm cursor-pointer rounded-lg bg-green-700 px-4 py-1.5 text-white hover:bg-green-800">Сохранить изменения</button>
                    :
                    <button id="changeBtn" onClick={editUserProfile} type="submit" className="text-sm cursor-pointer rounded-lg bg-teal-500 px-4 py-1.5 text-white hover:bg-teal-600">Внести изменения</button>
                    }
                    <button id="deleteBtn" onClick={() => setOpen(true)} type="submit" className="text-sm cursor-pointer rounded-lg bg-red-600 px-4 py-1.5 text-white hover:bg-red-700">Удалить учетную запись</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


      {/* {userEditProfile ? 
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
        </div> */}
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
