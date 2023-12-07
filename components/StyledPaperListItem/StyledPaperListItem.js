import styled from "styled-components";

const colorNames=['halpha','hbeta','hgamma','hdelta']
function randomColor() {
    return colorNames[Math.floor(Math.random()*colorNames.length)]
}

const StyledPaperBorder = styled.li`
    width: 350px;
    border: 1px solid rgba(88, 88, 88, 0.926);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding-top: 20px;
    padding:20px 20px 10px;
    &:hover {
        border: 1px solid var(--color-${ ({$borderColor}) =>($borderColor) });
    }
`
export default function StyledPaperListItem({children}) {
    return (
        <StyledPaperBorder $borderColor={randomColor()}>{children}</StyledPaperBorder>
    )
}