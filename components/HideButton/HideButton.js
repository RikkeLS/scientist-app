export default function HideButton({isHiddenInfo,paperID,handleHidePaperToggle}) {
    const isHidden = isHiddenInfo?.find(info => info.paperID==paperID)
    console.log('isHiddenInfo:',isHiddenInfo);
    console.log('isHidden clicked paper:',isHidden);
    return (
    <>
    <button onClick={()=>handleHidePaperToggle(paperID)}>Hide paper</button>
    {isHidden ? <p>hidden from other users</p> : <p>shown to other users</p>}

    </>
    )
}