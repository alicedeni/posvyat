import React, { useRef } from 'react';

const ScrollableRectangle = ({ images }) => {
    const scrollRef = useRef(null);

    const handleScroll = (event) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += event.deltaY;
        }
    };

    return (
        <div className="scrollable-rectangle" onWheel={handleScroll}>
            <div className="black-strip top-strip"></div>
            <div className="image-container" ref={scrollRef}>
                {images.map((image, index) => (
                    <img src={image} alt={`Image ${index}`} key={index} className="scrollable-image" />
                ))}
            </div>
            <div className="black-strip bottom-strip"></div>
        </div>
    );
};

export default ScrollableRectangle;