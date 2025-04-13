import Razorpay from 'razorpay';
import { getSession } from 'next-auth/react';  // Assuming you are using NextAuth for sessions

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,   // Your Razorpay Key ID (from your Razorpay Dashboard)
  key_secret: process.env.KEY_SECRET  // Your Razorpay Key Secret (from your Razorpay Dashboard)
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, username, paymentform } = req.body;

      const orderOptions = {
        amount: amount * 100, // Amount is in paise (100 paise = 1 INR)
        currency: 'INR',
        receipt: `order_rcptid_${new Date().getTime()}`,
        notes: {
          username,
          message: paymentform.message,
        },
      };

      // Create a new order
      const order = await razorpay.orders.create(orderOptions);

      res.status(200).json({
        success: true,
        order_id: order.id,
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
