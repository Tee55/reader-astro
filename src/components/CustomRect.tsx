import type { Annotation } from "@/interfaces/annotation";
import { useStore } from "@nanostores/react";
import type Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";
import { annotations } from "@/components/ComicAnnotation";

export const CustomRect = (props: { shapeProps: Annotation, isSelected: boolean, onClick: () => void }) => {

    const $annotations = useStore(annotations);

    const shapeRef = useRef<Konva.Rect>(null!);
    const transformRef = useRef<Konva.Transformer>(null!);

    useEffect(() => {
        if (props.isSelected) {
            if (shapeRef.current && transformRef.current) {
                transformRef.current.setNode(shapeRef.current);
                transformRef.current.getLayer()?.batchDraw();
            }
        }
    }, [props.isSelected]);

    const onMouseEnter = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = 'move';
    };

    const onMouseLeave = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (stage) stage.container().style.cursor = 'crosshair';
    };

    const updateAnnotation = (updated_annotation: Annotation) => {
        const new_annotations = $annotations.map((annotation) => {
            if (annotation.id === updated_annotation.id) {
                return updated_annotation
            }
            return annotation
        })
        annotations.set(new_annotations)
    }

    return (
        <React.Fragment>
            <Rect
                ref={shapeRef}
                fill="transparent"
                stroke="blue"
                {...props.shapeProps}

                onClick={props.onClick}
                onContextMenu={(e) => e.evt.preventDefault()}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onDragEnd={() => {
                    const new_annotation: Annotation = {
                        ...props.shapeProps,
                        width: shapeRef.current?.width(),
                        height: shapeRef.current?.height()
                    }
                    updateAnnotation(new_annotation)
                }}
                onTransformEnd={() => {
                    const new_annotation: Annotation = {
                        ...props.shapeProps,
                        x: shapeRef.current?.x(),
                        y: shapeRef.current?.y(),
                        width: shapeRef.current?.width(),
                        height: shapeRef.current?.height()
                    }
                    updateAnnotation(new_annotation)
                }}
                draggable
            />
            {props.isSelected && <Transformer ref={transformRef} />}
        </React.Fragment>
    );
};
