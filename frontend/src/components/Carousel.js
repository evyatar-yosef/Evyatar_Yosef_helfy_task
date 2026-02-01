import React, { useState } from 'react';
import '../styles/Carousel.css';

function Carousel(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = props.items;

    function handleNext() {
        if (currentIndex < items.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    function handlePrev() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(items.length - 1);
        }
    }

    if (!items || items.length === 0) {
        return props.emptyMessage || <p>No items to display.</p>;
    }

return (
        <div className="carousel-container">
            <div className="carousel-nav">
                <button type="button" onClick={handlePrev} className="nav-btn">❮ Back</button>
                <span className="nav-info">Item {currentIndex + 1} of {items.length}</span>
                <button type="button" onClick={handleNext} className="nav-btn">Next ❯</button>
            </div>

            {/* ה-key גורם לאנימציית ה-fadeIn ב-CSS לפעול בכל מעבר משימה */}
            <div className="carousel-content" key={currentIndex}>
                {props.renderItem(items[currentIndex])}
            </div>
        </div>
    );}

export default Carousel;