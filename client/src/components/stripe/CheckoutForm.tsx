import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { IDeliveryState } from "./typesStripe";
import { useAppSelector } from "../../redux/store/hooks";
import { RootState } from "../../redux/store/store";

export default function CheckoutForm({deliveryState}: IDeliveryState) {
  const stripe = useStripe();
  const elements = useElements();
  const selectDeliveryAddress = useAppSelector((state: RootState) => state.cart.deliveryAddress)
  console.log('deliveryState', deliveryState);
  console.log('selectDeliveryAddress', selectDeliveryAddress);

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/cart/payment', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include',
      body: JSON.stringify({selectDeliveryAddress, deliveryState})
    })
    const result = await response.json()
    console.log('result======>', result);

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className="w-full" disabled={isProcessing || !stripe || !elements} id="submit">
        <div id="button-text">
          {isProcessing ? "Платеж в обработке... " : <button id="orderBtn" data-userid='{user.id}' type="button" className="mt-6 w-full rounded-md py-1.5 font-medium text-blue-50 bg-[#4520aa] hover:bg-[#4520aa]/80">Оплатить заказ</button>}
        </div>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}