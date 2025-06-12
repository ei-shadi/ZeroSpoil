import React from 'react';
import styled from 'styled-components';

const FoodCard = ({ image, name, category, quantity, expiry }) => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="box">
          <img src={image} alt={name} className="food-img" />
          <div className="content">
            <h3 className="name">{name}</h3>
            <p className="category">{category}</p>
            <p className="quantity">Qty: {quantity}</p>
            <p className="expiry">Expires: {expiry}</p>
            <button className="btn">See Details</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    color: white;
    position: relative;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  .box {
    width: 250px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px);
    border-radius: 1rem;
    box-shadow: 0 0 20px rgba(255, 187, 118, 0.3);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .box:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(255, 187, 118, 0.5);
  }

  .food-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 0.7rem;
    margin-bottom: 1rem;
  }

  .content {
    text-align: center;
  }

  .name {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0.2rem 0;
  }

  .category,
  .quantity,
  .expiry {
    font-size: 0.85rem;
    margin: 0.1rem 0;
    opacity: 0.85;
  }

  .btn {
    margin-top: 0.8rem;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: white;
    background-color: #ffa45c;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #ff9240;
  }
`;

export default FoodCard;
