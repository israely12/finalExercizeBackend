import mongoose, {Schema, Document} from "mongoose";


export interface ICandidate extends Document {

    name: string;
    image: string;
    votes: number;

};

const candidateSchema = new Schema<ICandidate>({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    votes: {
        type: Number,
        required: true,
        trim: true,
        min: 0
    }
});

export default mongoose.model<ICandidate>("candidates", candidateSchema);



