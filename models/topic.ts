import mongoose, {Schema} from "mongoose"

const TopicSchema = new Schema({
    title: String,
    description: String
}, {timestamps: true})

const topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema)
export default topic