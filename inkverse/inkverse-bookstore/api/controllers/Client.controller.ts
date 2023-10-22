import { Request, Response } from "express";
import Client from "./../models/Client";

export const getClientOrderHistory = async (req: Request, res: Response) => {
    try {
        const clientId = req.params.clientId;
        const client = await Client.findById(clientId).populate("orderHistory");

        if (!client) {
            return res.status(404).json({ message: "Client Not Found" });
        }
        res.status(200).json({ orderHistory: client.orderHistory });
    } catch (error) {
        res.status(500).json({ error });
    }
};
