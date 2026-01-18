import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: [
            "Project",
            "Blog",
            "Tutorial",
            "Case-Study",
            "Experience"
        ]
    },
    content: { 
        type: String, // Fixed typo: 'types' -> 'type'
        required: true 
    },

}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
