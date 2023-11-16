import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectJWTStore} from "../../../Redux/selectors";
import {auth} from "../../../Redux/operation";


export const LoginAdmin = () => {
    const [login, setLogin] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const {jwt} = useSelector(selectJWTStore);
    const dispatch = useDispatch();

    useEffect(() => {
        if (jwt) {
            window.location.href = '/';
        }
    }, [jwt]);


    return (
        <section>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(auth({login, mail, pass}));
            }}>
                <label>
                    <input onChange={({target: {value}}) => setLogin(value)} placeholder='логин' required/>
                </label>
                <label>
                    <input onChange={({target: {value}}) => setMail(value)} placeholder='эмейл' required/>
                </label>
                <label>
                    <input onChange={({target: {value}}) => setPass(value)} placeholder='пароль' required/>
                </label>
                <button>подтвердить</button>
            </form>
        </section>
    )
}