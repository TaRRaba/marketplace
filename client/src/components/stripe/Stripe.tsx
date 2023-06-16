import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
// import './stripe.css';

export default function Stripe() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState();

     useEffect(() => {
        fetch("http://localhost:3001/config", {
            method: "GET",
            credentials: 'include',
        }).then(async (r)=> {
            const { publishableKey } = await r.json();

            setStripePromise(loadStripe(publishableKey))
        })
    }, [])

    useEffect(() => {
        fetch("http://localhost:3001/create-payment-internet", {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            credentials: 'include',
            body: JSON.stringify({id: 1})
        }).then(async (r)=> {
            const { clientSecret } = await r.json();
            
            setClientSecret(clientSecret)
        })
    }, [])

  return (
    <>
    {stripePromise && clientSecret && (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
    <CheckoutForm />
    </Elements>
    )}
    </>
  )
}
