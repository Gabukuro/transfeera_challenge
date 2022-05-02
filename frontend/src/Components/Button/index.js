const { StyledButton } = require('./style');

function Component(props) {

    const variantTypes = {
        delete: 'contained',
        save: 'contained',
        cancel: 'outlined'
    }

    return (
        <StyledButton 
            variant={variantTypes[props.type]}
            className={props.type}
            onClick={props.onClick}
        >{props.children}</StyledButton>
    );
}

export default Component;