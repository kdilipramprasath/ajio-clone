import React from 'react'

function HomeAndKitchen({ path }) {
    console.log(path);
    return (
        <div>
            
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            path: context.query
        }
    }
}

export default HomeAndKitchen;
