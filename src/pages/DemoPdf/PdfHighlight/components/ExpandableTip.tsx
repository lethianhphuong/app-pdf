import React, { useLayoutEffect, useRef, useState } from "react";
import {
  GhostHighlight,
  PdfSelection,
} from "../types";
import { usePdfHighlighterContext } from "../contexts/PdfHighlighterContext";
import { Button } from "antd";
import CommentForm from "./CommentForm";

interface ExpandableTipProps {
  addHighlight: (highlight: GhostHighlight, comment: string) => void;
}

const ExpandableTip = ({ addHighlight }: ExpandableTipProps) => {
  const [compact, setCompact] = useState(true);
  const selectionRef = useRef<PdfSelection | null>(null);

  const {
    getCurrentSelection,
    removeGhostHighlight,
    setTip,
    updateTipPosition,
  } = usePdfHighlighterContext();

  useLayoutEffect(() => {
    updateTipPosition!();
  }, [compact]);

  return (
    <div className="rounded-lg border bg-popover p-1 shadow-lg">
      {compact ? (
        <Button
          size="small"
          onClick={() => {
            setCompact(false);
            selectionRef.current = getCurrentSelection();
            selectionRef.current!.makeGhostHighlight();
          }}
        >
          Nhập nội dụng note
        </Button>
      ) : (
        <CommentForm
          placeHolder="..."
          onSubmit={(input) => {
            addHighlight(
              {
                content: selectionRef.current!.content,
                type: selectionRef.current!.type,
                position: selectionRef.current!.position,
              },
              input,
            );

            removeGhostHighlight();
            setTip(null);
          }}
        />
      )}
    </div>
  );
};

export default ExpandableTip;
