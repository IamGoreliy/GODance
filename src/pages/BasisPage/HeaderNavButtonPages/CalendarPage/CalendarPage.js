import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Calendar} from "./Calendar";
import {selectJWTStore} from "../../../../Redux/selectors";
import {useEffect} from "react";
import {verificationToken} from "../../../../Redux/operation";


export const CalendarPage = () => {
    const {jwt, verificationJWT} = useSelector(selectJWTStore);
    const dispatch = useDispatch();

    useEffect(() => {
        if (jwt) {
            dispatch(verificationToken({jwt}));
        }
    }, [])
    return (
        <section>
            <h1>Календарь</h1>
            <NavLink to='/'><button>назад</button></NavLink>
            <Calendar jwtToken={{verificationJWT, jwt}}/>
        </section>
    )
}

//onClickDay={(value, event) => alert(`вы выбрали дату ${value}`)} --- выбор даты в календаре