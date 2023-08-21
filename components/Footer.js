import React from 'react';
import { FaHome, FaRegHeart, FaUpload, FaUser, FaVrCardboard } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem' }}>
        <Link href="/Gallery">
          <FaHome size={20} color="#333" />
        </Link>
        <Link href="/Tinder">
          <FaRegHeart size={20} color="#333" />
        </Link>
        <Link href="/upload">
          <FaUpload size={20} color="#333" />
        </Link>
        <Link href="/ReelsView">
          <FaUser size={20} color="#333" />
        </Link>
        <Link href="/upload">
          <FaVrCardboard size={20} color="#333" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
