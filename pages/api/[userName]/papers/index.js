import dbConnect from '../../../../db/dbConnect';
import Paper from "../../../../db/models/Paper";
import User from "../../../../db/models/User";


export default async function handler(request, response) {
    const { userName } = request.query;
    await dbConnect();
    //--get userID from username: 
    const userIDs = await User.find({'userName': { $eq: userName }},{_id:1})
    //--need to only have one, now code is not setup to not allow more than one user:
    const userID = userIDs[userIDs.length-1]
    if (request.method==='GET') {
        const papers = await Paper.find({'userID': { $eq: userID }})
        
        if (!papers) {
            response.status(404).json({ status: "Found no papers" });
        }
        return response.status(200).json(papers)
    }
}