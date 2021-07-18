import { Header } from 'semantic-ui-react'


export const categories = [
    {
        key: 'Pets',
        text: 'Training, Pets care, Custody ',
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
        text: 'Private lessons and Study groups',
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
        text: 'Individual and group activities ',
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
        key: 'Art and Music',
        text: 'Classic, modern and the between',
        value: 'Art and Music',
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
        text: 'Reiki, Acupuncture and more ',
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
        text: 'Parents and children activities',
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
        key: 'Technical Support',
        text: 'Installations, internet, troubleshooting ',
        value: 'Technical Support',
        id: 7,
        content: (
            <Header
                icon='cogs'
                content='Technical support'
                subheader='Installations, internet, troubleshooting  '
            />)
    },
    {
        key: 'Care and Beauty',
        text: 'Not only for women',
        value: 'Care and Beauty',
        id: 8,
        content: (
            <Header
                icon='lab'
                content='Care and beauty'
                subheader='Not only for women'
            />)
    },
    {
        key: 'Counseling and Guidance',
        text: 'In different areas',
        value: 'Counseling and Guidance',
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
        text: 'Other topics that we have not thought about them yet',
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

