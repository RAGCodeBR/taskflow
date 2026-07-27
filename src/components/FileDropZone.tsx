import { useRef, useState, type DragEvent, type ReactNode } from "react";

type FileDropZoneProps = {
    children: ReactNode;
    onFiles: (files: FileList) => void | Promise<void>;
    disabled?: boolean;
    className?: string;
};

export function FileDropZone({
    children,
    onFiles,
    disabled = false,
    className = "",
}: FileDropZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const dragDepth = useRef(0);

    const hasFiles = (event: DragEvent) =>
        event.dataTransfer.types.includes("Files");

    function onDragEnter(event: DragEvent<HTMLDivElement>) {
        if (disabled || !hasFiles(event)) return;
        event.preventDefault();
        dragDepth.current += 1;
        setIsDragging(true);
    }

    function onDragOver(event: DragEvent<HTMLDivElement>) {
        if (disabled || !hasFiles(event)) return;
        event.preventDefault(); //essencial: permite o drop
        event.dataTransfer.dropEffect = "copy"; //indica que o drop é permitido
    }

    function onDragLeave(event: DragEvent<HTMLDivElement>) {
        if (!hasFiles(event)) return;
        dragDepth.current -= 1;

        if (dragDepth.current <= 0) {
            dragDepth.current = 0;
            setIsDragging(false);
        }
    }

    async function onDrop(event: DragEvent<HTMLDivElement>) {
        if (disabled || !hasFiles(event)) return;

        event.preventDefault();
        event.stopPropagation();
        dragDepth.current = 0;
        setIsDragging(false);
        
        if (event.dataTransfer.files.length > 0) {
            await onFiles(event.dataTransfer.files);
        }
    }

    return (
        <div
            className={[
                "relative rounded-md transition",
                isDragging && "ring-2 ring-primary bg-primary/10",
                disabled && "opacity-50",
                className,
            ]

                .filter(Boolean)
                .join(" ")}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            >
                {children}

                {isDragging && (
                    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center rounded-md border-2 border-dashed border-primary bg-primary/10 text-sm font-medium text-primary">
                        Solte os arquivos aqui
                    </div>
                )}
        </div>
    );
}
