import dbConnect from '../../../../db/dbConnect';
import User from "../../../../db/models/User";


export default async function handler(request, response) {
    const { userName } = request.query;
    await dbConnect();
    if (request.method==='GET') {
        const users = await User.find({'userName': { $eq: userName }})
        const user = users[users.length-1]
        if (!users) {
            response.status(404).json({ status: "Found no papers" });
        }
        return response.status(200).json(user)
    }
}