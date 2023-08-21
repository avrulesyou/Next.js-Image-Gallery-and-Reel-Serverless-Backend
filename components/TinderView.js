import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Virtual } from 'swiper';

import './TinderView.css'; // Import CSS file

SwiperCore.use([Navigation, Pagination, Virtual]);

const TinderView = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const db = firebase.firestore();
      const imagesRef = db.collection('images');
      const snapshot = await imagesRef.get();

      const fetchedImages = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setImages(fetchedImages);
    };

    fetchImages();
  }, []);

  const handleSwiped = (currentIndex, indexDirection) => {
    let nextIndex = currentIndex + indexDirection;

    if (nextIndex < 0) {
      nextIndex = images.length - 1;
    } else if (nextIndex >= images.length) {
      nextIndex = 0;
    }

    setCurrentIndex(nextIndex);
  };

  return (
    <div className="tinder-view">
      <Swiper
        virtual
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={image.id} virtualIndex={index}>
              <div className="image-container">
                <img src={image.url} alt={image.name} />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="loading">Loading...</div>
        )}
      </Swiper>

      <div className="footer">
        <button className="swipe-button left" onClick={() => handleSwiped(currentIndex, -1)}>
          Left Swipe
        </button>
        <button className="swipe-button right" onClick={() => handleSwiped(currentIndex, 1)}>
          Right Swipe
        </button>
      </div>
    </div>
  );
};

export default TinderView;
