import React, { useState } from "react"
import moment from "moment"
const Post = ({ imageFile, description, title, _id, createdAt, posterImage, name }) => {
  const [show, setShow] = useState(false)
  const descriptionminimize = (str, show) => {
    if (show) return str
    if (str.length > 45) {
      str = str.substring(0, 65) + " ..."
    }
    return str
  }

  return (
    <div className="postCard">
      <div className="owner">
        <img className="ownerimg" src={posterImage} alt="" />
        <p className="description">{name}</p>
      </div>
      <div className="downCard">
        <img className="postimg" src={imageFile} alt="" />
        <div className="cardFooter">
          <div className="timeadd">
            <p className="posttitle">{title}</p>
            <div className="time">{moment(createdAt).fromNow()}</div>
          </div>
          <p className="postdescription">
            {descriptionminimize(description, show)}{" "}
            {description.length > 45 && (
              <span onClick={() => setShow(!show)} className={`readmore ${show && "bla"} `}>
                {!show ? "Read More" : "Show Less"}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Post
