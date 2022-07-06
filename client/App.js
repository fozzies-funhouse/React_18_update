import React from 'react';
import Navigation from './components/Navbar';
import Routes from './Routes';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navigation />
      <Footer />
      <Routes />
    </div>
  );
};

export default App;
