'use client';
import dynamic from 'next/dynamic';

const FloorPlanCanvas = dynamic(() => import('./floorPlanCanvas'), {
    ssr: false,
});

/*
 * Wrapper for floorplan canvas to load like a normal
 * client side component. 
 */
export default function FloorplanCanvas() {
    return (<FloorPlanCanvas/>);
}