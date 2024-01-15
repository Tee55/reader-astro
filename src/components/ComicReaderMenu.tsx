import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useRef, useState } from "react"
import JSZip from "jszip"
import { atom } from "nanostores";

export const comicPages = atom<string[]>([]);

export const ComicReaderMenu = () => {

    const inputFileRef = useRef<HTMLInputElement>(null!)

    const openOnClick = () => {
        inputFileRef.current.click();
    }

    const inputFileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        const data: JSZip = await JSZip.loadAsync(file)
        const images: string[] = []

        for (const relativePath of Object.keys(data.files)) {
            if (data.files[relativePath].dir) continue

            const file: Blob = await data.files[relativePath].async("blob")
            images.push(URL.createObjectURL(file))
        }

        comicPages.set(images);
    }

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarMenu>
                    <a href='/'>
                        <MenubarTrigger>Home</MenubarTrigger>
                    </a>
                </MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <input className="hidden" type='file' ref={inputFileRef} onChange={inputFileOnChange} accept='application/zip' />
                <MenubarContent>
                    <MenubarItem onClick={openOnClick}>
                        Open
                    </MenubarItem>
                    <MenubarItem>
                        New Tab
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
