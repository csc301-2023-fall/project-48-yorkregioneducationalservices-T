'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Loading from './loading';

const FloorPlanCanvas = dynamic(() => import('./floorPlanCanvas'), {
    ssr: false,
});

/*
 * Wrapper for floorplan canvas to load like a normal
 * client side component. 
 */
export default function FloorplanCanvas() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <Loading/>
    }
    return (<FloorPlanCanvas/>);
}