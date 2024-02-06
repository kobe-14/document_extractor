"use client";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

import {
  IPreviewComponent,
  ISelectedFields,
} from "@/app/utils/interfaces/documentField";

const alpha = 0.5;

const Preview = ({ page, selectedFields }: IPreviewComponent) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState<any>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    id,
    image: { url, width, height },
  } = page || {};

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (canvas && container) {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      canvas.width = containerWidth / scale;
      canvas.height = containerHeight / scale;
    }
  }, [scale]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");
    const img = new Image();
    img.src = `/${url}`;

    img.onload = () => {
      if (context) {
        if (canvas) {
          canvas.width = 800;
          canvas.height = window.innerHeight - 110;
        }
        context?.drawImage(img, 0, 0, canvas?.width || 0, canvas?.height || 0);
        selectedFields.forEach((selectedField: ISelectedFields) => {
          const { position, color } = selectedField;
          const [x, y, reactWidth, rectHeight] = position || [];
          const scaledCoordinates = scaleCoordinates(
            x,
            y,
            reactWidth,
            rectHeight,
            canvas,
            width,
            height
          );
          context.fillStyle = color
            .replace("rgb", "rgba")
            .replace(")", `, ${alpha})`);
          context?.fillRect(
            scaledCoordinates.x,
            scaledCoordinates.y,
            scaledCoordinates.scaledWidth - scaledCoordinates.x,
            scaledCoordinates.scaledHeight - scaledCoordinates.y
          );
        });
      }
    };
  }, [selectedFields, width, height, url, scale]);

  function scaleCoordinates(
    x: any,
    y: any,
    width: any,
    height: any,
    canvas: any,
    originalCanvasWidth: any,
    originalCanvasHeight: any
  ) {
    const scaleFactorX = canvas.width / originalCanvasWidth;
    const scaleFactorY = canvas.height / originalCanvasHeight;
    const scaledX = x * scaleFactorX;
    const scaledY = y * scaleFactorY;
    const scaledWidth = width * scaleFactorX;
    const scaledHeight = height * scaleFactorY;
    return { x: scaledX, y: scaledY, scaledWidth, scaledHeight };
  }

  const handleZoomChange = (event: any) => {
    const selectedZoom = event.target.value;
    let newScale = 1;

    if (selectedZoom === "fit") {
      newScale = 1;
    } else if (selectedZoom === "75%") {
      newScale = 0.75;
    } else if (selectedZoom === "100%") {
      newScale = 2;
    }

    setScale(newScale);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" gap={2}>
        <label htmlFor="zoomSelect">Select Zoom:</label>
        <select id="zoomSelect" onChange={handleZoomChange}>
          <option value="fit">Fit</option>
          <option value="75%">75%</option>
          <option value="100%">100%</option>
        </select>
      </Box>
      <Box
        ref={containerRef}
        width={1}
        height={"calc(100vh - 44px)"}
        overflow="auto"
        mt={2}
      >
        <canvas
          ref={canvasRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </Box>
    </Box>
  );
};

export default Preview;
