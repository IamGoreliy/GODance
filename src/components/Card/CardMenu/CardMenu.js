/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from '@emotion/react';
import deleteIcon from '../../../image/image/svg/deleteIcon.svg';
import editIcon from '../../../image/image/svg/editIcon.svg';
import shareIcon from '../../../image/image/svg/shareV5.svg';
import {ReactSVG} from "react-svg";

// const GeneralCardMenu = styled.div`;
//   position: absolute;
//   width: 250px;
//   height: 200px;
//   border: 1px solid black;
//   border-radius: 10px;
//   top: 80px;
//   right: 20px;
//   background-color: rgba(0, 0, 0, 0.8);
// `

// const styleDivOpen = css({
//     position: 'absolute',
//     width: '250px',
//     height: '200px',
//     border: '1px solid black',
//     borderRadius: '10px',
//     top: '80px',
//     right: '20px',
//     scale: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
// })
// const styleDivClose = css({
//     position: 'absolute',
//     width: '250px',
//     height: '200px',
//     border: '1px solid black',
//     borderRadius: '10px',
//     top: '80px',
//     right: '20px',
//     scale: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
// })

const GeneralCardMenu = ({isOpen, children}) => {
    return (
        <div
            css={{
                position: 'absolute',
                width: '250px',
                height: '200px',
                border: '1px solid black',
                borderRadius: '10px',
                top: '80px',
                right: '20px',
                scale: isOpen ? 1 : 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transition: '250ms scale linear',
            }}>
            {children}
        </div>
    )
}

const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 10px;
    align-items: end;

`
const ListBtn = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: papayawhip;
    border-radius: 50%;
    & + & {
      margin-top: 10px;
    }
`
export const CardMenu = ({isOpenMenu}) => {
    return (
        // <div css={isOpenMenu ? styleDivOpen : styleDivClose}>
          <GeneralCardMenu isOpen={isOpenMenu}>
              <List>
                  <ListBtn><ReactSVG src={editIcon}/></ListBtn>
                  <ListBtn><ReactSVG src={shareIcon}/></ListBtn>
                  <ListBtn><ReactSVG src={deleteIcon}/></ListBtn>
              </List>
          </GeneralCardMenu>
        // </div>
    )
}