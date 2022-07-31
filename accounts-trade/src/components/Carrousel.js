import React from "react"

const Carrousel = ({ carrousel }) => {
  return (
    <div>
      <div class={carrousel ? `carousel` : "carrousel"}>
        <ul class="slides">
          <input type="radio" name="radio-buttons" id="img-1" defaultChecked />
          <li class="slide-container">
            <div class="slide-image">
              <img alt="..." src="F.png" />
            </div>
            <div class="carousel-controls">
              <label for="img-4" class="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label for="img-2" class="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-2" />
          <li class="slide-container">
            <div class="slide-image">
              <img alt="..." src="D.png" />
            </div>
            <div class="carousel-controls">
              <label for="img-1" class="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label for="img-3" class="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-3" />
          <li class="slide-container">
            <div class="slide-image">
              <img alt="..." src="B.png" />
            </div>
            <div class="carousel-controls">
              <label for="img-2" class="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label for="img-4" class="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-4" />
          <li class="slide-container">
            <div class="slide-image">
              <img alt="..." src="A.png" />
            </div>
            <div class="carousel-controls">
              <label for="img-3" class="prev-slide">
                <span>&lsaquo;</span>
              </label>
              <label for="img-1" class="next-slide">
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <div class="carousel-dots">
            <label for="img-1" class="carousel-dot" id="img-dot-1"></label>
            <label for="img-2" class="carousel-dot" id="img-dot-2"></label>
            <label for="img-3" class="carousel-dot" id="img-dot-3"></label>
            <label for="img-4" class="carousel-dot" id="img-dot-4"></label>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Carrousel
