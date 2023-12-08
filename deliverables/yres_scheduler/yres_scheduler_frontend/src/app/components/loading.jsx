import Spinner from 'react-bootstrap/Spinner';

/**
 * Spinning animation
**/
function Loading() {
    return (
        <div className='loading'>
            <Spinner animation="border" role="status" size="lg" /> 
        </div>
    )
}

export default Loading;
