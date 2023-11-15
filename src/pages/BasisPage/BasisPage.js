import {useState} from "react";
import {Outlet, useLocation} from "react-router";
import {FooterSection} from "../../components/FooterSection/FooterSection";
import logo from '../../image/image/logo/logo.png'
import {NavLink} from "react-router-dom";
import styler from './BasisPage.module.css';
import {ButtonGroup, Button} from "@mui/material";
import '../../mainCSS.css';
import {ReactSVG} from "react-svg";
import openMenuIcon from '../../image/image/svg/th-small.svg';
import closedMenuIcon from '../../image/image/svg/th-large.svg';

export const BasisPage = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const location = useLocation();
    return (
        <>
            <header>
                <div>
                    <img src={logo} alt='' width='198' height='48'/>
                </div>
                <div className={isOpenMenu ? styler.navigationOpen : styler.navigation}>
                    <ButtonGroup orientation="vertical" variant="text">
                        <Button component={NavLink} to="/gallery" onClick={() => setIsOpenMenu(false)}>gallery</Button>
                        <Button component={NavLink} to="/calendar" onClick={() => setIsOpenMenu(false)}>calendar</Button>
                        <Button component={NavLink} to='/chat'>chat telegram</Button>
                    </ButtonGroup>
                </div>
                <button className={styler.buttonMenu} onClick={() => setIsOpenMenu(!isOpenMenu)}>
                    <ReactSVG className={styler.iconSVG} src={isOpenMenu ? openMenuIcon : closedMenuIcon}/>
                </button>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                {location.pathname === '/' && <FooterSection/>}
            </footer>
        </>
    )
}
