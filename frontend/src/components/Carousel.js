import React, { useState } from 'react';
import '../styles/Carousel.css';

// Carousel component for displaying items in a carousel format

function Carousel(props) {
    // state for current index
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = props.items;

    function handleNext() {
        // if current index is less than the last index, increment current index
        if (currentIndex < items.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    function handlePrev() {
        // if current index is greater than 0, decrement current index
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(items.length - 1);
        }
    }

    // if there are no items, return empty message
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

            {/* The key causes the fade in animation in the css to work on every task transition */}
            <div className="carousel-content" key={currentIndex}>
                {props.renderItem(items[currentIndex])}
            </div>
        </div>
    );}

export default Carousel;