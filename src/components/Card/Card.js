import {CardImgHeader} from "./CardImgHeader/CardImgHeader";
import {CardImg} from "./CardImg/CardImg";
import {CardDescription} from "./CardDescription/CardDescription";
import {useState} from "react";
import logo from '../../image/image/logo/11zon_cropped.png'
import styled from "@emotion/styled";
import {ReactSVG} from "react-svg";
import iconMenuCard from '../../image/image/svg/menuCard.svg'
import bgImgCard from '../../image/image/bgiCard1.jpg'
import {CardMenu} from "./CardMenu/CardMenu";


const CardGeneral = styled.li`
    position: relative;
    background-color: lightpink;
    background-image: url(${bgImgCard});
    border-radius: 20px;
    & + & {
      margin-top: 30px;
    }
`
const ButtonMenuPhoto = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0;
    background: transparent;
  
    &:active {
        background-color: gray;
    }
`
export const Card = ({id, url_photo: urlPhoto, name_photo: namePhoto, date_upload_video: dateUploadPhoto, path}) => {
    const [isOpenCardMenu, setIsOpenCardMenu] = useState(false);
    const [cardId, setCardId] = useState(null);

    return (
        <CardGeneral>
            <CardImgHeader logo={logo} date={dateUploadPhoto} title={namePhoto}>
                {/*children можно вставить компонент*/}
                <ButtonMenuPhoto onClick={() => {
                    setCardId(id)
                    setIsOpenCardMenu(!isOpenCardMenu);
                }}>
                    <ReactSVG src={iconMenuCard}/>
                </ButtonMenuPhoto>
            </CardImgHeader>
            <CardImg img={`${path}${urlPhoto}`} alt={namePhoto}/>
            <CardDescription>
                {/*children можно вставить компонент*/}
                <button>показать</button>
            </CardDescription>
            {cardId === id ? <CardMenu isOpenMenu={isOpenCardMenu}/> : ''}
        </CardGeneral>
    )
}