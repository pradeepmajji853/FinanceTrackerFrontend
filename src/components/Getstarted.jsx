import React from 'react';
import GScontent from './GScontent.jsx';
import GSimage from './GSimage.jsx';
import GSvideo from './GSvideo.jsx';
import './Getstarted.css';

export default function Getstarted() {
  return (
    <div className="Getstarted">
      <div className="heading">
       <h1>Get Started :</h1>
      </div>
      <div className="step1">
        <div className="step1content">
          <GScontent 
            title="Bank connect" 
            content={[
              "Connect your bank accounts and all your transactions will get automatically imported",
              "Connect your e-wallets, cryptocurrencies...",
              "Add your cash expenses manually"
            ]} 
          />
        </div>
        <div className="step1img">
          <GSimage image="/assets/GSimage1.webp" />
        </div>
      </div>
      <div className="step2">
        <div className="step2img">
          <GSvideo video="/assets/GSimage2.mp4"/>
        </div>
        <div className="step2content">
          <GScontent 
            title="Track your expenses" 
            content={[
              "Get featured graphic for your expenses and income",
              "Analyze your spending patterns",
              "See where most of your money goes"
            ]} 
          />
        </div>
      </div>
      <div className="step3">
        <div className="step3content">
          <GScontent 
            title="Smart budgets, Savings e-wallet" 
            content={[
              "Set up smart budgets and track your expense within a particular category",
              "will make you not to overspend in a given category",
              "Save money in our Savings e-wallet,even minimal savings everyday makes a huge saving at the end ",
              "seemless withdrawals anytime "
            ]} 
          />
        </div>
        <div className="step3img">
          <GSimage image="/assets/GSimage4.png" />
        </div>
      </div>
    </div>
  );
}
