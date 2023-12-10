import ProfileEntry from '../../../../db/models/ProfileEntry';
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
        const entries = await ProfileEntry.find({'userID': { $eq: userID }})
        if (!entries) {
            response.status(404).json({ status: `Found no highlights for ${userName}`});
        }
        return response.status(200).json(entries)
    }
    if (request.method === 'POST') {
        try {
            const entry = request.body;

            //-- add userID to entry:
            entry['userID']=userID
            await ProfileEntry.create(entry)
            return response.status(201).json({status:'Profile entry created'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
    if (request.method==='PATCH') {
        try {
            const newRowInfo = request.body;
            const entryToUpdate = await ProfileEntry.findById(newRowInfo.entryID)
            const entryToSwitchWith = await ProfileEntry.findOne({
                rowNumber:entryToUpdate.rowNumber+newRowInfo.rowChange})
                
            await ProfileEntry.findByIdAndUpdate(newRowInfo.entryID,{
                $set: {rowNumber:entryToUpdate.rowNumber+newRowInfo.rowChange}
            })
            await ProfileEntry.findByIdAndUpdate(entryToSwitchWith._id,{
                $set: {rowNumber:entryToUpdate.rowNumber}
            })
            return response.status(201).json({status:'Highlight favCount updated'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
}