import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import StyledButton from "../StyledButton/StyledButton";

export default function HighlightForm({getHighlightContent}) {
    const [isSelectPaperRef,setisSelectPaperRef] = useState(false)
    const router = useRouter()
    const currentPageOwner = router.query.userName

    function handleSubmit (event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData)
        getHighlightContent(data)
    }

    function checkCheckBox (event) {
        if (event.target.value) {
            setisSelectPaperRef(true)
        } else {
            setisSelectPaperRef(false)
        }
    }
    const { data:papers, isLoading, error } = useSWR(`/api/${currentPageOwner}/papers`)

    if (isLoading) return (<div> Loading papers... </div>)
    if (error) return ( <div>Error! {error.message}</div>)

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
            <label htmlFor="isPaperRef">Reference one of your papers (optional)</label>
        <input onInput={checkCheckBox} type='checkbox' name='isPaperRef' id='isPaperRef' form='formHighlight'/>
        {isSelectPaperRef ?
        <>
        <label htmlFor="selectPaperHighlight">Choose a paper (optional):</label>
        <select id='selectPaperHighlight' name='paperID' defaultValue='none' form='formHighlight'>
        {papers.map(paper => 
        <option key={paper._id} value={paper._id}>{paper.title}</option>
        )}
        </select>
        </>:''}
            <label htmlFor="refLinkHighlight">Reference link:</label>
            <input id='refLinkHighlight' name='refLink'
            defaultValue='https://www.aanda.org/articles/aa/full_html/2017/10/aa31055-17/aa31055-17.html'
            />
            <label htmlFor="refTextHighlight">Reference text:</label>
            <input id='refTextHighlight' name='refText'
            defaultValue='Herenz et al. 2017, Fig. 11'
            />
            <StyledButton type="submit">Submit</StyledButton>
        </form>
        </>

    )
}