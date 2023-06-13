import React from 'react'
import "./registrationUser.css";

export default function RegistrationUser() {
  return (
    <div 
    // className={modalActive ? "modal active" : "modal"}
    // className="modal active"
    >
    <button type='button'
    // onClick={() => setModalActive(false)}
    >X</button>
    <h1>Регистрация</h1>
    <div className='regContainer'>
        <input type="text" name='name' placeholder='Имя' required
        // onChange={regHandler} value={regData?.name}
        />
        <input type="text" name='email' placeholder='Email' required
        // onChange={regHandler} value={regData?.email}
        />
        <input type='password' name='password' placeholder='Пароль' required
        // onChange={regHandler} value={regData?.password}
        />
    </div>
    <button type="button"
    // onClick={regButton}
    >Зарегистрироваться</button>
</div>
  )
}