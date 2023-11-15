import styled from "@emotion/styled";

const WrapperImg = styled.div`
`
const Img = styled.img`
    width: 100%;
    height: auto;
`
export const CardImg = ({img, alt}) => {
    return (
        <WrapperImg>
            <Img src={img} alt={alt}/>
        </WrapperImg>
    )
}