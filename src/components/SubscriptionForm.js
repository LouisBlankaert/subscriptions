"use client";

import React, { useState } from "react";

export default function SubscriptionForm({ onAddSubscription }) {
  const [name, setName] = useState(""); // Etat pour le nom de l'abonnement
  const [price, setPrice] = useState(""); // Etat pour le prix de l'abonnement

  // Fonction qui gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de la soumission du formulaire

    // Crée un nouvel objet d'abonnement avec `isActive` par défaut à `true`
    const newSubscription = {
      name,
      price: parseFloat(price), // Le prix est converti en nombre flottant
      isActive: true, // L'abonnement est actif par défaut
    };

    // Appelle la fonction pour ajouter l'abonnement
    onAddSubscription(newSubscription);

    // Réinitialise les champs du formulaire
    setName("");
    setPrice("");
  };

  return (
    <form
      onSubmit={handleSubmit} // Appel handleSubmit lors de la soumission
      className="flex flex-col rounded-lg w-[60%] p-4 border-4 border-red-600 shadow-[0_0_10px_2px_#ff0000] transition-all duration-300 ease-in-out hover:border-red-800 hover:shadow-[0_0_20px_4px_#ff0000]]"
    >
      <h2 className="text-lg flex items-center justify-center font-semibold mb-4 text-white">Add a New Subscription</h2>

      {/* Champ pour le nom */}
      <label className="flex flex-col mb-2 text-white">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Met à jour le nom
          className="mt-1 p-2 border border-gray-300 rounded text-black opacity-50"
        />
      </label>

      {/* Champ pour le prix */}
      <label className="flex flex-col mb-2 text-white">
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)} // Met à jour le prix
          className="mt-1 p-2 border text-black rounded opacity-50"
        />
      </label>

      {/* Bouton de soumission */}
      <div className="flex justify-center">
        <button
            type="submit"
            className="mt-4 w-[20%] bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
            Add Subscription
        </button>
      </div>
    </form>
  );
}
