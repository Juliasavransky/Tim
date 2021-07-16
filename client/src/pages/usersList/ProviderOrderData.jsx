import React from 'react';
import { Button, Card } from 'semantic-ui-react';
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

    return (
        <div className="userOrdersData--content">

            <div className="userOrdersData--borders">
                <div className='userOrdersData--border_1'>
                    <div className='userOrdersData--border_2'>
                        <div className='userOrdersData--border_3'>
                            <img
                                className='userOrdersData--img'
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
                    style={{
                        textDecoration: 'none',
                        color: " var(--red)"
                    }}
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
                    style={{
                        textDecoration: 'none',
                        color: "var(--red)"
                    }}
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
    getOrdersByUserId: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders,
    profile: state.profile,
})
export default connect(mapStateToProps)(ProviderOrderData);