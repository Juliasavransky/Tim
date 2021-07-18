import React from 'react';
import { Link } from 'react-router-dom';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './userOrdersData.css';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';




const UserOrdersData = ({
    order: {
        _id,
        user,
        status,
        providerFirstName,
        providerLastName,
    },
    profile,
    auth,
    match,
}) => {

    const userProfileAvatar = user?.gender === 'female' ? woman : man;
    const userProfileImg = profile.avatar?.length > 0 ? profile.avatar : userProfileAvatar;

    const linkStyle = {
        textDecoration: 'none',
        color: " var(--red)"

    }
    const linkStyle_denied = {
        textDecoration: 'none',
        background: 'var(--gray)',
        color: " var(--red)"
    }
 
    return (
        <div
        
            className=
            {`userOrdersData--content
                    ${status === "Denied"
                    ? "userOrdersData--content_denied"
                    : ""}`}
        >
              {status === "Approved"
                ? <i 
                className=" fas fas_approved fa-check"></i>
                : ""
            }

            <div className="userOrdersData--borders">
                <div
                    className=
                    {`userOrdersData--border_1
                        ${status === "Denied"
                            ? "userOrdersData--border_1_denied"
                            : ""}`}
                >
                    <div
                        className=
                        {`userOrdersData--border_2
                                 ${status === "Denied"
                                ? "userOrdersData--border_2_denied"
                                : ""}`}
                    >
                        <div
                            className=
                            {`userOrdersData--border_3
                                     ${status === "Denied"
                                    ? "userOrdersData--border_3_denied"
                                    : ""}`}

                        >
                            <img
                                className=
                                {`userOrdersData--img
                                          ${status === "Denied"
                                        ? "userOrdersData--img_denied"
                                        : ""}`}
                                src={userProfileImg
                                    ? userProfileImg
                                    : userProfileAvatar
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="userOrdersData--text">
                <div className="userOrdersData--text_heder">
                    <div> I ordered from:</div>
                    {" "} {providerFirstName?.charAt(0).toUpperCase() + providerFirstName?.slice(1)}
                    {" "}
                    {providerLastName?.charAt(0).toUpperCase() + providerLastName?.slice(1)}
                </div>

                <div
                    className="userOrdersData--text_heder">
                    Status:{" "}{status}
                </div>
            </div>

            <div className="userOrdersData--text">
                <Link
                    className="userOrdersData--btn"
                    style=
                    {status === "Denied"
                        ? linkStyle_denied
                        : linkStyle}
                    to={`/userDashboard`}>Go back to my profile
                </Link>

                <Link
                    className="userOrdersData--btn"
                    style=
                    {status === "Denied"
                        ? linkStyle_denied
                        : linkStyle}
                    to={`/orders/${_id}`}>
                    <a color="blue">
                        More details
                    </a>
                </Link>
            </div>


        </div>


    );
};

UserOrdersData.propTypes = {
    profile: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders,
    profile: state.profile,
})

export default connect(mapStateToProps)(UserOrdersData);