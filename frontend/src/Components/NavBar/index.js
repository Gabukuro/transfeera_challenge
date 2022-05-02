import WalletInfo from '../WalletInfo';

import { useState } from 'react';
import { StyledContainer, NavItem, NavLinks, NavLink } from './style';
import { Link } from "react-router-dom";

function NavBar(props) {

    const [currentPath, setCurrentPath] = useState(false);

    const renderLinks = () => {
        return (
            <NavLinks>
                {props.links.map((link, index) => {
                    return (
                        <Link to={link.path} key={index}>
                            <NavLink
                                key={index}
                                onClick={() => setCurrentPath(link.path)}
                                className={currentPath === link.path ? 'active' : ''}
                            >
                                {link.name}
                            </NavLink>
                        </Link>
                    )
                })}
            </NavLinks>
        )
    }

    return (
        <StyledContainer maxWidth={false}>
            <NavItem> {props.links && renderLinks()} </NavItem>
            <NavItem> <WalletInfo /> </NavItem>
        </StyledContainer>
    );
}

export default NavBar;