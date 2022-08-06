import React from "react"

const Carrousel = ({ carrousel }) => {
  return (
    <div>
      <div className={carrousel ? `carousel` : "carrousel"}>
        <ul className="slides">
          <input type="radio" name="radio-buttons" id="img-1" defaultChecked />
          <li className="slide-container">
            <div className="slide-image">
              <img alt="..." src="F.png" />
            </div>
            <div className="carousel-controls">
              <label htmlFor="img-4" className="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label htmlFor="img-2" className="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-2" />
          <li className="slide-container">
            <div className="slide-image">
              <img alt="..." src="D.png" />
            </div>
            <div className="carousel-controls">
              <label htmlFor="img-1" className="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label htmlFor="img-3" className="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-3" />
          <li className="slide-container">
            <div className="slide-image">
              <img alt="..." src="B.png" />
            </div>
            <div className="carousel-controls">
              <label htmlFor="img-2" className="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label htmlFor="img-4" className="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-4" />
          <li className="slide-container">
            <div className="slide-image">
              <img alt="..." src="A.png" />
            </div>
            <div className="carousel-controls">
              <label htmlFor="img-3" className="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label htmlFor="img-1" className="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <div className="carousel-dots">
            <label htmlFor="img-1" className="carousel-dot" id="img-dot-1"></label>
            <label htmlFor="img-2" className="carousel-dot" id="img-dot-2"></label>
            <label htmlFor="img-3" className="carousel-dot" id="img-dot-3"></label>
            <label htmlFor="img-4" className="carousel-dot" id="img-dot-4"></label>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Carrousel
