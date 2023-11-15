import {NavLink} from "react-router-dom";
import {useGetStyleMovie} from '../../../utils/customHook';
import {useSelector} from "react-redux";
import {selectYTPlayer} from "../../../utils/selectYTPlayer";
import {selectCounterVideo, selectVideo} from "../../../Redux/selectors";
import styler from './StyleDancePage.module.css';

export const StyleDancePage = ({dependence: {title}}) => {

    const video = useSelector(selectVideo);
    const counterVideo = useSelector(selectCounterVideo);
    const getMore = useGetStyleMovie();


    return (
        <section className={styler.generalSection}>
            <NavLink to='/'><button>назад</button></NavLink>
            <h1 className={styler.title}>{title}</h1>
            <div>
                <ul className={styler.list}>
                {video.map(ele => {
                    const {id, name_video: nameVideo, url_video: urlVideo} = ele;

                    return (
                        <li key={id} className={styler.item}>
                            {selectYTPlayer(urlVideo)}
                        </li>
                    )
                })}
                </ul>
                {counterVideo > video.length &&<button onClick={() => getMore(video.length)}>показать еще</button>}
            </div>
        </section>
    )
}