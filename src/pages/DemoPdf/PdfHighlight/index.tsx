import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { CommentedHighlight, ContextMenuProps, DrawingStroke, GhostHighlight, ScaledPosition, ShapeData, ShapeType, Tip, ViewportHighlight } from "./types";
import ExpandableTip from "./components/ExpandableTip";
import { PdfHighlighterUtils } from "../components/contexts/PdfHighlighterContext";
import CommentForm from "./components/CommentForm";
import { PdfHighlighter } from "./components/PdfHighlighter";
import HighlightContainer from "./components/HighlightContainer";
import { PdfLoader } from "./components/PdfLoader";

import "./style/style.css"
import SiderBarPdf from "./SiderBarPdf";
import { ContextPdf } from "./contexts/ProviderPdf";
import { Container } from "@/components/Atoms";
import HeaderPdf from "./comp/HeaderPdf";

const PRIMARY_PDF_URL = "HDSD_NVCBCS_VANV.pdf";

const resetHash = () => {
    document.location.hash = "";
};
const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => {
    return document.location.hash.slice("#highlight-".length);
};

export default function PdfHighlight() {

    const [url, setUrl] = useState(PRIMARY_PDF_URL);
    const [highlights, setHighlights] = useState<Array<CommentedHighlight>>(
        []
    );
    const currentPdfIndexRef = useRef(0);
    const [contextMenu, setContextMenu] = useState<ContextMenuProps | null>(null);
    const [pdfScaleValue, setPdfScaleValue] = useState<number | undefined>(
        undefined,
    );
    const [highlightPen, setHighlightPen] = useState<boolean>(false);
    const [freetextMode, setFreetextMode] = useState<boolean>(false);
    const [imageMode, setImageMode] = useState<boolean>(false);
    const [areaMode, setAreaMode] = useState<boolean>(true);
    const [isSignaturePadOpen, setIsSignaturePadOpen] = useState<boolean>(false);
    const [pendingImageData, setPendingImageData] = useState<string | null>(null);
    // Drawing mode state
    const [drawingMode, setDrawingMode] = useState<boolean>(false);
    const [drawingStrokeColor, setDrawingStrokeColor] = useState<string>("#000000");
    const [drawingStrokeWidth, setDrawingStrokeWidth] = useState<number>(3);
    // Shape mode state
    const [shapeMode, setShapeMode] = useState<ShapeType | null>(null);
    const [shapeStrokeColor, setShapeStrokeColor] = useState<string>("#000000");
    const [shapeStrokeWidth, setShapeStrokeWidth] = useState<number>(2);
    // Sidebar state
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [scrolledToHighlightId, setScrolledToHighlightId] = useState<string | null>(null);

    // Refs for PdfHighlighter utilities
    const highlighterUtilsRef = useRef<PdfHighlighterUtils>();
    const fileInputRef = useRef<HTMLInputElement>(null);


    const addHighlight = (highlight: GhostHighlight, comment: string) => {
        console.log("Saving highlight", highlight);
        setHighlights([{ ...highlight, comment, id: getNextId() }, ...highlights]);
    };

    const handleFreetextClick = (position: ScaledPosition) => {
        console.log("Creating freetext highlight", position);
        const newHighlight: CommentedHighlight = {
            id: getNextId(),
            type: "freetext",
            position,
            content: { text: "New note" },
            comment: "",
        };
        setHighlights([newHighlight, ...highlights]);
        setFreetextMode(false); // Exit mode after creating
    };

    const handleImageClick = (position: ScaledPosition) => {
        console.log("Creating image highlight", position);
        if (pendingImageData) {
            // Load image to get its natural dimensions
            const img = new Image();
            img.onload = () => {
                const imageAspect = img.naturalWidth / img.naturalHeight;
                const boundingRect = position.boundingRect;

                // Keep the width from click position, adjust height to maintain aspect ratio
                const currentWidth = boundingRect.x2 - boundingRect.x1;
                const adjustedHeight = currentWidth / imageAspect;

                // Create adjusted position with correct aspect ratio
                const adjustedPosition: ScaledPosition = {
                    ...position,
                    boundingRect: {
                        ...boundingRect,
                        y2: boundingRect.y1 + adjustedHeight,
                    },
                    rects: position.rects.map(rect => ({
                        ...rect,
                        y2: rect.y1 + adjustedHeight,
                    })),
                };

                const newHighlight: CommentedHighlight = {
                    id: getNextId(),
                    type: "image",
                    position: adjustedPosition,
                    content: { image: pendingImageData },
                    comment: "",
                };
                setHighlights([newHighlight, ...highlights]);
                setPendingImageData(null);
                setImageMode(false);
            };
            img.src = pendingImageData;
        }
    };

    ///
    const handleDrawingComplete = (dataUrl: string, position: ScaledPosition, strokes: DrawingStroke[]) => {
        console.log("Drawing complete", position, "with", strokes.length, "strokes");
        const newHighlight: CommentedHighlight = {
            id: getNextId(),
            type: "drawing",
            position,
            content: { image: dataUrl, strokes },
            comment: "",
        };
        setHighlights([newHighlight, ...highlights]);
        setDrawingMode(false);
    };

    const handleDrawingCancel = () => {
        console.log("Drawing cancelled");
        setDrawingMode(false);
    };

    const handleShapeComplete = (position: ScaledPosition, shape: ShapeData) => {
        console.log("Shape complete", shape.shapeType, position);
        const newHighlight: CommentedHighlight = {
            id: getNextId(),
            type: "shape",
            position,
            content: { shape },
            shapeType: shape.shapeType,
            strokeColor: shape.strokeColor,
            strokeWidth: shape.strokeWidth,
            comment: "",
        };
        setHighlights([newHighlight, ...highlights]);
        setShapeMode(null);
    };

    const handleShapeCancel = () => {
        console.log("Shape cancelled");
        setShapeMode(null);
    };

    const editHighlight = (
        idToUpdate: string,
        edit: Partial<CommentedHighlight>,
    ) => {
        console.log(`Editing highlight ${idToUpdate} with `, edit);
        setHighlights(
            highlights.map((highlight) =>
                highlight.id === idToUpdate ? { ...highlight, ...edit } : highlight,
            ),
        );
    };


    const getHighlightById = useCallback((id: string) => {
        return highlights.find((highlight) => highlight.id === id);
    }, [highlights]);

    const deleteHighlight = (highlight: ViewportHighlight | Highlight | CommentedHighlight) => {
        console.log("Deleting highlight", highlight);
        setHighlights(highlights.filter((h) => h.id != highlight.id));
    };

    const handleContextMenu = (
        event: MouseEvent<HTMLDivElement>,
        highlight: ViewportHighlight<CommentedHighlight>,
    ) => {
        event.preventDefault();

        // setContextMenu({
        //     xPos: event.clientX,
        //     yPos: event.clientY,
        //     deleteHighlight: () => deleteHighlight(highlight),
        //     editComment: () => editComment(highlight),
        // });
    };


    // Scroll to highlight based on hash in the URL
    const scrollToHighlightFromHash = useCallback(() => {
        const highlight = getHighlightById(parseIdFromHash());

        if (highlight && highlighterUtilsRef.current) {
            highlighterUtilsRef.current.scrollToHighlight(highlight);
        }
    }, [getHighlightById]);

    // Hash listeners for autoscrolling to highlights
    useEffect(() => {
        window.addEventListener("hashchange", scrollToHighlightFromHash);

        return () => {
            window.removeEventListener("hashchange", scrollToHighlightFromHash);
        };
    }, [scrollToHighlightFromHash]);


    return <div className="flex flex-col h-screen flex-col bg-[#fff]">
        <ContextPdf.Provider value={{}}>
            <HeaderPdf />


            <div className="flex flex-1 overflow-hidden">
                <div className="relative flex-1 overflow-hidden ">
                    <PdfLoader document={url}>
                        {(pdfDocument) => (
                            <PdfHighlighter
                                enableAreaSelection={(event) => event.altKey || areaMode}
                                areaSelectionMode={areaMode}
                                pdfDocument={pdfDocument}
                                onScrollAway={resetHash}
                                utilsRef={(_pdfHighlighterUtils) => {
                                    highlighterUtilsRef.current = _pdfHighlighterUtils;
                                }}
                                pdfScaleValue={pdfScaleValue}
                                textSelectionColor={highlightPen ? "rgba(255, 226, 143, 1)" : undefined}
                                onSelection={(highlightPen || areaMode) ? (selection) => {
                                    addHighlight(selection.makeGhostHighlight(), "");
                                    if (areaMode) setAreaMode(false);
                                } : undefined}
                                selectionTip={highlightPen ? undefined : <ExpandableTip addHighlight={addHighlight} />}
                                highlights={highlights}
                                enableFreetextCreation={() => freetextMode}
                                onFreetextClick={handleFreetextClick}
                                enableImageCreation={() => imageMode}
                                onImageClick={handleImageClick}
                                enableDrawingMode={drawingMode}
                                onDrawingComplete={handleDrawingComplete}
                                onDrawingCancel={handleDrawingCancel}
                                drawingStrokeColor={drawingStrokeColor}
                                drawingStrokeWidth={drawingStrokeWidth}
                                enableShapeMode={shapeMode}
                                onShapeComplete={handleShapeComplete}
                                onShapeCancel={handleShapeCancel}
                                shapeStrokeColor={shapeStrokeColor}
                                shapeStrokeWidth={shapeStrokeWidth}
                                style={{
                                    height: "100%",
                                }}
                            >
                                <HighlightContainer
                                    editHighlight={editHighlight}
                                    deleteHighlight={(id) => deleteHighlight({ id } as Highlight)}
                                    onContextMenu={handleContextMenu}
                                />
                            </PdfHighlighter>
                        )}
                    </PdfLoader>

                </div>
                <SiderBarPdf />
            </div>
        </ContextPdf.Provider>;
    </div>
}