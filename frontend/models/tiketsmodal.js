import mongoose from'mongoose';

const TiketSchema = new mongoose.Schema({
    TiketName : { type: String, required: true },
    TiketDesc : { type: String, required: true },
    TiketPrice : { type: Number, required: true },
})

export default mongoose.model('Tiket', TiketSchema);