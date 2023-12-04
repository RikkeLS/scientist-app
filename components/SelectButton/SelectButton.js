import Image from "next/image"
// import './SelectButton.css'

export default function SelectButton({isSelectedInfo,paperID,handleSelectPaperToggle}) {
    const paperInfo = isSelectedInfo?.find(info => info.paperID===paperID)

    return (
    <>
    {/* (paperInfo?.isSelected ?
       ( <Image className="SelectButtonImage" onClick={()=>handleSelectPaperToggle(paperID)} 
    src={'/ticked.svg'}
    alt={'Selected paper'}
    width={20}
    height={20}
    /> )
    :
        (<Image className="SelectButtonImage" onClick={()=>handleSelectPaperToggle(paperID)} 
    src={'/cross.svg'}
    alt={'Deselected paper'}
    width={20}
    height={20}
    />)
    ) */}
    <Image className="SelectButtonImage" onClick={()=>handleSelectPaperToggle(paperID)} 
    src={paperInfo?.isSelected ? '/ticked.svg':'/cross.svg'}
    alt={paperInfo?.isSelected ? 'Deselect paper':'Select paper'}
    width={20}
    height={20}
    />
    {/* /* <button onClick={()=>handleSelectPaperToggle(paperID)}>{paperInfo?.isSelected ? 'Deselect paper':'Select paper'}</button>
   {paperInfo?.isSelected ? <p>paper selected to go in database</p> : <p>paper is not going in the database</p>} */}

    </>
    )
}