import {Request, Response} from "express";
import candidateModel,{ ICandidate } from "../models/candidateModel";
import {getAllCandidates, addVoteToCandidate, removeVoteFromCandidate,} from "../services/candidateService";
import { AuthRequest } from "../middlewares/authMIdlleware";

export const getCandidates = async (req: Request, res: Response) => {
    try{
        const candidates = await getAllCandidates();
        if(!candidates){
            
            res.status(404).json({message: "No candidates found"});
        }
        res.status(200).json(candidates);
        return;
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
        
    }

}

export const voteToCandidate = async (req: AuthRequest, res: Response) => {
    const candidateId = req.params.id;
    console.log(candidateId);
    
    const userId = req.user?.id; 
    console.log(userId);
    
    
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    try{
        const voteToCandidate = await addVoteToCandidate(candidateId, userId);
        if(!voteToCandidate){
            res.status(404).json({message: "Candidate not found"});
        }
        res.status(200).json({message: "Vote casted successfully"});
        return;
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"})


    }
}

export const removeVote = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id; 
    const candidateId = req.params.id;
    
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    try{
        
        const unvoteToCandidate = await removeVoteFromCandidate( userId, candidateId);
        if(!unvoteToCandidate){
            res.status(404).json({message: "Candidate not found"});
        }
        res.status(200).json({message: "Unvote casted successfully"});
        return;
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"})


    }
}