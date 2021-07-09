import React, { Fragment, useEffect, useState } from 'react';
import {  Input, Image, List, Container } from 'semantic-ui-react';
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


    useEffect(() => {
        getProfiles();
    }, [getProfiles]);



    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);

        const newFilter = profiles?.filter((profile) => {
            return Object.values(profile)
                .join(" ")
                .toLowerCase()
                .includes(searchWord.toLowerCase())
        })
        setSearchResults(newFilter);


        console.log("searchResults", searchResults);
    }

    const clearInput = () => {
        setSearchResults([]);
        setWordEntered("");
    };


    return <Fragment>
        {loading
            ? <Spinner />
            : <Fragment >
                <div className="searchBar--comp">
                    <Input
                        value={wordEntered}
                        type="text"
                        placeholder='Search...'
                        className="searchBarInput"
                        onChange={handleFilter}
                        icon={{ name: 'search', circular: true, link: true }}
                    />

                    <div
                        onClick={clearInput}
                    // className="searchBarResults"
                    >
                        {searchResults.length > 0 && (
                            <div className="searchBarResults">
                                {searchResults?.slice(0, 10).map((value, key) => {
                                    return (
                                        <Container>
                                            <List relaxed='very' key={key}>
                                                <List.Item>
                                                    <List.Content>
                                                        <Link to={`/userProfile/${value.user._id}`} >
                                                            {/* <Image
                                                                rounded
                                                                size='small'
                                                                src={userProfileImg
                                                                    ? userProfileImg
                                                                    : `https://react.semantic-ui.com/images/avatar/large/${userProfileAvatar}.jpg`} /> */}

                                                            <List.Header >
                                                                {value.user.firstName
                                                                    .charAt(0)
                                                                    .toUpperCase() + value.user.firstName.slice(1)}
                                                                {" "}
                                                                {value.user.lastName
                                                                    .charAt(0)
                                                                    .toUpperCase() + value.user.lastName.slice(1)}
                                                            </List.Header>

                                                            <List.Description>
                                                                <List.Icon name='map outline' />{' '}
                                                                {value.city
                                                                    .charAt(0)
                                                                    .toUpperCase() + value.city.slice(1)}
                                                            </List.Description>

                                                            <List.Description className="searchBarResults_li">
                                                                {/* {value.categories.map((cat, index) =>
                                                                (<li key={index}>
                                                                    {cat
                                                                        .charAt(0)
                                                                        .toUpperCase() + cat.slice(1)}</li>))} */}
                                                            </List.Description>

                                                            <List.Description className="searchBarResults_li">
                                                                {/* {value.subCategories.map(tag => (
                                                                    <li key={tag._id} tag>
                                                                        {tag.label
                                                                            .charAt(0)
                                                                            .toUpperCase() + tag.label.slice(1)}
                                                                    </li>
                                                                ))} */}
                                                            </List.Description>
                                                        </Link>
                                                    </List.Content>
                                                </List.Item>
                                            </List>
                                        </Container> 
                                    )})}
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
