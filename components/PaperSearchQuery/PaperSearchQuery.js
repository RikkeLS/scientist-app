export default function PaperSearchQuery ({onSearch}) {

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        onSearch(data)
        event.target.reset()
    }

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor="author">Author</label>
            <input id='author' name='author'></input>
            <button type="submit">Search by author</button>
        </form>
    )
}