import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'

function ProfilesTable({ type, defaultType }) {

    // Dummy data. TODO: Replace with GET data api call
    const data = [{
        student_id: 0,
        firstname: 'Tom',
        lastname: 'Bombadil',
        age: '12',
        sex: 'Male'
    }, {
        student_id: 1,
        firstname: 'Jack',
        lastname: 'Frost',
        age: 7,
        sex: 'Male'
    }];
    appendRowActions(data, type);
    return (
        <div id='profiles-table'>
            {type !== defaultType ? <CounselorsTable display_data={data}/> : <StudentsTable display_data={data}/>}
        </div>
    )
}

/* Table subtypes */

function StudentsTable({ display_data, rowEvents }) {
    const columns = [{
        dataField: 'student_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'age',
        text: 'Age'
    },{
        dataField: 'sex',
        text: 'Sex'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]

    return (
        <YresTable keyCol={'student_id'} data={display_data} columns={columns} rowEvents={ rowEvents } disableHover={true}/>
    )   
}

function CounselorsTable({ display_data, rowEvents }) {
    const columns = [{
        dataField: 'counselor_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'campus_id',
        text: 'Campus'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]

    return (
        <YresTable keyCol={'counselor_id'} data={display_data} columns={columns} rowEvents={ rowEvents } disableHover={true}/>
    )   
}

// Helpers

/* 
 * Appends an edit and trash icon action to each row in <data> 
 * Also adds a tooltip for each icon for this specific user <type>
 */
function appendRowActions(data, type) {
    const renderEditTooltip = (props) => (
        <Tooltip {...props}>
            View/Edit {type}
        </Tooltip>
    );
    const renderDeleteTooltip = (props) => (
        <Tooltip {...props}>
            Delete {type}
        </Tooltip>
    );

    // TODO: Replace buttons with icons and add funcionality
    data.forEach(item => {
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={ renderEditTooltip }
                >
                    <Button variant="success">Edit</Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={ renderDeleteTooltip }
                >
                    <Button variant="danger">Delete</Button>
                </OverlayTrigger>
            </div>
        )
    });
}

export default ProfilesTable;