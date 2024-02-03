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

  return (
    <Box display="flex">
      <Box width="80%" display="flex" justifyContent="center" gap={2}>
        <DocumentPreview selectedFields={selectedFields} />
      </Box>
      <Box width="20%">
        <FieldsViewer
          handleSelectedFields={handleSelectedFields}
          selectedFields={selectedFields}
          handleSelectAllFields={handleSelectAllFields}
        />
      </Box>
    </Box>
  );
};

export default DocumentViewer;
