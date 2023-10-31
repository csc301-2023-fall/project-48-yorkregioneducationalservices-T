import * as React from 'react';
import { Stage, Layer, Image, Text } from "react-konva";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useImage from 'use-image';
import exampleFloorPlan from '../data/school_floorplan_example.jpg'

function FloorPlanCanvas() {
    const [canvasSize, setCanvasSize] = React.useState({
        width: window.innerWidth / 2,
        height: window.innerHeight
    });
    
    React.useEffect(() => {

        // Dynamically change window size based on window
        const updateSize = () => {
            setCanvasSize({
                width: (window.innerWidth / 2) * 0.9,
                height: window.innerHeight * 0.9
            });
        };

        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Create Konva Image element for floorplan
    const FloorPlanImage = () => {
        const img_url = exampleFloorPlan.src
        const [floorplanImg] = useImage(img_url);

        if (floorplanImg === undefined) {
            return (
                <Text text="No Floorplan"/>
            );
        }
        const scale = canvasSize.width / floorplanImg.width;
        return <Image 
                    image={floorplanImg} 
                    width={floorplanImg.width} 
                    height={floorplanImg.height}
                    scaleX={scale}
                    scaleY={scale}
                />
    }

    return (
        <div className='floorplan-canvas'>
            <DropdownButton id="dropdown-basic-button" title="Select Floor"  variant='secondary'>
                <Dropdown.Item>Floor 1</Dropdown.Item>
            </DropdownButton>
            <Stage className='display' width={canvasSize.width} height={canvasSize.height} >
                <Layer>
                    <FloorPlanImage/>
                </Layer>
            </Stage>
        </div>
    )
}

export default FloorPlanCanvas;