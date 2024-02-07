"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";

import DocumentPreview from "./DocumentPreview";
import FieldsViewer from "./FieldsViewer";
import { ISelectedFields } from "@/app/utils/interfaces/documentField";

const DocumentViewer = () => {
  const [selectedFields, setSelectedFields] = useState<Array<ISelectedFields>>(
    []
  );
  const [hoveredField, setHoveredField] = useState<ISelectedFields | null>(
    null
  );

  const handleSelectedFields = (
    position: number[],
    id: number,
    color: string
  ) => {
    const duplicateSelectedFields: Array<ISelectedFields> = [...selectedFields];

    const idIndex = duplicateSelectedFields.findIndex(
      (element: ISelectedFields) => element.id === id
    );

    if (idIndex === -1) {
      duplicateSelectedFields.push({ position, id, color });
    } else {
      duplicateSelectedFields.splice(idIndex, 1);
    }

    setSelectedFields(duplicateSelectedFields);
  };

  const handleSelectAllFields = (fields: Array<ISelectedFields>) => {
    setSelectedFields(fields);
  };

  const handleMouseEnter = (position: number[], id: number, color: string) => {
    setHoveredField({ position, id, color });
  };

  const handleMouseLeave = () => setHoveredField(null);

  return (
    <Box display="flex" gap={2} height={"calc(100vh - 67px)"} overflow="hidden">
      <Box
        width="80%"
        display="flex"
        justifyContent="center"
        gap={2}
        bgcolor="grey.800"
        borderRadius={2}
      >
        <DocumentPreview
          selectedFields={selectedFields}
          hoveredField={hoveredField}
        />
      </Box>
      <Box width="20%" bgcolor="grey.800" borderRadius={2} p={1}>
        <FieldsViewer
          handleSelectedFields={handleSelectedFields}
          selectedFields={selectedFields}
          handleSelectAllFields={handleSelectAllFields}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </Box>
    </Box>
  );
};

export default DocumentViewer;
