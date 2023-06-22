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
  const pickpointAddress = useAppSelector((state: RootState) => state.cart.pickpointAddress);
  const user = useAppSelector((state: RootState) => state.users.users);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // console.log('deliveryState', deliveryState);
  // console.log('selectDeliveryAddress', selectDeliveryAddress);

  function orderEmail(email, name, order) {    
    Email.send({
      SecureToken: 'a3d45322-5353-477e-ae43-06b884d95821',
      To: email,
      From: 'localmarket.elbrus@gmail.com',
      Subject: `Заказ № ${order}`,
      Body: `Уважаемый(ая) ${name}! Благодарим Вас за заказ на нашем сайте! Подробности заказа вы можете посмотреть в личном кабинете.`,
    }).then();
    console.log('ORDER EMAIL');
  }

  function orderSellerEmail(email, name, order) {
    Email.send({
      SecureToken: 'a3d45322-5353-477e-ae43-06b884d95821',
      To: email,
      From: 'localmarket.elbrus@gmail.com',
      Subject: `Заказ № ${order}`,
      Body: `${name}, у Вас новый заказ! Подробности заказа вы можете посмотреть в личном кабинете.`,
    }).then();
    console.log('SELLERS EMAIL');
  }

  function SellersEmailing(sellersArray, order) {
    sellersArray.forEach((seller) => {
      orderSellerEmail(seller.email, seller.name, order);
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(deliveryState){
      const response = await fetch('http://localhost:3001/api/cart/payment', {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        credentials: 'include',
        body: JSON.stringify({selectDeliveryAddress, deliveryState})
      })
    const result = await response.json()
    SellersEmailing(result.sellers, result.orderID);
    orderEmail(user.email, user.name, result.orderID);
    // console.log('result======>', result);

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
    } else {
      const response = await fetch('http://localhost:3001/api/cart/payment', {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        credentials: 'include',
        body: JSON.stringify({deliveryState, pickpointAddress})
      })
    const result = await response.json()
    SellersEmailing(result.sellers, result.orderID);
    orderEmail(user.email, user.name, result.orderID);
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
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className="w-full" disabled={isProcessing || !stripe || !elements} id="submit">
        <div id="button-text">
          {isProcessing ? <p className="mt-4">Платеж в обработке...</p> : <button id="orderBtn" data-userid='{user.id}' type="button" className="mt-6 w-full rounded-md py-1.5 font-medium text-blue-50 bg-[#4520aa] hover:bg-[#4520aa]/80">Оплатить заказ</button>}
        </div>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}