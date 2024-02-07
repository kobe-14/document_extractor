import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import fieldsData from "@/app/utils/data/sections.json";
import {
  IDocField,
  IFieldsViewComponent,
  ISelectedFields,
} from "@/app/utils/interfaces/documentField";
import { flatten, generateRandomRgb } from "@/app/utils/helpers/common";
import Field from "./Field";

const FieldsViewer = ({
  handleSelectedFields,
  selectedFields,
  handleSelectAllFields,
  handleMouseEnter,
  handleMouseLeave,
}: IFieldsViewComponent) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [docFields, setDocFields] = useState<Array<IDocField>>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);

  useEffect(() => {
    const flattenData = flatten(fieldsData?.data?.sections);
    const filteredData = flattenData
      .filter((data: any) => !data.children)
      .map((data: any) => {
        if (!data.children) {
          return { ...data, color: generateRandomRgb() };
        }
      });
    setDocFields(filteredData);
  }, []);

  const selectAll = useCallback(() => {
    if (docFields) {
      if (selectedFields.length > 0) {
        handleSelectAllFields([]);
      } else {
        const selectedDocFields = docFields.map((data: IDocField) => ({
          position: data.content?.position,
          id: data.id,
          color: data.color,
        }));
        handleSelectAllFields(selectedDocFields);
      }
    }
  }, [JSON.stringify(docFields), JSON.stringify(selectedFields)]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const toggleConfirmModal = () =>
    setShowConfirmModal((prevState) => !prevState);
  const toggleMessageModal = () =>
    setShowMessageModal((prevState) => !prevState);

  const confirmFields = () => {
    toggleConfirmModal();
    toggleMessageModal();
  };

  const handleFieldDelete = (id: number) => {
    const duplicateDocFields = [...docFields];
    const docFieldIndex = duplicateDocFields.findIndex(
      (data: IDocField) => data.id === id
    );
    if (docFieldIndex > -1) {
      duplicateDocFields.splice(docFieldIndex, 1);
      const selectedFieldIndex = selectedFields.findIndex(
        (selectedField: ISelectedFields) => selectedField.id === id
      );
      if (selectedFieldIndex > -1) {
        const duplicateSelectedFields = [...selectedFields];
        duplicateSelectedFields.splice(selectedFieldIndex, 1);
        handleSelectAllFields(duplicateSelectedFields);
      }
      setDocFields(duplicateDocFields);
    }
  };

  return (
    <>
      <Box height="calc(100vh - 134px)" sx={{ overflow: "auto" }}>
        <Typography variant="h6">Fields</Typography>
        <Box>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Regular Fields" />
            <Tab label="Custom Fields" />
          </Tabs>
        </Box>
        {currentTab === 0 && (
          <Box>
            <List>
              {docFields.map((field: IDocField) => (
                <Field
                  key={field.id}
                  field={field}
                  checked={selectedFields.some(
                    (ele: ISelectedFields) => ele.id === field.id
                  )}
                  handleSelectedFields={handleSelectedFields}
                  deleteHandler={handleFieldDelete}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              ))}
            </List>
          </Box>
        )}
        {currentTab === 1 && <Typography>Custom Fields</Typography>}
      </Box>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button variant="contained" onClick={selectAll}>
          <Typography>
            {selectedFields.length > 0 ? "De-Select All" : "Select All"}
          </Typography>
        </Button>
        <Button
          variant="contained"
          onClick={toggleConfirmModal}
          disabled={selectedFields.length === 0}
        >
          Confirm
        </Button>
      </Box>
      {showConfirmModal && (
        <Dialog open={showConfirmModal} onClose={toggleConfirmModal}>
          <DialogTitle>
            <Typography>Confirmation Alert!</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to confirm the selected fields?
            </Typography>
            <Box display="flex" justifyContent="flex-end" gap={3} mt={2}>
              <Button onClick={toggleConfirmModal}>Cancel</Button>
              <Button onClick={confirmFields}>Confirm</Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      {showMessageModal && (
        <Dialog open={showMessageModal} onClose={toggleMessageModal}>
          <DialogTitle>
            <Typography>Success</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Fields confirmed and processed successfully!
            </Typography>
            <Box display="flex" justifyContent="flex-end" gap={3} mt={2}>
              <Button onClick={toggleMessageModal}>Close</Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default FieldsViewer;
