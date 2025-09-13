import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from "node:crypto";
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

export const BookTicket = async (req, res) => {
  try {
    const { TicketName, TicketId, Name, Phone, TicketQuantity, TiketPrice } = req.body;

    if (!Name || !Phone || !TicketId || !TicketQuantity || !TiketPrice) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const calculatedTotal = Number(TiketPrice) * Number(TicketQuantity);
    const amountInPaise = calculatedTotal * 100;

    if (amountInPaise < 100) {
      return res.status(400).json({
        message: "Total amount must be at least Rs.1",
      });
    }

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { TicketName, TicketQuantity, Name, Phone },
    };

    const order = await instance.orders.create(options);

    // 👇 Save only after payment verification (recommended)
    // const newBook = new Booktiket({
    //   TicketName,
    //   TicketId,
    //   Name,
    //   Phone,
    //   TicketQuantity,
    //   TotalPrice: calculatedTotal,
    //   TiketPrice,
    //   razorpayOrderId: order.id,
    // });
    // await newBook.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, TicketName, TicketId, Name, Phone, TicketQuantity, TiketPrice } = req.body;

    // ✅ Signature verification
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const calculatedTotal = Number(TiketPrice) * Number(TicketQuantity);

    // ✅ Save booking after success
    const newBooking = new Booktiket({
      TicketName,
      TicketId,
      Name,
      Phone,
      TicketQuantity,
      TiketPrice,
      TotalPrice: calculatedTotal,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: "Paid",
    });

    await newBooking.save();

    res.status(200).json({ success: true, message: "Payment verified & booking saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during payment verification" });
  }
};


// export const createorder = async (req, res) => {
//     try {

//         const {TicketId , TicketName , TicketQuantity , TotalPrice , TiketPrice} = req.body;

//         if(!TicketId || !TicketName || !TicketQuantity || !TotalPrice){
//             return res.status(400).json({ message: 'Please fill all fields' });
//         }

//         if(!TotalPrice === (TicketQuantity * TiketPrice)){
//             res.status(400).json({ message: 'Total Price is not equal to Ticket Quantity * Tiket Price' });
//         }

//         const option = {
//             amount : TotalPrice * 100,
//             currency : "INR",
//             TicketName : TicketName,
//             TicketQuantity : TicketQuantity,
//         }
        
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }