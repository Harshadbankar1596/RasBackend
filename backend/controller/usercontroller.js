import dotenv from 'dotenv';
import Razorpay from 'razorpay';
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

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,       
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// export const BookTicket = async (req, res) => {
//     try {

//         const {TicketName , TicketId , Name  , Phone , TicketQuantity , TotalPrice , TiketPrice} = req.body

//         if(!TicketName || !TicketId || !Name || !Phone || !TicketQuantity || !TotalPrice || !TiketPrice){
//             return res.status(400).json({ message: 'Please fill all fields' });
//         }

//         const ticket = await Tiket.findById(TicketId);

//         if(!ticket){
//             return res.status(404).json({ message: 'Ticket not found' });
//         }

//         if(!TotalPrice === (TicketQuantity * TiketPrice)){
//             res.status(400).json({ message: 'Total Price is not equal to Ticket Quantity * Tiket Price' });
//         }


//         const newBook = new Booktiket({
//             TicketName,
//             TicketId,
//             Name,
//             Phone,
//             TicketQuantity,
//             TotalPrice,
//             TiketPrice,
//         });


//         const option = {
//             amount: TotalPrice * 100,
//             currency: "INR",
//             receipt: Date.now()
//         }

//         const order =  instance.orders.create(option)

//         // await newBook.save();

//         res.status(201).json("Ticket Book Sucssesfully" + order);
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// }


export const BookTicket = async (req, res) => {
  try {
    const { TicketName, TicketId, Name, Phone, TicketQuantity, TotalPrice, TiketPrice } = req.body;

    if (!TicketName || !TicketId || !Name || !Phone || !TicketQuantity || !TotalPrice || !TiketPrice) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const ticket = await Tiket.findById(TicketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (TotalPrice !== TicketQuantity * TiketPrice) {
      return res.status(400).json({ message: 'Total Price is not equal to TicketQuantity * TiketPrice' });
    }

    const options = {
      amount: TotalPrice * 100, 
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await instance.orders.create(options);

    
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};