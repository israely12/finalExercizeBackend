import { Router } from "express";
import { getCandidates, voteToCandidate, removeVote } from "../controllers/candidateController";
import { authMiddleware, isAdminMiddleware } from "../middlewares/authMIdlleware";

const candidateRouter = Router();

candidateRouter.put("/votes/:id",authMiddleware,voteToCandidate);
candidateRouter.put("/unvotes/:id",authMiddleware,removeVote);
candidateRouter.get("/",getCandidates);


export default candidateRouter
