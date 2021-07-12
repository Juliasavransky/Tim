// import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Moment from 'react-moment'

// //redux
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import {deleteConfirmation} from '../../actions/orders'

// const ConfirmationItem = ({ 
//     orderId, 
//     auth,
//     confirmation: 
//     { firstName, lastName, text, title, avatar, date }
// }) => {
//     return (
//         <div>
//             {firstName}
//             {lastName},
//             {text},
//             {title},
//             <img src={avatar}></img>
//             <div><Moment format='DD/MM/YYYY'>{date}</Moment></div>
//         </div>
//     );
// };

// ConfirmationItem.propTypes = {
//     orderId: PropTypes.number.isRequired,
//     confirmation: PropTypes.object.isRequired,
//     auth: PropTypes.object.isRequired,
//     deleteConfirmation: PropTypes.func.isRequired
// };
// const mapStateToProps = state => ({
//     auth: state.auth
// })
// export default connect(mapStateToProps, {deleteConfirmation})(ConfirmationItem);