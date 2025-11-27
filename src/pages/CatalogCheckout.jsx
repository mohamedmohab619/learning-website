import { useParams } from "react-router-dom";
import { useState } from "react";
import courses from "../data/courseData";

export default function CatalogCheckout() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expDate, setExpDate] = useState("");

  const handlePay = () => {
    alert("✅ Payment Successful! You are now enrolled.");
  };

  if (!course)
    return <div className="text-center p-10 text-xl">Course not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <p className="text-gray-600 mt-1">{course.price}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Payment Details</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name on Card"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          maxLength="16"
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="CVC"
            maxLength="4"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="w-1/3 border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
            className="w-2/3 border p-3 rounded-lg"
          />
        </div>
      </div>

      <button
        onClick={handlePay}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
}


