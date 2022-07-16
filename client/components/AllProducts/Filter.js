import React from 'react';
import { motion } from 'framer-motion';

import './AllProducts.css';

const Filter = ({ tag }) => {
  return (
    <>
      <motion.div
        className='filter-item'
        whileInView={{ scale: [0, 1] }}
        whileHover={{ scale: [1, 1.4] }}
        transition={{ duration: 0.4 }}
      >
        <span className='filter-tag'>{tag}</span>
        <img className='filter-image' src={`./Tags/${tag}.png`} alt={tag} />
      </motion.div>
    </>
  );
};

export default Filter;
