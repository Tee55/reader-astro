import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { comicPages } from "@/components/ComicReaderMenu";
import { useStore } from '@nanostores/react';
import { ComicAnnotation } from "@/components/ComicAnnotation";

/* YOLO v8 format
class x_center y_center width height */
export const ComicReader = () => {

    const $images = useStore(comicPages);

    return (
        <Carousel opts={{ watchDrag: false }}>
            <CarouselContent>
                {$images.length > 0 ? $images.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                        <ComicAnnotation image={image} ></ComicAnnotation>
                    </CarouselItem>
                )) :
                    <CarouselItem>
                        <div className="flex justify-center">
                            <ComicAnnotation image="./src/assets/cover.webp"></ComicAnnotation>
                        </div>
                    </CarouselItem>
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
