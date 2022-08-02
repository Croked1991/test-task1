import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { compareLoginPassword, setLoginTempData, setPasswordTempData } from '../../store/reducers/LoginCheckSlice';
import style from './Auth.module.css'


const Auth = (props) => {
  const dispatch = useDispatch()
  const { userName, password } = useSelector(store => store.loginPage.loginTempData)
  const isWrongPair = useSelector(store => store.loginPage.isWrongPair)
  const isLogined = useSelector(store => store.loginPage.isLogined)
  const sendLoginData = (e) => {
    dispatch(setLoginTempData(e.target.value))
  }
  const sendPasswordData = (e) => {
    dispatch(setPasswordTempData(e.target.value))
  }
  const comparePasswordData = () => {
    dispatch(compareLoginPassword())
  }


  return (
    <div className={style.Cover}>
      <div className={style.Auth}>
        {isLogined && <Navigate to="/main" replace={true} />}
        {isWrongPair ? <h1>Неправильные логин/пароль</h1> : <h1>Введите логин и пароль</h1>}
        <form className={style.AuthForm}>
          <input
            className={style.AuthFormInput}
            name={'login'}
            value={userName}
            placeholder={'Введите логин'}
            onChange={(e) => sendLoginData(e)}
          />
          <input
            className={style.AuthFormInput}
            type="password"
            name={'password'}
            value={password}
            placeholder={'Введите пароль'}
            onChange={(e) => sendPasswordData(e)}
          />
          <button
            className={style.AuthFormButton}
            type={'submit'}
            onClick={(e) => { e.preventDefault(); comparePasswordData() }}>
            Логин
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth