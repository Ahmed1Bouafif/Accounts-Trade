import React from "react"

const FanUsers = () => {
  return (
    <div>
      <p className="description">Some Fans : </p>
      <div className="real-people">
        <div className="card">
          <div className="card-header">
            <img className="users" src="https://avatars.githubusercontent.com/u/90458850?v=4" alt="sakr belguesmi" />
            <div className="details">
              <p>sakr belguesmi</p>
              <p>clash royal player</p>
            </div>
          </div>
          <div className="stat">
            <div className="posts">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                  {" "}
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />{" "}
                </svg>
              </span>{" "}
              posts: 4
            </div>
            <div className="likes">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  {" "}
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" fill="red"></path>{" "}
                </svg>
              </span>{" "}
              likes: 3
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <img className="users" src="https://ca.slack-edge.com/T02E5DNSTR6-U02E5F7BZL0-537f4e38e96b-512" alt="wael ajjabi" />
            <div className="details">
              <p>wael ajjabi</p>
              <p>free fire player</p>
            </div>
          </div>
          <div className="stat">
            <div className="posts">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                  {" "}
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />{" "}
                </svg>
              </span>{" "}
              posts: 6
            </div>
            <div className="likes">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  {" "}
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" fill="red"></path>{" "}
                </svg>
              </span>{" "}
              likes: 2
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <img className="users" src="https://ca.slack-edge.com/T02E5DNSTR6-U02E5F7DNHW-5e9f26b8fe08-512" alt="ala jridy" />
            <div className="details">
              <p>ala jridi</p>
              <p>call of duty player</p>
            </div>
          </div>
          <div className="stat">
            <div className="posts">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                  {" "}
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />{" "}
                </svg>
              </span>{" "}
              posts: 2
            </div>
            <div className="likes">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  {" "}
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" fill="red"></path>{" "}
                </svg>
              </span>{" "}
              likes: 4
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FanUsers
