import React from 'react';
import Slider from 'react-slick';
import './Carousel.css';
import logo from '../../assets/EBookFreeDownload.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const ebookSlides = [
        {
            image: logo,
            caption: "Explore Free Ebooks"
        },
        {
            image: logo,
            caption: "Download and Enjoy"
        },
        {
            image: logo,
            caption: "Expand Your Knowledge"
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="ebook-carousel">
            <Slider {...settings}>
                {ebookSlides.map((slide, index) => (
                    <div className="carousel-slide" key={index}>
                        <img className="carousel-image" src={slide.image} alt={`Slide ${index + 1}`} />
                        <h3 className="carousel-caption">{slide.caption}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
