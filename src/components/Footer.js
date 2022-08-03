import React from 'react'
import MiniFooter from './MiniFooter'

const Footer = () => {

    return (
        <footer className="text-white text-center text-lg-start" style={{ backgroundColor: "#23242a" }}>
            <div className="container p-4">
                <div className="row mt-4">
                    <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">About company</h5>
                        <p>
                            Litaybrary is kind of version 2 of my project. I did it before and I found better ways to implement this idea.
                        </p>
                        <p>
                            So, better for the users - better for me.  
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4 pb-1">Search something</h5>
                        <div className="form-outline form-white mb-4">
                            <input type="text" id="formControlLg" className="form-control form-control-lg" />
                            <label className="form-label" for="formControlLg" style={{ marginLeft: "0px" }}>Search</label>
                        </div>
                        <ul className="fa-ul" style={{paddingRight:'120px'}}>
                            <li className="mb-3">
                                <span className="fa-li"><i className="fas fa-home"></i></span><span className="ms-2">Israel, Tel-Aviv 58485, IL</span>
                            </li>
                            <li className="mb-3">
                                <span className="fa-li"><i className="fas fa-envelope"></i></span><span className="ms-2">litaybrary@gmail.com</span>
                            </li>
                            <li className="mb-3">
                                <span className="fa-li"><i className="fas fa-phone"></i></span><span className="ms-2">+ 972 54 2055 126</span>
                            </li>
                            <li className="mb-3">
                                <span className="fa-li"><i className="fas fa-print"></i></span><span className="ms-2">+ 01 234 567 89</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Opening hours</h5>
                        <table className="table text-center text-white">
                            <tbody className="font-weight-normal">
                                <tr>
                                    <td>Sun - Thu:</td>
                                    <td>8am - 9pm</td>
                                </tr>
                                <tr>
                                    <td>Friday:</td>
                                    <td>8am - 1pm</td>
                                </tr>
                                <tr>
                                    <td>Saturday:</td>
                                    <td>6pm - 10pm</td>
                                </tr>
                            </tbody>
                        </table>
                        <MiniFooter />

                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2020 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">Itay Groer</a>
            </div>
        </footer>
    )
}

export default Footer