import WalletInfo from '../WalletInfo';

import { useState } from 'react';
import { StyledContainer, NavItem, NavLinks, NavLink } from './style';

function NavBar(props) {

    const [ currentPath, setCurrentPath ] = useState(false);

    const renderLinks = () => {
        return (
            <NavLinks>
                {props.links.map((link, index) => {
                    return (
                        <NavLink 
                            key={index}
                            onClick={() => setCurrentPath(link.path)}
                            className={currentPath === link.path ? 'active' : ''}
                            to={link.path}
                        >
                            {link.name}
                        </NavLink>
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