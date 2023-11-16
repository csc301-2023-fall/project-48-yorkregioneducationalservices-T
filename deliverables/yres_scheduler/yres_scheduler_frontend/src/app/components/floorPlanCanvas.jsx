import * as React from 'react';
import { Stage, Layer, Image, Text } from "react-konva";
import Loading from './loading';
import useImage from 'use-image';
import exampleFloorPlan from '../data/school_floorplan_example.jpg'

function RawFloorplanCanvas() {
    const [loading, setLoading] = React.useState(true);
    const [canvasSize, setCanvasSize] = React.useState({
        width: window.innerWidth / 2,
        height: window.innerHeight
    });
    
    React.useEffect(() => {
        setLoading(false);
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

    if (loading) {
        return <Loading/>
    }

    return (
        <Stage className='floorplan-canvas' width={canvasSize.width} height={canvasSize.height} >
            <Layer>
                <FloorPlanImage/>
            </Layer>
        </Stage>
    )
}

export default RawFloorplanCanvas;