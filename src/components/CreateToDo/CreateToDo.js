import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {CustomSelectOption} from "../CustomSelectOption/CustomSelectOption";
import {sendForm} from "../../utils/secondaryFunctions";
import {useDispatch} from "react-redux";
import {createTD} from "../../Redux/operation";

export const CreateToDo = ({selectedDate: {selectDate, jwt}}) => {
    const [customOption, setCustomOption] = useState('customOption');
    const [isOpenCustomOption, setIsOpenCustomOption] = useState(false);
    const [valueCustomOption, setValueCustomOption] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        if (valueCustomOption === customOption) {
            setIsOpenCustomOption(true);
        }

    }, [valueCustomOption]);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            sendForm(e, dispatch, createTD, jwt, 'http://localhost:3001/createTD');

        }}>
            <label>
                <input type='date' value={selectDate} readOnly name='date'/>
            </label>
            <label>
                <input type='time' name='time' required/>
            </label>
            <label>
                <select defaultValue='DefaultValue' onChange={({target: {value}}) => setValueCustomOption(value)} name='title' required>
                    <option value='DefaultValue' disabled>...выбрать</option>
                    <option value='hip-hop'>Hip-Hop</option>
                    <option value='dance'>Dance</option>
                    <option value={customOption}
                    >{customOption !== 'customOption' ? customOption : '...свой вариант'}
                    </option>
                    {isOpenCustomOption && createPortal(<CustomSelectOption optionModal={{closeCustomOption: setIsOpenCustomOption, setInput: setCustomOption, valueInput: customOption}}/>, document.querySelector('#modalForOption'))}
                </select>
            </label>
            <label>
                <textarea name='description'></textarea>
            </label>
            <button>сохранить</button>
        </form>
    )
}