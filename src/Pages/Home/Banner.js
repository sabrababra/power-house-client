import React from 'react';
import bannerBg from '../../Assets/bannerBg.jpg';

const Banner = ({ title, text, buttonName, height }) => {
  return (
    <div className={`hero ${height}`} style={{ backgroundImage: `url('${bannerBg}')` }}>
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">{text}</p>
          <button className="btn btn-primary">{buttonName}</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;