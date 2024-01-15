import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const AnnotationImage = (props: { image: string }) => {
    return (
        <Avatar className="rounded-none">
            <AvatarImage src={props.image}/>
            <AvatarFallback>No Image</AvatarFallback>
        </Avatar>
    )
}