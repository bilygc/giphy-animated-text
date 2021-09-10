const Error = (props) => {
    if(!props.isError) {
        return null
    }

    return (
        <p className='col-span-4 bg-red-300 py-1 rounded italic '>{props.text}</p>
    )
}

export default Error