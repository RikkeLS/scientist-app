export default function FilterSetting({isFavFilter,handleFilterSetting}) {
    return (
        <section className="filterSettingContainter">
            <span disabled={!isFavFilter && true} onClick={()=>handleFilterSetting()} className="turnFavFilter off">Show all</span>
            <span  disabled={isFavFilter && true} onClick={()=>handleFilterSetting()} className="turnFavFilter on">Show favs</span>
        </section>
    )
}