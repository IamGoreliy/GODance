import {NavLink} from "react-router-dom";

export const FooterSection = () => {
    return (
        <section>
            <div>
                <h2>Получить доступ к платформе на 7 дней бесплатно прямо сейчас!</h2>
                <p>Более +250 классов и программ</p>
                <NavLink to=''>Начать обучение</NavLink>
            </div>
        </section>
    )
}