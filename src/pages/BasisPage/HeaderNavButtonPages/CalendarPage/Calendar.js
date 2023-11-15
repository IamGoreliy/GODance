import {useMemo, useState} from "react";
import {createPortal} from "react-dom";
import moment from "moment";
import {fnWhatMonthIsIt, nextMonthBtn, previousMonthBtn, resetDateBtn} from "../../../../utils/createCalendarForDate";
import {ModalWindow} from "../../../ModalWindow/ModalWindow";
import {CreateToDo} from "../../../../components/CreateToDo/CreateToDo";
import {DetailDay} from "../../../../components/DetailDay/DetailDay";
import styler from './Calendar.module.css';

const nameWeeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Stu', 'Sun'];
export const Calendar = ({jwtToken: {verificationJWT, jwt}}) => {
    const [userDate, setUserDate] = useState(moment().format('YYYY-MM-DD'));
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);
    const [pickDate, setPickDate] = useState(0);
    const currentDay = moment().format('DD-MM-YYYY');
    const dayInMouth = useMemo(() => {
        return fnWhatMonthIsIt(userDate);
    }, [userDate]);

    return (
        <div className={styler.generalSection}>
            <h2 className={styler.titleMouth}>{moment(userDate).format('MMMM YYYY')}</h2>
            <div className={styler.controlSectionThumb}>
                <button onClick={() => setUserDate(previousMonthBtn(userDate))}>{'<<'}</button>
                <input onChange={({target: {value}}) => setUserDate(value)} type='date' value={userDate}/>
                <button onClick={() => setUserDate(nextMonthBtn(userDate))}>{'>>'}</button>
                <button onClick={() => setUserDate(resetDateBtn())}>сброс</button>
            </div>
            <div className={styler.nameWeekThumb}>
                {nameWeeks.map(ele => {
                    return (
                        <div key={ele} className={styler.nameWeek}>
                            <p>{ele}</p>
                        </div>
                    )
                })}
            </div>
            <div className={styler.daySectionThumb}>
                {dayInMouth.map(ele => {

                    return (
                        <div key={ele}
                            className={typeof ele !== 'string'
                                ? moment(userDate).format('MM-YYYY') === currentDay.substring(3,11)
                                        ? ele === +currentDay.substring(0,2)
                                            ? styler.currentDaySection : styler.daySection
                                        : styler.daySection
                                : styler.daySectionND
                            }
                            onClick={() => {
                                setPickDate(ele.toString().length === 2 ? ele : `0${ele}`);
                                setIsOpenModalWindow(true);
                            }}
                        >
                            <p>{typeof ele !== 'string' ? ele : +ele.substring(0,2)}</p>
                        </div>
                    )
                })}
                {isOpenModalWindow && createPortal(
                    <ModalWindow fnOpenCloseModalWindow={{setIsOpenModalWindow, selectDate: `${userDate.substring(0, 8)}${pickDate}`}}>
                        {verificationJWT && <CreateToDo selectedDate={{selectDate: `${userDate.substring(0, 8)}${pickDate}`, jwt}}/>}
                        <DetailDay option={{selectDate: `${userDate.substring(0, 8)}${pickDate}`, verificationJWT, jwt}}/>
                    </ModalWindow>,
                    document.querySelector('#modalWindow'))}
            </div>
        </div>
    )
}