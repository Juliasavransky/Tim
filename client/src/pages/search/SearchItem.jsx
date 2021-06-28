import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';



const SearchItem = ({ getProfiles, profile: { profiles }, categoriesToRender }) => {

    useEffect(() => {
        getProfiles();


    }, [getProfiles]);



    // check witch category the user select 

    // const handleSelectedCategory = (categorySelected) => {
    //     const filteredCategory = profiles.categories.filter(category => category === categorySelected);
    //     console.log('filteredCategory', categorySelected)
    // }

    return (
        <div 
        
        className="searchByCategories">
            <h1>
                Categories
            </h1>

            <div
       
            className="searchByCategories--item"
            >

                <Link
                    to='/usersList'
                // to={`/usersList/${profiles.categories}`}
                >
                    {categoriesToRender !== null &&
                        categoriesToRender.length > 0 &&
                        categoriesToRender.map((cat, index) => (
                            <div key={index}
                                style={{
                                    display: 'flex',
                                    width: '3rem',
                                    flexDirection: 'row',
                                }}
                            >
                                <Icon

                                    // onClick={() => handleSelectedCategory(cat.content.content)}
                                    name={cat.content.props.icon} size='huge' />
                                <h3 >{cat.content.props.content}</h3>
                                <h5 >{cat.content.props.subheader}</h5>

                            </div>
                        ))}
                </Link>

            </div>
        </div >



    );
};

SearchItem.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(SearchItem);