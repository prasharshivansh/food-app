"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { saveMeal } from '../actions/meals';

export default function SharePage() {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  // 1. Trigger the hidden file input click
  const handlePickClick = () => {
    imageInput.current?.click();
  };

  // 2. Handle the file selection and generate preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    // Use FileReader to create a data URL for preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <main className="share-page">
      <h1 className="share-title">
        Share Your <span className="orange-text">Favorite Meal</span>
      </h1>
      <p className="share-description">
        Got a delicious recipe you want to share with the world? Fill out the
        form below!
      </p>
      <form className="share-form" action={saveMeal}>
        <div className="form-group">
          <label htmlFor="title">Meal Title</label>
          <input type="text" id="title" name="title" required />
        </div>

        {/* --- START OF NEW IMAGE PICKER --- */}
        <div className="form-group">
          <label htmlFor="image">Meal Image</label>
          <div className="image-picker-container">
            <div
              className="image-preview"
              onClick={!pickedImage ? handlePickClick : undefined}
              style={{ cursor: !pickedImage ? "pointer" : "default" }}
            >
              {!pickedImage && <p>Click here to add image</p>}
              {pickedImage && (
                <Image
                  src={pickedImage}
                  alt="The image selected by the user"
                  fill
                  className="preview-img"
                />
              )}
            </div>
            <input
              className="hidden-input"
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              name="image"
              ref={imageInput}
              onChange={handleImageChange}
              // required // Optional: Uncomment if image is mandatory
            />
            <button
              className="pick-image-btn"
              type="button"
              onClick={handlePickClick}
            >
              Pick an Image
            </button>
          </div>
        </div>
        {/* --- END OF NEW IMAGE PICKER --- */}

        <div className="form-group">
          <label htmlFor="summary">Short Summary</label>
          <textarea id="summary" name="summary" rows={3} required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows={8}
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="creator">Your Name</label>
            <input type="text" id="creator" name="creator" required />
          </div>
          <div className="form-group">
            <label htmlFor="creator_email">Your Email</label>
            <input
              type="email"
              id="creator_email"
              name="creator_email"
              required
            />
          </div>
        </div>

        <button type="submit" className="discover-btn">
          Share Meal
        </button>
      </form>
    </main>
  );
}
