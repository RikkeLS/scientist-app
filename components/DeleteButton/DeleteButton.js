import styled from "styled-components"

const StyledDeleteButton = styled.span`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: x-large;
    &:hover {
        color: var(--color-halpha);
    }
`

export default function DeleteButton ({handleDelete,ID}) {
    return (
        <StyledDeleteButton onClick={()=>handleDelete(ID)}>x</StyledDeleteButton>
        )

}