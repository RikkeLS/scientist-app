export default function FavButton ({content,favInfo, handleToggleFav}) {
    const stroke = "#000000"
    const strokeWidth = 0.5 //"1.5"
    //for just the image with the fav color:
    const sizeOfFavFilterIcon = '30px'
    if (content===undefined) {
        return (
            <div className="highlight_favIconContainerForFilter">
            <svg width={sizeOfFavFilterIcon} height={sizeOfFavFilterIcon} viewBox="0 0 24 24" id="star_filled" data-name="star filled" xmlns="http://www.w3.org/2000/svg">
                <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" fill="none"/>
                <path className={`highlight_favIcon isFav`} id="Star" d="M10,15,4.122,18.09l1.123-6.545L.489,6.91l6.572-.955L10,0l2.939,5.955,6.572.955-4.755,4.635,1.123,6.545Z"
                transform="translate(2 3)" stroke={stroke} strokeWidth={strokeWidth}/>
            </svg>
            </div>
        )
    }
    const favInfoForID = favInfo?.find(info =>info.highlightID===content._id)
    const isFav = favInfoForID?.isFav

    return (
        <>
        {content._id ?
        <div className="highlight_favIconContainer">
        <svg  onClick={()=>handleToggleFav(content._id)} width="50px" height="50px" viewBox="0 0 24 24" id="star_filled" data-name="star filled" xmlns="http://www.w3.org/2000/svg">
            <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" fill="none"/>
            <path className={`highlight_favIcon ${isFav ? 'isFav' : ''}`} id="Star" d="M10,15,4.122,18.09l1.123-6.545L.489,6.91l6.572-.955L10,0l2.939,5.955,6.572.955-4.755,4.635,1.123,6.545Z"
            transform="translate(2 3)" stroke={stroke} strokeWidth={strokeWidth}/>
        </svg>
        </div>
        : '' }
        </>
    )

}