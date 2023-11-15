import moment from "moment";
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {useDispatch} from "react-redux";
import {CustomSelectOption} from "../CustomSelectOption/CustomSelectOption";
import {updateTD} from "../../Redux/operation";
import {sendForm} from "../../utils/secondaryFunctions";

export const RedactionToDo = ({tdEdit, token}) => {
    const {id, date_to_do: dateToDo, text_to_do: description, title_to_do: title} = tdEdit;
    const [customOption, setCustomOption] = useState('...свой вариант');
    const [isOpenCustomSelect, setIsOpenCustomSelect] = useState(false);
    const [valueSelect, setValueSelect] = useState('');
    const time = moment(dateToDo).format('HH:mm');
    const date = moment(dateToDo).format('YYYY-MM-DD');
    const dispatch = useDispatch();

    useEffect(() => {
        if (valueSelect === customOption) {
            setIsOpenCustomSelect(true);
        }
    }, [valueSelect])

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                sendForm(e, dispatch, updateTD, token, `http://localhost:3001/updateTD?id=${id}`, title);
            }
            }>
                <label>
                    <input type='date' defaultValue={date} name='date'/>
                </label>
                <label>
                    <input type='time' defaultValue={time} name='time'/>
                </label>
                <select onChange={({target: {value}}) => setValueSelect(value)} defaultValue={title} name='title'>
                    <option value={title} disabled>{title}</option>
                    <option value='dance'>dance</option>
                    <option value='hip-hop'>hip-hop</option>
                    <option value={customOption}>
                        {customOption === 'customOption' ? '...свой вариант' : customOption}
                    </option>
                </select>
                <textarea defaultValue={description} name='description'></textarea>
                <button>сохранить изменение</button>
            </form>
            {isOpenCustomSelect && createPortal(<CustomSelectOption optionModal={{closeCustomOption: setIsOpenCustomSelect, setInput: setCustomOption, valueInput: customOption}}/>, document.querySelector('#modalForOption'))}
        </div>
    )
}