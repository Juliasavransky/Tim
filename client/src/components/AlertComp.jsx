import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlertComp = ({ alerts }) =>

    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <Alert
            style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--headings-font-family)',
                textAlign: 'center',
                padding: '2rem',
            }}
            key={alert.id}
            color={alert.alertType}

        >
            {alert.msg}
        </Alert>
    ))

AlertComp.propTypes = {
    alerts: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
    alerts: state.alert
});



export default connect(mapStateToProps)(AlertComp);