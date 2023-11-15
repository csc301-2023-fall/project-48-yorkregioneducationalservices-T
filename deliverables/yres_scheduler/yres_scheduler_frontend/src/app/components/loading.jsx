import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return (
        <div className='loading'>
            <Spinner animation="border" role="status" />
        </div>
    )
}

export default Loading;
