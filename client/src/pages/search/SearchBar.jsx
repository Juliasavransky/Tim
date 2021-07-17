import React, { Fragment, useEffect, useState } from 'react';
import { Input, List, Container } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';
import './searchBar.css';
import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';


const SearchBar = ({
    getProfiles,
    profile: {
        profiles, loading
    } }) => {

    const [wordEntered, setWordEntered] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [display, setDisplay] = useState(false);


    useEffect(() => {
        getProfiles();
    }, [getProfiles]);



    const handleFilter = (searchWord) => {
        setWordEntered(searchWord);

        const newFilter = profiles?.filter((profile) => {
            return Object.values(profile)
                .join(" ")
                .toLowerCase()
                .includes(wordEntered.toLowerCase())
        })
        if (searchWord === "") {
            setSearchResults([])
        } else {
            setSearchResults(newFilter);
        }
    }

    const clearInput = () => {
        setWordEntered("");
        setSearchResults([]);
        setDisplay(false);
    };


    return <Fragment>
        {loading
            ? <Spinner />
            : <Fragment >


                <div className="searchBar--comp">
                    <Input
                        onBlur={() => {
                            setTimeout(() => {
                                clearInput()
                            }, 100)
                        }}
                        value={wordEntered}
                        type="text"
                        placeholder='Search...'
                        className="searchBarInput"
                        onChange={(e) => handleFilter(e.target.value)}
                        icon={{ name: 'search', circular: true, link: true }}
                    />

                    <div >
                        {searchResults.length > 0 && (
                            <div className="searchBarResults">
                                {searchResults?.slice(0, 10).map((value, key) => {
                                    return (
                                        <div key={key}>
                                            <div className="searchBar--content">
                                                <Link
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'var(--blue)',
                                                        fontSize:"1.5rem"
                                                    }}
                                                    to={`/userProfile/${value.user._id}`}
                                                >

                                                    <div >
                                                        {value.user.firstName
                                                            .charAt(0)
                                                            .toUpperCase() + value.user.firstName.slice(1)}
                                                        {" "}
                                                        {value.user.lastName
                                                            .charAt(0)
                                                            .toUpperCase() + value.user.lastName.slice(1)}
                                                    </div>

                                                    <div>
                                                        <i 
                                                        style={{fontSize:"1.6rem"}}
                                                        className="far fa-map"></i>
                                                        {value.city
                                                            .charAt(0)
                                                            .toUpperCase() + value.city.slice(1)}
                                                    </div>

                                                    <div className="searchBarResults_li">
                                                        {/* {value.categories.map((cat, index) =>
                                                                (<li key={index}>
                                                                    {cat
                                                                        .charAt(0)
                                                                        .toUpperCase() + cat.slice(1)}</li>))} */}
                                                    </div>

                                                    <div className="searchBarResults_li">
                                                        {/* {value.subCategories.map(tag => (
                                                                    <li key={tag._id} tag>
                                                                        {tag.label
                                                                            .charAt(0)
                                                                            .toUpperCase() + tag.label.slice(1)}
                                                                    </li>
                                                                ))} */}
                                                    </div>
                                                </Link>

                                            </div>

                                        </div>

                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

            </Fragment>
        }
    </Fragment>
};


SearchBar.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(SearchBar);
