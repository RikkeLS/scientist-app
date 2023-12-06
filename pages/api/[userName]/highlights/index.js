import Highlight from '../../../../db/models/Highlight';
import dbConnect from '../../../../db/dbConnect';
import User from '../../../../db/models/User';


export default async function handler(request, response) {
    await dbConnect();
    const { userName } = request.query;
    if (request.method === 'POST') {
        try {
            const highlight = request.body;
            //--get userID from userName: 
            const userIDs = await User.find({'userName': { $eq: userName }},{_id:1})//
            //--need to only have one, now code is not setup to not allow more than one user:
            const userID = userIDs[userIDs.length-1]
            //-- add userID:
            highlight['userID']=userID

            await Highlight.create(highlight)
            return response.status(201).json({status:'Highlight created'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
}