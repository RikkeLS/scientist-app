import styled from "styled-components"

const StyledArrow = styled.button`
    font-size: large;
    border:1px solid white;
    border-radius: 50%;
    background-color:white;
    border-width: 0;
    width: 10px;
    color:${({$color}) =>($color)};
    background-color:${({$color}) =>($color)} ;
&:hover {
    color:var(--color-hbeta);
    color:${({$color}) =>($color)};
}
`
const StyledArrowSection = styled.section`
    display: flex;
`

export default function ArrowsToChangePosition ({handleChangePosition,entryID,numberOfEntries,rowNumber}) {
    return (
    <StyledArrowSection>
        <>
        <StyledArrow 
        disabled={(rowNumber===1) && true} 
        $color={(rowNumber===1) && 'white'} 
        onClick={()=>handleChangePosition(entryID,'up')}>&uarr;</StyledArrow>
        <StyledArrow 
        disabled={(rowNumber===numberOfEntries) && true} 
        $color={(rowNumber===numberOfEntries) && 'white'} 
        onClick={()=>handleChangePosition(entryID,'down')}>&darr;</StyledArrow>
        </>

    </StyledArrowSection>
    )
}