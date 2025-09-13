import mongoose from 'mongoose';
import validator from 'validator';

const BookTicketsSchema = new mongoose.Schema({
    TicketName: {
        type: String,
        required: true,
        trim: true
    },

    TicketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tiket',
        required: true
    },

    Name: {
        type: String,
        required: true,
        trim: true
    },

    Phone: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isMobilePhone(value, 'any'); // checks valid phone format
            },
            message: "Invalid phone number"
        }
    },

    TicketQuantity: {
        type: Number,
        required: true,
        min: [1, "At least 1 ticket must be booked"]
    },
    TotalPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0; // checks if price is not negative
            },
            message: "Price must be a positive number"
        }
    },
    TiketPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0; // checks if price is not negative
            },
            message: "Price must be a positive number"
        }
    },
},{timestamps : true});

export default mongoose.model("BookTicket", BookTicketsSchema);