import dotenv from 'dotenv';

dotenv.config();

import Tiket from '../models/tiketsmodal.js';

import Booktiket from '../models/booktiketmodal.js';

export const getallTikets = async (req, res) => {
    try {

        const tikets = await Tiket.find();

        if(!tikets){
            return res.status(404).json({ message: 'No tikets found' });
        }

        res.status(200).json(tikets);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const BookTicket = async (req, res) => {
    try {

        const {TicketName , TicketId , Name  , Phone , TicketQuantity} = req.body

        if(!TicketName || !TicketId || !Name || !Phone || !TicketQuantity){
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const ticket = await Tiket.findById(TicketId);

        if(!ticket){
            return res.status(404).json({ message: 'Ticket not found' });
        }


        const newBook = new Booktiket({
            TicketName,
            TicketId,
            Name,
            Phone,
            TicketQuantity
        });

        await newBook.save();

        res.status(201).json("Ticket Book Sucssesfully" , newBook);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}