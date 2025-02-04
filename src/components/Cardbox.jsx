import Card from "./Card.jsx";
import "./Cardbox.css";
import React from "react";
import { useInView } from "react-intersection-observer";

export default function Cardbox({ onCardClick }) { 
  
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const handleCardClick = (cardData) => {
    onCardClick(cardData);
  };

  return (
    <div className="Cardbox" ref={ref}>
      <div className="Cardboxleft">
        <div className={`card ${inView ? 'slideInLeft' : ''}`}>
          <Card 
            image="/assets/Card1.avif"
            title="Track your money"
            content="Connect Your bank account, e-wallets and all your transactions will get automatically imported"
            onClick={() => handleCardClick({ title: "Track your money", content: "Connect Your bank account, e-wallets and all your transactions will get automatically imported" })}
          />
        </div>
        <br />
        <div className={`card ${inView ? 'slideInLeft' : ''}`}>
          <Card
            image="/assets/Card2.avif"
            title="Quick Overview"
            content="Get an overview of your spending habits, with a simple and easy to understand UI"
            onClick={() => handleCardClick({ title: "Quick Overview", content: "Get an overview of your spending habits, with a simple and easy to understand UI" })}
          />
        </div>
        <br />
        <div className={`card ${inView ? 'slideInLeft' : ''}`}>
          <Card
            image="/assets/Card3.png"
            title="Smart Budgets"
            content="Make your budgets, get notified when you overspend in a given category"
            onClick={() => handleCardClick({ title: "Smart Budgets", content: "Make your budgets, get notified when you overspend in a given category" })}
          />
        </div>
      </div>

      <div className="Cardboxright">
        <div className={`card ${inView ? 'slideInLeft' : ''}`}>
          <Card
            image="/assets/Card4.avif"
            title="Manage your loans"
            content="Taken too many student credit cards? Manage your loans on the go within our app"
            onClick={() => handleCardClick({ title: "Manage your loans", content: "Taken too many student credit cards? Manage your loans on the go within our app" })}
          />
        </div>
        <br />
        <div className={`card ${inView ? 'slideInLeft' : ''}`}>
          <Card
            image="/assets/Card5.avif"
            title="Your savings E-wallet"
            content="Save a minimal amount of money every day in our savings e-wallet. Your money is safe, withdraw seamlessly anytime"
            onClick={() => handleCardClick({ title: "Your savings E-wallet", content: "Save a minimal amount of money every day in our savings e-wallet. Your money is safe, withdraw seamlessly anytime" })}
          />
        </div>
        <br />
      </div>
    </div>
  );
}
