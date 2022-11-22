import moment from "moment/moment"
import { useNavigate } from "react-router-dom"

const OneComment = ({ comment, sendAt, likes, commenter, commnterName }) => {
  const navigation = useNavigate()

  return (
    <div
      onClick={() => {
        navigation(`/profile/${commenter}`, { state: commenter })
      }}
      className="owner"
    >
      <img className="ownerimg" src={commnterName?.i} alt="" />
      <div>
        <div className="comhead">
          <p className="descriptionnt">{commnterName?.n}</p>
          <p className="descriptionnt">{moment(sendAt).fromNow()}</p>
          <div className="likes">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                {" "}
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" fill="red"></path>{" "}
              </svg>
            </span>{" "}
            <p className="descriptionnt">{likes.length}</p>
          </div>
        </div>
        <p className="descriptionn">{comment}</p>
      </div>
    </div>
  )
}

export default OneComment
