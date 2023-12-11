import FavButton from '../FavButton/FavButton'

export default function FilterSetting({isFavFilter,handleFilterSetting}) {
    return (
        <section className="filterSettingContainter">
        Show
            <span className={!isFavFilter ? 'filterSetterAll filterSelectedAll': 'filterSetterAll' }
             onClick={()=>handleFilterSetting('removeFilter')}>ALL</span>
             <span className='filterSetterSeparator'>:</span>
            <span className={isFavFilter ? 'filterSetter filterSelected': 'filterSetter' } 
            onClick={()=>handleFilterSetting('filter')}>{<FavButton/>}</span>
        </section>
    )
}