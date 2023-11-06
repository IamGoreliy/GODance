import {NavLink} from "react-router-dom";

export const Calendar = () => {
    return (
        <section>
            <h1>Календарь</h1>
            <NavLink to='/'><button>назад</button></NavLink>

        </section>
    )
}

//onClickDay={(value, event) => alert(`вы выбрали дату ${value}`)} --- выбор даты в календаре