import { useState } from "react";
import { API_BASE, LOGIN_MAX, LOGIN_MIN, PASSWORD_MAX, PASSWORD_MIN } from "../consts";
import UserApi from "../api/UserApi";
import { Link } from "react-router-dom";
import { FaLock, FaUser, FaUserAstronaut } from "react-icons/fa";

import './SignUp.css'
import { Button, Form } from "react-bootstrap";
import { FaCircleExclamation } from "react-icons/fa6";

export default function SignUp() {
    const [errorMsg, setErrorMsg] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const signUp = async (e: any) => {
        e.preventDefault();

        if (localStorage.getItem('token') != null)
            return setErrorMsg(`Вы уже авторизованы !`);

        if (login.length < LOGIN_MIN)
            return setErrorMsg(`Слишком короткий логин (минимум ${LOGIN_MIN} символа)`)
        else if (login.length > LOGIN_MAX)
            return setErrorMsg(`Слишком длинный логин (максимум ${LOGIN_MAX} символов)`)
        else if (password.length < PASSWORD_MIN)
            return setErrorMsg(`Слишком короткий пароль (минимум ${PASSWORD_MIN} символов)`)
        else if (password.length > PASSWORD_MAX)
            return setErrorMsg(`Слишком длинный пароль (максимум ${PASSWORD_MAX} символов)`)
        else if (password !== repeatPassword)
            return setErrorMsg(`Пароли не совпадают !`)

        setErrorMsg('');

        setErrorMsg(await UserApi.signUp(login, password));
    }


    return (
        <>
            <div className="d-flex align-items-center vh-100">
                <div className='form-auth mx-auto px-3 py-3 align-items-center'>
                    <div className="text-center" style={{fontSize: "58px"}}>
                        <FaUserAstronaut />
                    </div>
                    <h3 className='title-nunito text-center my-3'>Регистрация</h3>

                    <form className='mx-lg-5 mt-4 mb-3'>
                        <div className='d-flex mb-3'>
                            <div className='text-center d-flex align-items-center px-3 py-3 bg-dark'>
                                <FaUser />
                            </div>
                            <Form.Control className='signup-input w-100 px-3 rounded-0 bg-dark' placeholder='Логин' onChange={e => setLogin(e.target.value)} />
                        </div>
                        <div className='d-flex mb-3'>
                            <div className='text-center d-flex align-items-center px-3 py-3 bg-dark'>
                                <FaLock />
                            </div>
                            <Form.Control className='signup-input w-100 px-3 rounded-0 bg-dark' placeholder='Пароль' onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className='d-flex mb-3'>
                            <div className='text-center d-flex align-items-center px-3 py-3 bg-dark'>
                                <FaLock />
                            </div>
                            <Form.Control className='signup-input w-100 px-3 rounded-0 bg-dark' placeholder='Повторите пароль' onChange={e => setRepeatPassword(e.target.value)} />
                        </div>

                        <span className='text-danger mx-2 d-block'>
                            {errorMsg.length > 0 ? <FaCircleExclamation className="me-1"/> : null} {errorMsg}
                            </span>

                        <Button className='w-100 mt-2 mb-3 rounded-0 py-2' onClick={signUp}>Продолжить</Button>

                        <p className='text-secondary text-center'>Есть аккаунт ? <Link to="/signin" className='text-green'>Войдите</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}