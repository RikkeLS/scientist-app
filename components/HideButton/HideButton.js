export default function HideButton({isHiddenInfo,paperID,handleHidePaperToggle}) {
    const paperInfo = isHiddenInfo?.find(info => info.paperID===paperID)

    return (
    <>
    <button onClick={()=>handleHidePaperToggle(paperID)}>{paperInfo?.isHidden ? 'Show paper':'Hide paper'}</button>
    {paperInfo?.isHidden ? <p>hidden from other users</p> : <p>shown to other users</p>}

    </>
    )
}