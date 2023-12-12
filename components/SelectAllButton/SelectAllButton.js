import StyledButton from "../StyledButton/StyledButton";

export default function SelectAllButton({action,onClick}) {
    return (
        // <span onClick={()=>onClick()} className={`selectAllPapersButton ${action}`}> {action} all</span>
        <StyledButton onClick={()=>onClick()}> {action} all </StyledButton>
        )
}