import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import './ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

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

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <div key={image.id} className="image">
          <img src={image.url} alt={image.name} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
