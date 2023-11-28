import useSWR from "swr";
// let Parser = require('rss-parser');
// let parser = new Parser();

export default function PublicationsPage () {
    // const URL = "https://example-apis.vercel.app/api/art";// api which works
    
    const URL = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10';
    
    
    //---- Parser :
    // (async () => {

    //     let feed = await parser.parseURL(URL);
    //     console.log(feed.title);
      
    //     feed.items.forEach(item => {
    //       console.log(item.title + ':' + item.link)
    //     });
      
    //   })();

    //--- arXiv-api Wrapper:
    //parameters:
    const prefix = 'au'// for author: https://info.arxiv.org/help/api/user-manual.html#51-details-of-query-construction
    const arxiv = require('arxiv-api');
    const authorName = 'saust';

    // (async () => {
    // const papers = await arxiv.search({
    //     searchQueryParams: [
    //         {
    //             include: [{name: authorName,prefix:prefix}]
    //         },
    //     ],
    //     start: 0,
    //     maxResults: 10,
    //         });
    //         console.log(papers);
    //   })();
    async function getPapers() {
        const papers = await arxiv.search({
            searchQueryParams: [
                {
                    include: [{name: authorName,prefix:prefix}]
                },
            ],
            start: 0,
            maxResults: 10,
                });
                console.log(papers);
        return papers
          };
    const papers = getPapers()

    if (!papers.result) return
    if (papers.result) {
        
        console.log(papers.result);
    }
    // });
	// 		include: [{name:'Saust'}, {name:'au'}]




    


        // async function fetchData() {
        //     fetch(URL, {
        //         method:"GET",
        //         headers: {
        //             'Content-Type': 'text/plain',
        //         },
        //         body: data
        //     }
        //     );
        // } 
        // fetchData()

        // const {data, isLoading, error,isValidating} = useSWR(URL)
        
        // console.log('isValidating:',isValidating);
        // if (isLoading) return <h1>loading data from arXiv</h1>
        // if (error) return console.log('error',error);

        // const dataText =  await data.getContentText()
        // console.log(data);
        // console.log(dataText);
        

    
    return (
        <>
        <h1>List of Publications</h1>
        <ul>
            <li>List item</li>
        </ul>

        </>
    );
};