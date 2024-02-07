import React, { useEffect, useState } from "react";

import {
  IDocumentPreviewComponent,
  IPageInterface,
} from "@/app/utils/interfaces/documentField";
import pageData from "@/app/utils/data/pages.json";
import { flattenArray } from "@/app/utils/helpers/common";
import Preview from "./Preview";

const DocumentPreview = ({
  selectedFields,
  hoveredField,
}: IDocumentPreviewComponent) => {
  const [documentPages, setDocumentPages] = useState<Array<IPageInterface>>([]);

  useEffect(() => {
    if (pageData) {
      const {
        data: { documents },
      } = pageData || {};
      if (documents.length > 0) {
        const pagesArray = documents.map((document) => document.pages);
        const pages = flattenArray(pagesArray);
        setDocumentPages(pages);
      }
    }
  }, []);

  return (
    <>
      {documentPages.map((page: IPageInterface) => (
        <Preview
          key={page.id}
          page={page}
          selectedFields={selectedFields}
          hoveredField={hoveredField}
        />
      ))}
    </>
  );
};

export default DocumentPreview;
