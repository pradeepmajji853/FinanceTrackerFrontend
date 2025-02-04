import Cardbox from "./Cardbox.jsx";
import Headline from "./Headline.jsx";
import "./Features.css";
import { useState } from "react";

export default function Features() {
  const [cardData, setCardData] = useState({ title: 'Manage your loans', content: 'Taken too many student credit cards? Manage your loans on the go within our app' });

  const handleCardData = (data) => {
    setCardData(data); 
    console.log(data); 
  };

  return (
    <div className="Features">
      <Cardbox onCardClick={handleCardData} />
      <Headline data={cardData}/>
    </div>
  );
}
