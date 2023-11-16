import * as React from 'react';

/**
 * Alert component
 * if only simpleMessage will display a simple alert
 * if both simple and complexMessage will display both in a more complex alert
 */
function Alert({simpleMessage, complexMessage}) {
    //complex alert with two messages
    if(complexMessage){
        return (
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error</h4>
                <p>{complexMessage}</p>
                <hr />
                <p class="mb-0">{simpleMessage}</p>
            </div>
        );
    }
    //simple one line alert
    return (
        <div class="alert alert-danger" role="alert">
            {simpleMessage}
        </div>
    );
  }

export default Alert;
