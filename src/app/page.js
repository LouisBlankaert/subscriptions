"use client";

import React, { useState, useEffect } from "react";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionCard from "@/components/SubscriptionCard";

export default function Home() {
  const [subscriptions, setSubscriptions] = useState([]);

  // Récupère les abonnements depuis le backend Flask
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("https://subscriptions-backend.onrender.com/subscriptions");
        const data = await response.json();
        console.log("API Response:", data); // Vérifie ici ce que retourne l'API
        setSubscriptions(data.subscriptions || []); // Utilise une valeur par défaut si la clé n'existe pas
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };
  
    fetchSubscriptions();
  }, []);

  // Ajoute un nouvel abonnement
  const handleAddSubscription = async (newSubscription) => {
    try {
      const response = await fetch("https://subscriptions-backend.onrender.com/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubscription),
      });
      const data = await response.json();

      if (response.ok) {
        setSubscriptions((prevSubscriptions) => [
          ...prevSubscriptions,
          { ...newSubscription, id: data.subscription.id, logoUrl: data.subscription.logoUrl },
        ]);
      } else {
        console.error("Error adding subscription:", data.message);
      }
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  // Supprime un abonnement
  const handleDeleteSubscription = async (id) => {
    try {
      const response = await fetch(`https://subscriptions-backend.onrender.com/subscriptions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.filter((subscription) => subscription.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center p-4" style={{ backgroundImage: "url('/images/black_background.jpg')" }}>
      <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">Manage Subscriptions</h1>

      {/* Formulaire pour ajouter un abonnement */}
      <SubscriptionForm
        onAddSubscription={handleAddSubscription}
      />

      {/* Liste des abonnements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id} // Utilisez l'ID comme clé unique
            subscription={subscription}
            onDelete={handleDeleteSubscription}
          />
        ))}
      </div>
    </div>
</div>

  );
}
