import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import firebase from 'firebase/app';
import 'firebase/storage';

const Reels = () => {
  const [videos, setVideos] = useState([]); // Store the fetched videos
  const [currentIndex, setCurrentIndex] = useState(0); // Track the index of the current video

  useEffect(() => {
    // Fetch videos from Firebase storage in the 'videos' folder
    const storageRef = firebase.storage().ref('videos');
    storageRef.listAll().then((res) => {
      const promises = res.items.map((item) => item.getDownloadURL());
      Promise.all(promises).then((urls) => {
        setVideos(urls);
      });
    });
  }, []);

  const handleSwipeUp = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '90vw', height: '80vh', backgroundColor: '#333', position: 'relative', overflow: 'hidden' }}>
        {videos.length > 0 ? (
          <>
            <video src={videos[currentIndex]} autoPlay loop style={{ width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '3rem' }}>
                <FaArrowUp size={50} color="#fff" style={{ cursor: 'pointer' }} onClick={handleSwipeUp} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaArrowDown size={50} color="#fff" style={{ cursor: 'pointer' }} onClick={handleSwipeDown} />
              </div>
            </div>
          </>
        ) : (
          <span style={{ color: '#fff' }}>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default Reels;
