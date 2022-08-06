import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopyright } from "@fortawesome/free-solid-svg-icons"
import { faSquareFacebook, faSquareGooglePlus, faSquareInstagram } from "@fortawesome/free-brands-svg-icons"
const Footer = () => {
  return (
    <div className="footer">
      <ul className="footerDetails">
        <li className="footerDetail">footer 1</li>
        <li className="footerDetail">footer 2</li>
        <li className="footerDetail">footer 3</li>
        <li className="footerDetail">footer 4</li>
        <li className="footerDetail">footer 5</li>
        <li className="footerDetail">footer 6</li>
        <li className="footerDetail">footer 7</li>
        <li className="footerDetail">footer 8</li>
        <li className="footerDetail">footer 9</li>
      </ul>
      <div className="socials">
        <FontAwesomeIcon className="socialf" size="3x" icon={faSquareFacebook} />
        <FontAwesomeIcon className="socialg" size="3x" icon={faSquareGooglePlus} />
        <FontAwesomeIcon className="sociali" size="3x" icon={faSquareInstagram} />
      </div>
      <br />
      <p>
        <FontAwesomeIcon icon={faCopyright} size="1x" /> Copyright All rights reserved
      </p>
    </div>
  )
}

export default Footer
