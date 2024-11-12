import candidateModel,{ ICandidate } from "../models/candidateModel";
import userModel, { IUser } from "../models/userModel";
import { Types } from "mongoose";

export const getAllCandidates = async (): Promise<ICandidate[]> => {
    const candidates = await candidateModel.find({});
    return candidates;
};


export const addVoteToCandidate = async (candidateId: string, userId: string): Promise<ICandidate | null> => {
    const candidate = await candidateModel.findById(candidateId);
    const user = await userModel.findById(userId);
    if (!candidate) {
        throw new Error("Candidate not found");
    }
    else if (!user) {
        throw new Error("User not found");
    }
    else if (user.hasVoted) {
        throw new Error("User has already voted");
    }
    candidate.votes += 1;
    user.hasVoted = true;
    user.votedFor = new Types.ObjectId(candidateId);
    await candidate.save();
    await user.save();
    return candidate;
};

export const removeVoteFromCandidate = async (userId: string, candidateId: string): Promise<ICandidate | null> => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    if (user.votedFor?.toString() !== candidateId) {
        throw new Error("User has not voted for this candidate");
    }

    const candidate = await candidateModel.findById(candidateId);
    if (!candidate) {
        throw new Error("Candidate not found");
    }

    candidate.votes -= 1;
    user.hasVoted = false;
    user.votedFor = null;

    await candidate.save();
    await user.save();

    return candidate;
};