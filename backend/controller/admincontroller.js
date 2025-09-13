import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import Tiket from '../models/tiketsmodal.js';

export const addTiket = async (req, res) => {
    try {
        console.log(req.body);
        const {TiketName, TiketDesc, TiketPrice} = req.body;

        if(!TiketName ||!TiketDesc ||!TiketPrice) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTiket = new Tiket({
            TiketName,
            TiketDesc,
            TiketPrice
        });

        await newTiket.save();

        res.status(201).json(newTiket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTikets = async (req, res) => {
    try {
        const tikets = await Tiket.find();
        if(!tikets) {
            return res.status(404).json({ message: 'No tikets found' });
        }
        res.status(200).json(tikets);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateTiket = async (req, res) => {
    try {

        const {TiketId , TiketName, TiketDesc, TiketPrice } = req.body;
        if(!TiketId ||!TiketName ||!TiketDesc ||!TiketPrice) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const updatedTiket = await Tiket.findByIdAndUpdate(
            TiketId,
            {
                TiketName,
                TiketDesc,
                TiketPrice
            },
            { new: true }
        );

        if(!updatedTiket) {
            return res.status(404).json({ message: 'Tiket not found' });
        }

        res.status(200).json(updatedTiket);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}