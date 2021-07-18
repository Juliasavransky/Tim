import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './searchItem.css';


//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const SearchItem = ({
    category,
    profile: { profiles, loading },
    auth, match
}) => {

    return (
        <div  >
            <div className="searchItem--comp">

                <Link
                    className="searchItem--comp"
                    to={`/userProfile/categories/${category.key}`}
                >
    
                    <div className="searchByCategories--comp">
                        <div className="searchItem--item">
                            <Icon
                                name={category.content.props.icon}
                                size='huge' />
                            <h3 style={{ color: "var(--green)" }}>{category.key}</h3>
                            <h5 style={{ color: "var(--blue)" }}>{category.text}</h5>
                        </div>
                    </div>
                </Link>
            </div>
        </div >

    );
};

SearchItem.propTypes = {
    profile: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps)(SearchItem);