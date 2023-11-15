import styler from "../PopularDestinationsSection/PopularDestinationsSection.module.css";
import {ReactSVG} from "react-svg";
import holdButtonIcon from '../../image/image/svg/one-finger-double-tap.svg';

export const HoldButtonPlayMovie = ({checkIsHold: {setIsHoldButton, setWhatCategoryIsHold, id}, children}) => {
    return (
        <button onTouchStart={() => {
                    setIsHoldButton(true);
                    setWhatCategoryIsHold(id);
                }}
                onTouchEnd={() => {
                    setIsHoldButton(false);
                    setWhatCategoryIsHold(null);
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    return false;
                }}
                className={styler.btnTouch}
        >
           <ReactSVG className={styler.iconForButtonHold} src={holdButtonIcon}/>
        </button>
    )
}