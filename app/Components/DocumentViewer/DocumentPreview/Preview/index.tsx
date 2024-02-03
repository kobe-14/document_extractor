"use client";
import React, { useEffect, useRef } from "react";

import {
  IPreviewComponent,
  ISelectedFields,
} from "@/app/utils/interfaces/documentField";

const alpha = 0.5;

const Preview = ({ page, selectedFields }: IPreviewComponent) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    id,
    image: { url, width, height },
  } = page || {};

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");
    const img = new Image();
    img.src = `/${url}`;

    img.onload = () => {
      if (context) {
        if (canvas) {
          canvas.width = 800;
          canvas.height = window.innerHeight - 64;
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
  }, [selectedFields, width, height, url]);

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

  return <canvas ref={canvasRef} />;
};

export default Preview;
