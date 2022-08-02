import React from "react";
import './ComponentStatic/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from './images/1.jpg';
import img2 from './images/2.webp';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function FooterComponent() {




    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="box">
                        <h3>ACC</h3>
                        <ul className="social">
                            <li>
                                <Link to="#" className="facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="twitter">
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="youtube">
                                    <i className="fab fa-youtube"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="instagram">
                                    <i className="fa-brands fa-instagram"></i>
                                </Link>
                            </li>
                        </ul>
                        <p className="text">
                            Your local veterinarians in Egypt.
                            We Are Pleased To Provide A Nation-Wide Variety Of Animal Care Services.
                        </p>
                    </div>
                    <div className="box">
                        <ul className="links">
                            <li><Link to="#">Important Link 1</Link></li>
                            <li><Link to="#">Important Link 2</Link></li>
                            <li><Link to="#">Important Link 3</Link></li>
                            <li><Link to="#">Important Link 4</Link></li>
                            <li><Link to="#">Important Link 5</Link></li>
                        </ul>
                    </div>
                    <div className="box">
                        <div className="line">
                            <i className="fas fa-map-marker-alt fa-fw"></i>
                            <div className="info">Egypt, Giza, Inside The Sphinx, Room Number 220</div>
                        </div>
                        <div className="line">
                            <i className="fa-solid fa-clock"></i>
                            <div className="info">Business Hours: From 10:00 To 18:00</div>
                        </div>
                        <div className="line">
                            <i className="fas fa-phone-volume fa-fw"></i>
                            <div className="info">
                                <span>+20123456789</span>
                                <span>+20198765432</span>
                            </div>
                        </div>
                    </div>
                    <div className="box footer-gallery">
                        <img src={img1} />
                        <img src={img2} />
                        <img src={img3} />
                        <img src={img4} />
                        <img src={img2} />
                        <img src={img1} />


                    </div>
                </div>
                <p className="copyright">Made With &lt;3 By ITI Team</p>
            </div>
        </>
    )
}
export default FooterComponent;