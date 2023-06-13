import React from 'react'
import "./LoginSeller.css";

export default function LoginSeller() {
  return (
    <div 
    // className={modalActive ? "modal active" : "modal"}
    // className="modal active"
    >
    <button type='button'
    // onClick={() => setModalActive(false)}
    >X</button>
    <h1>Авторизация</h1>
    <div className='logContainer'>
        <input type="text" name='email' placeholder='Email' required
        // onChange={logHandler} value={logData?.email}
        />
        <input type='password' name='password' placeholder='Пароль' required
        // onChange={logHandler} value={logData?.password}
        />
    </div>
    <button type="button"
    // onClick={logButton}
    >Войти</button>
</div>
  )
}
