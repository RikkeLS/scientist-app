import Paper from '../../../db/models/Paper';
import dbConnect from '../../../db/dbConnect';

export default async function handler(request, response) {
    await dbConnect();
    if (request.method === 'POST') {
        try {
            const paper = request.body;
            console.log('paper in backend',paper);
            await Paper.create(paper)
            return response.status(201).json({status:'Paper created'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
}