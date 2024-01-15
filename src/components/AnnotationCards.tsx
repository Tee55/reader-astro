import type { Annotation } from "@/interfaces/annotation"
import { AnnotationImage } from "@/components/AnnotationImage"
import { CalendarDays, Trash } from "lucide-react"
import { useStore } from "@nanostores/react";
import { annotations } from "@/components/ComicAnnotation";
import {
    Card, CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const AnnotationCards = () => {

    const $annotations = useStore(annotations);

    const deleteAnnotation = (id: string) => {
        if(!id || id.length === 0) return;
        const new_annotations = $annotations.filter((annotation) => annotation.id != id)
        annotations.set(new_annotations)
    }

    return (
        <div className="flex flex-col gap-2 mr-20">
            {
                $annotations.map((annotation: Annotation) => (
                    <Card key={annotation.id}>
                        <CardContent className="p-0">
                            <div className="flex items-center rounded-md border">
                                <AnnotationImage image={annotation.image ?? ''} />
                                <div className="flex-1">
                                    <p className="text-sm">
                                        {annotation.id}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {annotation.class}
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={() => deleteAnnotation(annotation.id ?? '')}>
                                        <Trash></Trash>
                                    </Button>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                ))
            }
        </div>
    )
}