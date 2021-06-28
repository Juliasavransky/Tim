import React, { Fragment, useEffect, useState } from 'react';
import { Search, Grid, Container, Input } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';


// const ProfileItem = ({ profile: { user: { _id, firstName, lastName, gender },
//         avatar,
//         subCategories,
//         city
//     }
// }) => {

const SearchBar = ({ getProfiles,
    profile: {
        profiles: {
            categories,
            subCategories,
            city,
            // user: {
            //     firstName,
            //     lastName,
            //     _id
            // }
        }, loading }
}
) => {

    useEffect(() => {
        getProfiles();

    }, [getProfiles]);

    const [searchTerm, setSearchTerm] = useState('')

    const searchTermHandler = (e) => {
        setSearchTerm(e.target.value);
        console.log('searchTerm', searchTerm);
    }

    return (
        <Input
            onChange={searchTermHandler}
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Search...'
        />
    );
};

SearchBar.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(SearchBar);



//****************************************************************************************** */
// if(searchTerm){
//    freeSearch = profiles.filter(value =>{
//categories.toLowerCase().includes(searchTerm.toLowerCase() ||
// subCategories.toLowerCase().includes(searchTerm.toLowerCase() ||
//firstName.toLowerCase().includes(searchTerm.toLowerCase())||
//lastName.toLowerCase().includes(searchTerm.toLowerCase())||
//city.toLowerCase().includes(searchTerm.toLowerCase())
//)
//})
// }

//*********************************************************************************************** */


// const source = _.times(5, () => ({
//     title: {subcategory, category, firstName, lastName,city}
//     image: {avatar}
// }))



// const initialState = { isLoading: false, results: [], value: '' }



// export default class SearchExampleStandard extends Component {
//     state = initialState

//     handleResultSelect = (e, { result }) => setState({ value: result.title })

//     handleSearchChange = (e, { value }) => {
//         setState({ isLoading: true, value })

//         setTimeout(() => {
//             if (state.value.length < 1) return this.setState(initialState)

//             const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
//             const isMatch = (result) => re.test(result.title)

//             this.setState({
//                 isLoading: false,
//                 results: _.filter(source, isMatch),
//             })
//         }, 300)
//     }
// const { isLoading, value, results } = state
{/* <Grid.Column width={10}>
                <Search
                    fluid
                    // onResultSelect={handleResultSelect}
                    // results={results}
                    
                    
                    // onSearchChange={_.debounce(handleSearchChange, 500, {
                        //     leading: true,
                        // })}
                        // loading={isLoading}
                // value={value}
                />
            </Grid.Column>

            <Grid.Column width={1}>
                <Container>
                    <pre
                        style={{ overflowX: 'auto' }}>
                        {JSON.stringify(state, null, 2)}
                    </pre>
                    <pre
                        style={{ overflowX: 'auto' }}>
                        {JSON.stringify(source, null, 2)}
                    </pre>
                </Container>
            </Grid.Column>/* */}