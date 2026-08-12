import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <h1 className="text-4xl font-display font-bold text-primary mb-4">Vetora Home</h1>
      <p className="text-lg font-sans mb-8">Welcome to the Veterinary Learning System dashboard.</p>
      <button 
        onClick={() => navigate('/login')}
        className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-medium"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
