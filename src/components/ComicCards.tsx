import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
    Card,
    CardFooter,
} from "@/components/ui/card"

export const ComicCards = (props: React.DOMAttributes<HTMLDivElement>) => {

    return (
        <Card {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="overflow-hidden rounded-t">
                        <img src="https://picsum.photos/100" alt="Manga Thumbnail" className="w-full"></img>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                    <ContextMenuItem>Add to Library</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            <CardFooter className="p-2">
                <div className="flex flex-col">
                    <h3 className="text-lg">Manga Title</h3>
                    <p className="text-sm text-muted-foreground">Manga Artist</p>
                </div>
            </CardFooter>
        </Card>
    )
}