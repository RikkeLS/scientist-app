import Paper from '../../db/models/Paper'
import dbConnect from '../../db/dbConnect';

export default async function handler(request, response) {
    await dbConnect();
    if (request.method === 'POST') {
        try {
            const papers = request.body;
            // check if paper is already in db:
            for (const paper in papers) {
                // const savedPaperWithPaperID = await Paper.find({id:paper.id})
                // console.log('paper',papers[paper]);
            }
            
            await Paper.create(papers[4])
            return response.status(201).json({status:'Paper created'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
}