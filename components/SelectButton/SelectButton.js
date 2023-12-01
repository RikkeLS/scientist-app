export default function SelectButton({isSelectedInfo,paperID,handleSelectPaperToggle}) {
    const paperInfo = isSelectedInfo?.find(info => info.paperID===paperID)

    return (
    <>
    <button onClick={()=>handleSelectPaperToggle(paperID)}>{paperInfo?.isSelected ? 'Deselect paper':'Select paper'}</button>
    {paperInfo?.isSelected ? <p>paper selected to go in database</p> : <p>paper is not going in the database</p>}

    </>
    )
}