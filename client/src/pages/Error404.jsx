import React, { Fragment } from 'react';
import './error404.css';
import { Link } from 'react-router-dom';


const Error404 = () => {
    return (
        <Fragment>
            <div className="errorComp">

                <div className="errorComp--heder">
                    <h1><i className="fas fa-meteor"></i></h1>
                    <h1>404 Error </h1>
                    <div></div>

                </div>

                <div className="errorComp--animation">
                    <div className="errorComp--content">
                        This page is lost in space
                        <div> This page is lost in space </div>
                        <div> This page is lost in space </div>
                        <div> This page is lost in space </div>
                        <div> This page is lost in space </div>
                    </div>
                </div>

                <div className="errorComp--border1">
                    <div className="errorComp--border2">
                        <div className="errorComp--border3">
                            <div className="errorComp--heder_link">
                                <Link to={`/searchPage`}>
                                    <h1 > Go Back <i className="fas fa-user-astronaut"></i> </h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>




            </div>

        </Fragment>
    );
};

export default Error404;