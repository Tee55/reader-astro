import { Layer, Stage, Image } from "react-konva";
import Konva from "konva";

import { useState } from "react";
import useImage from "use-image";
import type { Annotation } from "@/interfaces/annotation";

import { v4 as uuidv4 } from 'uuid';
import { atom } from "nanostores";
import { CustomRect } from "@/components/CustomRect";
import { useStore } from "@nanostores/react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

export const annotations = atom<Annotation[]>([]);

/* YOLO v8 format
class x_center y_center width height */

export const ComicAnnotation = (props: { image: string }) => {

    const $annotations = useStore(annotations);

    const [image] = useImage(props.image, "anonymous")

    const image_width = image ? image.width : 1
    const image_height = image ? image.height : 1

    const scale = window.innerWidth * 0.3 / image_width

    const width = image_width * scale
    const height = image_height * scale

    const [annotation, setAnnotation] = useState<Annotation[]>([])
    const [selectedId, setSelectedId] = useState<string>('');

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {

        if (selectedId == '' && annotation.length === 0) {
            const coordinate = e.target.getStage()?.getPointerPosition();
            if (!coordinate) return

            const new_annotation: Annotation = {
                x: coordinate.x,
                y: coordinate.y,
                width: 0,
                height: 0,
            }
            setAnnotation([new_annotation]);
        }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {

        if (selectedId == '' && annotation.length === 1) {
            const coordinate = e.target.getStage()?.getPointerPosition();
            if (!coordinate) return

            const new_annotation: Annotation = {
                x: annotation[0].x,
                y: annotation[0].y,
                width: coordinate.x - annotation[0].x,
                height: coordinate.y - annotation[0].y,
            }
            setAnnotation([new_annotation]);
        }
    };

    const handleMouseUp = async (e: Konva.KonvaEventObject<MouseEvent>) => {

        if (selectedId == '' && annotation.length === 1) {

            const coordinate = e.target.getStage()?.getPointerPosition();
            if (!coordinate) return

            const crop = {
                unit: 'px',
                x: annotation[0].x / scale,
                y: annotation[0].y / scale,
                width: (coordinate.x - annotation[0].x) / scale,
                height: (coordinate.y - annotation[0].y) / scale,
            }

            const new_image = new Konva.Image({
                image: image,
                width: width,
                height: height,
                crop: crop,
            })

            const url = new_image.toDataURL()

            annotation[0].id = uuidv4();
            annotation[0].image = url

            annotations.set([...$annotations, ...annotation])
            setAnnotation([])
        }
    };

    const handleMouseEnter = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = 'crosshair';
    }

    return (
        <ContextMenu>
            <Stage
                width={width}
                height={height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseEnter={handleMouseEnter}>
                <Layer>
                    <Image image={image} width={width} height={height} onMouseDown={() => setSelectedId('')} />
                    {
                        [...$annotations, ...annotation].map((annotation: Annotation, index: number) =>
                            <ContextMenuTrigger>
                                <CustomRect
                                    key={index}
                                    shapeProps={annotation}
                                    isSelected={annotation.id === selectedId}
                                    onClick={() => setSelectedId(annotation.id ?? '')}
                                />
                            </ContextMenuTrigger>
                        )
                    }
                </Layer>
            </Stage >
            <ContextMenuContent>
                <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
