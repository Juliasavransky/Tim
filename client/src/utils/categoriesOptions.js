import { Header } from 'semantic-ui-react'


export const categories = [
    {
        key: 'Pets',
        text: 'Pets',
        value: 'Pets',
        id: 1,
        content: (
            <Header
                icon='paw'
                content='Pets'
                subheader='Training, Pets care, Custody '
            />)
    },
    {
        key: 'Education and Lessons',
        text: 'Education and Lessons',
        value: 'Education and Lessons',
        id: 2,
        content: (
            <Header
                icon='graduation cap'
                content='Education and Lessons'
                subheader='Private lessons and Study groups'
            />)
    },
    {
        key: 'Sport and Activities',
        text: 'Sport and Activities ',
        value: 'Sport and Activities',
        id: 3,
        content: (
            <Header
                icon='volleyball ball'
                content='Sport and Activities'
                subheader='Individual and group activities'
            />)
    },
    {
        key: 'Art and music',
        text: 'Art and music',
        value: 'Art and music',
        id: 4,
        content: (
            <Header
                icon='music'
                content='Art and music'
                subheader='Classic, modern and the between '
            />)
    },
    {
        key: 'Alternative Medicine',
        text: 'Alternative Medicine ',
        value: 'Alternative Medicine',
        id: 5,
        content: (
            <Header
                icon='heartbeat'
                content='Alternative Medicine'
                subheader='Reiki, Acupuncture and more '
            />)
    },
    {
        key: 'Toddlers and Children',
        text: 'Toddlers and Children',
        value: 'Toddlers and Children',
        id: 6,
        content: (
            <Header
                icon='child'
                content='Toddlers and Children'
                subheader='Parents and children activities'
            />)
    },
    {
        key: 'Technical support',
        text: 'Technical support ',
        value: 'Technical support',
        id: 7,
        content: (
            <Header
                icon='cogs'
                content='Technical support'
                subheader='Installations, internet, troubleshooting  '
            />)
    },
    {
        key: 'Care and beauty',
        text: 'Care and beauty',
        value: 'Care and beauty',
        id: 8,
        content: (
            <Header
                icon='lab'
                content='Care and beauty'
                subheader='Not only for women'
            />)
    },
    {
        key: 'Counseling and guidance',
        text: 'Counseling and guidance',
        value: 'Counseling and guidance',
        id: 9,
        content: (
            <Header
                icon='law'
                content='Counseling and guidance'
                subheader='In different areas'
            />)
    },
    {
        key: 'Other',
        text: 'Other',
        value: 'Other',
        id: 10,
        content: (
            <Header
                icon='beer'
                content='Other'
                subheader='Other topics that we have not thought about them yet'
            />)
    }

]



export function getCategories() {
    return categories;
}

