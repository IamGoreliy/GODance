import styler from './CustomSelectOption.module.css';
import {useState} from "react";
export const CustomSelectOption = ({optionModal: {closeCustomOption, setInput, valueInput}}) => {
    const [valueTextAria, setValueTextAria] = useState(valueInput === 'customOption' ? '' : valueInput);
    return (
        <div className={styler.generalSection}>
            <div>
                <label>
                    <textarea onChange={({target: {value}}) => {
                        setValueTextAria(value);
                    }} value={valueTextAria}/>
                </label>
                <button onClick={() => {
                    if (valueTextAria) {
                        setInput(valueTextAria);
                    } else {
                        setInput('customOption');
                    }
                    closeCustomOption(false);

                }}>
                    сохранить
                </button>
                <button onClick={() => closeCustomOption(false)}>отмена</button>
                <button onClick={() => {
                    setValueTextAria('');
                    // setInput('customOption');
                }}>сбросить</button>
            </div>
        </div>
    )
}