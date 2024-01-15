import {Image } from "react-konva";
import useImage from 'use-image';

export const KonvaImage = (props: { image: string }) => {

    const [image] = useImage(props.image)

    return (
        <Image image={image} />
    )
}