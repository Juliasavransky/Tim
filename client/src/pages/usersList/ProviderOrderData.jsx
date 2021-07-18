import React from 'react';
import { Link } from 'react-router-dom';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProviderOrderData = ({
    order: {
        _id,
        user,
        status,
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
    const fasApproved = {
        top: '23rem',
        right: '13rem',
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
                                : ""}`}                     >
                        <div
                            className=
                            {`userOrdersData--border_3
                                      ${status === "Denied"
                                    ? "userOrdersData--border_3_denied"
                                    : ""}`}                        >
                            <img
                                className=
                                {`userOrdersData--img
                                        ${status === "Denied"
                                        ? "userOrdersData--img_denied"
                                        : ""}`} src={userProfileImg
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
                    <div> Customers:</div>
                    {" "} {user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1)}
                    {" "}
                    {user?.lastName?.charAt(0).toUpperCase() + user?.lastName?.slice(1)}
                </div>

                <div
                    className="userOrdersData--text_heder"
                >status: {status}</div>
            </div>

            <div className="userOrdersData--text">
                <Link
                    className="userOrdersData--btn"
                    style=
                    {status === "Denied"
                        ? linkStyle_denied
                        : linkStyle}
                    to={`/userProfile/${user?._id}`}
                >Go to {" "}
                    {user?.firstName
                        ?.charAt(0)
                        .toUpperCase()
                        + user?.firstName
                            ?.slice(1)}
                    {" "}
                    {user?.lastName
                        ?.charAt(0)
                        .toUpperCase()
                        + user?.lastName
                            ?.slice(1)}
                    profile
                </Link>

                <Link
                    className="userOrdersData--btn"
                    style=
                    {status === "Denied"
                        ? linkStyle_denied
                        : linkStyle}
                    to={`/orders/${_id}`}>
                    <a color="blue">
                        More detels
                    </a>
                </Link>
            </div>


        </div>
    );
};

ProviderOrderData.propTypes = {
    profile: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders,
    profile: state.profile,
})
export default connect(mapStateToProps)(ProviderOrderData);