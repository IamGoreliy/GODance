import {useState, useEffect, forwardRef} from "react";

const myRef = forwardRef((props,myRef) => {
        return (
            <ul ref={myRef}>{props}</ul>
        )
})
export const useScrollPosition = (ref) => {
    const [scrollPos, setScrollPos] = useState(0);

    console.log(myRef)

    const handlePositionScroll = () => {
        const position = window.scrollY;
        setScrollPos(position);
    }

    useEffect(() => {
        window.addEventListener('scroll', handlePositionScroll);

        return () => {
            window.removeEventListener('scroll', handlePositionScroll);
        }
    }, [])
    return scrollPos;
}