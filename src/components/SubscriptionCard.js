"use client";

import React from "react";

export default function SubscriptionCard({ subscription, onDelete }) {
  const handleDelete = () => {
    onDelete(subscription.id);
  };

  return (
    <div className="p-4 bg-transparent rounded-lg flex flex-col items-center text-white border-4 border-red-600 shadow-[0_0_10px_2px_#ff0000] transition-all duration-300 ease-in-out hover:border-red-800 hover:shadow-[0_0_20px_4px_#ff0000]]">
      {/* Logo de l'abonnement */}
      {subscription.logoUrl && (
        <img
          src={subscription.logoUrl}
          alt={`${subscription.name} logo`}
          className="w-16 h-16 mb-4"
        />
      )}

      {/* Nom de l'abonnement */}
      <h3 className="text-lg font-semibold uppercase">{subscription.name}</h3>

      {/* Prix mensuel */}
      <p>
        <strong>Price:</strong> {subscription.price} €/month
      </p>

      {/* Bouton de suppression */}
      <button
        onClick={handleDelete} // Appel de la fonction de suppression
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
