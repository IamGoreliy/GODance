import {useDispatch, useSelector} from "react-redux";
import {selectToDo, selectToDoData} from "../../Redux/selectors";
import {useEffect, useLayoutEffect, useState} from "react";
import {getToDo, deleteTD} from "../../Redux/operation";
import {RedactionToDo} from "../RedactionToDo/RedactionToDo";
import moment from "moment";
import styler from './DetailDay.module.css';

export const DetailDay = ({option: {selectDate, verificationJWT, jwt}}) => {
    const toDoData = useSelector(selectToDoData);
    const [isOpenDescription, setIsOpenDescription] = useState(null);
    const [onCorrection, setOnCorrection] = useState(null);
    const dispatch = useDispatch();


    //useLayoutEffect - сработает до отрисовки страницы.
    useLayoutEffect(() => {
        dispatch(getToDo(selectDate));
    }, [])
    return (
        <section className={styler.generalSection}>
            <h2>детали дня {selectDate}</h2>
            <ul>
                {toDoData.map(ele => {
                    const {id, date_to_do: dateToDo, text_to_do: description, title_to_do: title} = ele;
                    const time = moment(dateToDo).format('HH:mm');
                    return (
                        <li key={id}>
                            <h3>{`${time}`}</h3>
                            <h2>{title}</h2>
                            {isOpenDescription === id && <p>{description}</p>}
                            {onCorrection === id && <RedactionToDo tdEdit={ele} token={jwt}/>}
                            <button onClick={() => {
                                if (!isOpenDescription) {
                                    setIsOpenDescription(id);
                                } else {
                                    setIsOpenDescription(null);
                                }
                            }}>
                                показать описание
                            </button>
                            {verificationJWT &&
                                <div>
                                    <button onClick={() => {
                                        if (!onCorrection) {
                                            setOnCorrection(id);
                                            setIsOpenDescription(id)
                                        } else {
                                            setOnCorrection(null);
                                            setIsOpenDescription(null);
                                        }
                                    }}>редактировать</button>
                                    <button onClick={() => {
                                        dispatch(deleteTD({id, token: jwt, date: selectDate}))
                                    }}>удалить</button>
                                </div>
                            }
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}


