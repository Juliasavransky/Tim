import React from 'react';
import { Link } from 'react-router-dom';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './userOrdersData.css';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrdersByUserId } from '../../actions/orders';




const UserOrdersData = ({
    order: {
        _id,
        user,
        status,
        providerFirstName,
        providerLastName,
    },
    profile,
    getOrdersByUserId,
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
                    <div> I ordered from:</div>
                    {" "} {providerFirstName?.charAt(0).toUpperCase() + providerFirstName?.slice(1)}
                    {" "}
                    {providerLastName?.charAt(0).toUpperCase() + providerLastName?.slice(1)}
                </div>

                <div
                    className="userOrdersData--text_heder">
                  status:{" "}{status}
                </div>
            </div>

            <div className="userOrdersData--text">
                <Link
                    className="userOrdersData--btn"
                    style={{
                        textDecoration: 'none',
                        color: " var(--red)"
                    }}
                    to={`/userDashboard`}>Go back to my profile
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

UserOrdersData.propTypes = {
    profile: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    getOrdersByUserId: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders,
    profile: state.profile,
})

export default connect(mapStateToProps, { getOrdersByUserId })(UserOrdersData);