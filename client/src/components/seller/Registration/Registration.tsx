import React from 'react'
import "./Registration.css";

export default function registration() {
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
        <input type="text" name='INN' placeholder='ИНН' required
        // onChange={regHandler} value={regData?.INN}
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
