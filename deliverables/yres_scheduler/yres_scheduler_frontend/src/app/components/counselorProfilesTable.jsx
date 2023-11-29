import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import CounselorEdit from '../modals/counselorEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import { fetchDataDELETE } from '../helper';
import { useRouter } from 'next/navigation';

/** 
 * Counselor Table that displays:
*class Counselor {
   *counselor_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    campus_id (string) 		// <UI> The ID of the campus this counselor will teach in
}
 * Props: 
        counselorData - a list of counselor objects with above attributes
**/
function CounselorProfilesTable({ counselorData }) {
    const router = useRouter();
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        counselor_id: -1,
        firstname: null,
        lastname: null,
    });

    const columns = [{
        dataField: '_counselor_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]

    counselorData.forEach(item => {
        //creates a modal and button for editing and deleting each counselor
        const showEditModal = () => {
            setEditItem(item);
            setShowEdit(true);
        }
        const deleteCounselor = async () =>{
            try {
                await fetchDataDELETE(
                    `/counselor/${item._counselor_id}/`
                );
                router.refresh();
            } catch (err) {
                //TODO: Display Error in component
                console.log(err);
            }
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>View/Edit Counselor</Tooltip>}>
                    <Button variant="success" onClick={showEditModal} className='action-button'>
                        <FaPencilAlt />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>Delete Counselor</Tooltip>}>
                    <Button variant="danger" onClick={deleteCounselor} className='action-button'>
                        <BsTrash />
                    </Button>
                </OverlayTrigger>
            </div>
        )
    })

    return (
        <>
            <YresTable keyCol={'_counselor_id'} data={counselorData} columns={columns} disableHover={true}/>
            <CounselorEdit
                item={editItem}
                show={showEdit}
                setShow={setShowEdit}
                type={'Counselor'}
            />
        </>
    )   
}

export default CounselorProfilesTable;