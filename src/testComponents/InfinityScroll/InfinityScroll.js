import {useState, useEffect, forwardRef} from "react";

const myRef = forwardRef((props,myRef) => {
        return (
            <ul ref={myRef}>{props}</ul>
        )
})
export const useScrollPosition = () => {
    const [scrollPos, setScrollPos] = useState(0);


    const handlePositionScroll = (e) => {
        const height = window.scrollY;
        setScrollPos(height)
    }


    useEffect(() => {
        window.addEventListener('scroll', handlePositionScroll);

        return () => {
            window.removeEventListener('scroll', handlePositionScroll);
        }
    }, [])
    return scrollPos;
}