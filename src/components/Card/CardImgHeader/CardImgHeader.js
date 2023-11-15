import styled from "@emotion/styled";

const GeneralSection = styled.div`
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const Logo = styled.img`
    width: 50px;
    height: 50px;
`
const TitleWrapper = styled.div`
`
const Title = styled.h2`
    font-size: 18px;
    margin: 0;
`
const SubTitle = styled.h3`
    font-size: 12px;
    margin: 0;
`
export const CardImgHeader = ({logo, title, date, children}) => {
    return (
        <GeneralSection>
            <Logo src={logo} alt='значек админа'/>
            <TitleWrapper>
                <Title>{title}</Title>
                <SubTitle>{date}</SubTitle>
            </TitleWrapper>
            {children}
        </GeneralSection>
    )
}