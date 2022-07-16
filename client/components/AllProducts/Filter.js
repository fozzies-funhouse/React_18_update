import React from 'react';
import { motion } from 'framer-motion';

import './AllProducts.css';

const Filter = ({ tag }) => {
  return (
    <>
      <motion.div
        className='filter-item'
        whileInView={{ scale: [0, 1] }}
        whileHover={{ scale: [1, 1.2] }}
        transition={{ duration: 0.25 }}
      >
        <img className='filter-image' src={`./Tags/${tag}.png`} alt={tag} />
      </motion.div>
      <div className='filter-tag'>{tag}</div>
    </>
  );
};

export default Filter;

// Nike converse Adidas vans jordans
