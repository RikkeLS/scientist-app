import styled from "styled-components";

const colorNames=['halpha','hbeta','hgamma','hdelta']
function randomColor() {
    return colorNames[Math.floor(Math.random()*colorNames.length)]
}
const TpcolorNames=['halpha-tp','hbeta-tp','hgamma-tp','hdelta-tp']
function randomTPColor() {
    return TpcolorNames[Math.floor(Math.random()*TpcolorNames.length)]
}

const StyledButtonType = styled.button`
    text-transform: capitalize;
    background-color:var(--color-buttons);
    border: 1px solid gray;
    padding:5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 3px;
    margin: 10px;
    max-height: 30px;
    max-width: 120px;
    align-self: center;

    &:hover {
        border: 1px solid var(--color-${({$borderColor}) =>($borderColor)} );
        /* background-color:var(--color-${({$bgcolor}) =>($bgcolor)} ); */
    }
`
export default function StyledButton({children,onClick}) {
    return (
        <StyledButtonType onClick={onClick} $borderColor={randomColor()}>{children}</StyledButtonType>
    )
}