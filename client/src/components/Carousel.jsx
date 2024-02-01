import React from "react";
import imgCarousel1 from "../images/tamanna-rumee-lpGm415q9JA-unsplash.jpg";
import imgCarousel2 from "../images/markus-spiske-BTKF6G-O8fU-unsplash.jpg";
import imgCarousel3 from "../images/freestocks-_3Q3tsJ01nc-unsplash.jpg";

function Carousel() {
  return (
    <>
      <div className="container">
        <div id="carouselExampleCaptions" className="carousel slide mx-5 px-5">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={imgCarousel1} className="d-block mx-auto w-100" style={{ height: 400 + "px" }} alt="..." />
              <div className="carousel-caption d-none d-md-block">
                {/* <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p> */}
              </div>
            </div>
            <div className="carousel-item">
              <img src={imgCarousel2} className="d-block mx-auto w-100" style={{ height: 400 + "px" }} alt="..." />
              <div className="carousel-caption d-none d-md-block">
                {/* <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p> */}
              </div>
            </div>
            <div className="carousel-item">
              <img src={imgCarousel3} className="d-block mx-auto w-100" style={{ height: 400 + "px" }} alt="..." />
              <div className="carousel-caption d-none d-md-block">
                {/* <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p> */}
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
