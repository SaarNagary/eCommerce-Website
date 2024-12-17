/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/*import { onRequest } from "firebase-functions/v2/https"; // שימוש ב-import במקום require
import express from "express"; // שימוש ב-import במקום require
import cors from "cors"; // שימוש ב-import במקום require


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('*', (req, res) => {
  res.status(404).send('404 Not Found.');
});

export const api = onRequest(app);*/ // שימוש ב-export במקום module.exports

import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const paypalSecretKey = functions.config().paypal.secret_key;

app.post('/payments/create', async (req, res) => {
  try {
    const { amount, shipping } = req.body; // קבלת הנתונים מהלקוח
    const response = await axios.post('https://api.paypal.com/v1/payments/payment', {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      transactions: [
        {
          amount: {
            total: amount, // הסכום שיתבצע בפועל
            currency: "USD"
          },
          item_list: {
            shipping_address: shipping.address,
          }
        }
      ],
      redirect_urls: {
        return_url: "https://www.yoursite.com/payment-success",
        cancel_url: "https://www.yoursite.com/payment-cancel"
      }
    }, {
      headers: {
        'Authorization': `Bearer ${paypalSecretKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send(response.data); // שלח חזרה ללקוח את המידע על התשלום
  } catch (error) {
    console.error("Error making PayPal payment:", error);
    res.status(500).send('Payment processing failed');
  }
});

app.get('*', (req, res) => {
  res.status(404).send('404 Not Found.');
});

export const api = onRequest(app);
