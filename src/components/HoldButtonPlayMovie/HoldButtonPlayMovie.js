import styler from "../../components/PopularDestinationsSection/PopularDestinationsSection.module.css";

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
            {children}
        </button>
    )
}