import Razorpay from "razorpay";
import { CONFIG } from "../config/config";

const razorpay = new Razorpay({
    key_id:CONFIG.RAZORPAY_ID,
    key_secret:CONFIG.RAZORPAY_SECRET,
})

export const createOrder = async ({amount,currency='INR'}) => {
    const options = {
        amount:amount*100,
        currency:currency,
    }

    const order = await razorpay.orders.create(options)
}