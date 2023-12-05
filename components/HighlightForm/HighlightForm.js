export default function HighlightForm({getHighlightContent}) {

    function handleSubmit (event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData)
        getHighlightContent(data)
    }

    return (
        <>
        <legend htmlFor='formHighlight'></legend>
        <form onSubmit={handleSubmit} id='formHighlight'>
            <label htmlFor='titleHighlight'>Title:</label>
            <input type='text' id='titleHighlight' name='title'
                defaultValue={'The MUSE-Wide survey: A first catalogue of 831 emission line galaxies'}
            />
            <label htmlFor='mainTextHighlight'>Text:</label>
            <textarea 
            id='mainTextHighlight' 
            name='mainText' 
            rows="10" 
            cols="50"
            defaultValue={'Histograms showing the redshift distribution of the 831 emission line selected galaxies from the first year of MUSE-Wide observations. Redshifts with confidence values 3, 2, and 1 are shown in dark grey, grey, and light grey, respectively. Left panel: redshift distribution for the rest-frame optical emission line selected galaxies. Horizontal bars indicate the redshift range of the MUSE wavelength coverage for the strongest emission lines of star-forming galaxies. The bin size is Δz = 0.1. Right panel: redshift distribution for the 238 high-z galaxies. The bin size is Δz = 0.2.'}
            ></textarea>
            <label htmlFor="imageURLHighlight">Image URL:</label>
            <input id="imageURLHighlight" name='imageURL'
                defaultValue='https://www.aanda.org/articles/aa/full_html/2017/10/aa31055-17/aa31055-17-fig11.jpg'
            />
            <label htmlFor="refLinkHighlight">Reference link:</label>
            <input id='refLinkHighlight' name='refLink'
            defaultValue='https://www.aanda.org/articles/aa/full_html/2017/10/aa31055-17/aa31055-17.html'
            />
            <label htmlFor="refTextHighlight">Reference text:</label>
            <input id='refTextHighlight' name='refText'
            defaultValue='Herenz et al. 2017, Fig. 11'
            />
            <button type="submit">Submit</button>
        </form>
        </>

    )
}