import React, { useState } from 'react';
import { FaTimes, FaPlus, FaUpload } from 'react-icons/fa';
import firebase from 'firebase/app';
import 'firebase/storage';

const UploadModal = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  const [selectedVideo, setSelectedVideo] = useState(null); // Store the selected video

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
  };

  const handleUploadButtonClick = () => {
    // Handle upload logic here
    if (selectedImage) {
      const storageRef = firebase.storage().ref();
      const imagesRef = storageRef.child('images');
      const uploadTask = imagesRef.child(selectedImage.name).put(selectedImage);

      uploadTask.then(() => {
        console.log('Image uploaded successfully!');
        // Additional logic or UI updates after successful upload
      }).catch((error) => {
        console.error('Error occurred during image upload:', error);
        // Handle the error appropriately
      });
    }

    if (selectedVideo) {
      // Upload video to Firebase storage in the 'videos' folder
      const storageRef = firebase.storage().ref('videos');
      const videoRef = storageRef.child(selectedVideo.name);

      videoRef.put(selectedVideo)
        .then((snapshot) => {
          console.log('Video uploaded successfully');
        })
        .catch((error) => {
          console.error('Error uploading video:', error);
        });
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#ccc', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <FaTimes size={20} color="#333" />
        <FaUpload size={20} color={(selectedImage || selectedVideo) ? 'green' : 'gray'} style={{ cursor: 'pointer' }} onClick={handleUploadButtonClick} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 6rem)', textAlign: 'center' }}>
        {!selectedImage && !selectedVideo ? (
          <>
            <label htmlFor="image-upload" style={{ cursor: 'pointer', marginRight: '1rem' }}>
              <div style={{ width: '10rem', height: '10rem', backgroundColor: '#ccc', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <FaPlus size={30} color="#333" />
                </div>
                <span>Upload an image</span>
              </div>
            </label>
            <label htmlFor="video-upload" style={{ cursor: 'pointer' }}>
              <div style={{ width: '10rem', height: '10rem', backgroundColor: '#ccc', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <FaPlus size={30} color="#333" />
                </div>
                <span>Upload a video</span>
              </div>
            </label>
          </>
        ) : selectedImage ? (
          <img src={selectedImage} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <video src={URL.createObjectURL(selectedVideo)} controls style={{ maxWidth: '100%', maxHeight: '100%' }} />
        )}
        <input type="file" id="image-upload" style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
        <input type="file" id="video-upload" style={{ display: 'none' }} accept="video/*" onChange={handleVideoUpload} />
      </div>
    </div>
  );
};

export default UploadModal;
