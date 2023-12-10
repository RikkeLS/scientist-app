import Highlight from '../../../../db/models/Highlight';
import dbConnect from '../../../../db/dbConnect';
import User from '../../../../db/models/User';


export default async function handler(request, response) {
    await dbConnect();
    const { userName } = request.query;
    //--get userID from userName: 
    const userIDs = await User.find({'userName': { $eq: userName }},{_id:1})//
    //--need to only have one, now code is not setup to not allow more than one user:
    const userID = userIDs[userIDs.length-1]
    if (request.method === 'GET') {
        const highlights = await Highlight.find({'userID': { $eq: userID }})
        if (!highlights) {
            response.status(404).json({ status: `Found no highlights for ${userName}`});
        }
        return response.status(200).json(highlights)
    }
    if (request.method === 'POST') {
        try {
            const highlight = request.body;

            //-- add userID:
            highlight['userID']=userID

            await Highlight.create(highlight)
            return response.status(201).json({status:'Highlight created'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
    if (request.method==='PATCH') {
        try {
            const favChangeInfo = request.body;
            const highlightToUpdate = await Highlight.findById(favChangeInfo.highlightID)
            
            await Highlight.findByIdAndUpdate(favChangeInfo.highlightID,{
                $set: {favCount:highlightToUpdate.favCount+favChangeInfo.favChange}
            })
            return response.status(201).json({status:'Highlight favCount updated'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
    if (request.method === 'DELETE') {
        try {
            const highlightID = request.body;
            console.log('id',highlightID);
            await Highlight.findByIdAndDelete(highlightID)
            return response.status(201).json({status:'Highlight deleted'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
    
}