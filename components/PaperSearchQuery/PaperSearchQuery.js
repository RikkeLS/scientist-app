import StyledButton from "../StyledButton/StyledButton"

export default function PaperSearchQuery ({onSearch}) {

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        onSearch(data)
        event.target.reset()
    }

    return (
        <form className="paperSearchForm" onSubmit={handleSubmit} >
            <label htmlFor="author">Author:</label>
            <input id='author' name='author'></input>
            <StyledButton type="submit">Search by author</StyledButton>
        </form>
    )
}