import Paper from '../../db/models/Paper'
import dbConnect from '../../db/dbConnect';
import User from '../../db/models/User';

export default async function handler(request, response) {
    await dbConnect();
    if (request.method === 'POST') {
        try {
            const [papers,userName] = request.body;
            //--get userID from username: 
            const userIDs = await User.find({'userName': { $eq: userName }},{_id:1})//
            //-- check if paper is already in db for user:
            // for (const paper in papers) {
                // const savedPaperWithPaperID = await Paper.find({id:paper.id})
                // console.log('paper',papers[paper]);
            // }
            // 
            //--need to only have one, now code is not setup to not allow more than one user:
            const userID = userIDs[userIDs.length-1]
            //-- add userID to all papers:
            const papersWithUserID = papers.map(paper => ({...paper,'userID':userID._id}))

            await Paper.create(papersWithUserID)
            return response.status(201).json({status:'Paper created'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
}