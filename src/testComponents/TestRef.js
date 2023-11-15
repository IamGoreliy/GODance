import {useEffect, useRef, forwardRef} from "react";


const TestElement = (props, myRef) => {
    return (
        <h1 ref={myRef}>hello word</h1>
    )
}

const NewTestElement = forwardRef(TestElement);
export const TestRef = () => {
    const h1Ref = useRef();


    useEffect(() => {
        const element = h1Ref.current;
        console.dir(element);
    }, [])
    return (
        <div>
            <div>
                <NewTestElement ref={h1Ref}/>
            </div>
        </div>
    )
}