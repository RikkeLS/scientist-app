import User from '../../db/models/User'
import dbConnect from '../../db/dbConnect';
import { log } from 'console';

export default async function handler(request, response) {
    await dbConnect();
    if (request.method === 'POST') {
        try {
            const user = request.body;
            await User.create(user)
            return response.status(201).json({status:'User created'})
        } catch (error){
            return response.status(400).json({error:error.message})
        }
    }
}