import {NavLink} from "react-router-dom";
import {useState} from "react";
import {HoldButtonPlayMovie} from "../HoldButtonPlayMovie/HoldButtonPlayMovie";
import styler from './PopularDestinationsSection.module.css';
import {danceStyle} from "./utilsForComponents/utilsForComponents";




export const PopularDestinationsSection = () => {
    const [isHoldButton, setIsHoldButton] = useState(false);
    const [whatCategoryIsHold, setWhatCategoryIsHold] = useState(null);

    return (
        <section className={styler.generalSection}>
            <div>
                <h2 className={styler.title}>Популярные направлени</h2>
                <ul className={styler.list}>
                    {danceStyle.map(ele => {
                        const {id, link, title, imgTitle, movieTitle} = ele;
                        return (
                            <li key={id} className={styler.item}>
                               <NavLink to={link}>
                                   <button className={isHoldButton &&  whatCategoryIsHold === id ? styler.buttonCategorySelect : styler.buttonCategory}>
                                       <span></span>
                                       <span></span>
                                       <span></span>
                                       <span></span>
                                        <h3 className={styler.titleDanceStyle}>{title}</h3>
                                        <img className={isHoldButton &&  whatCategoryIsHold === id ? styler.imgHold : styler.img} src={imgTitle} alt=''/>
                                       {whatCategoryIsHold === id &&
                                           <video className={styler.video} autoPlay muted playsInline loop>
                                                <source src={movieTitle} type='video/webM'/>
                                           </video>
                                       }

                                   </button>
                               </NavLink>
                               <HoldButtonPlayMovie checkIsHold={{setIsHoldButton, setWhatCategoryIsHold, id}}></HoldButtonPlayMovie>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
