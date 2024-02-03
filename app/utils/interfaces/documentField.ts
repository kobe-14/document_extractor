export interface IDocField {
  acc: number;
  content?: {
    confidence: number;
    is_valid_format: boolean;
    orig_value: string;
    page: number;
    position: number[];
    position_label?: any[];
    review_required: boolean;
    validation_source: string;
    value: string;
  };
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract: number;
  id_auto_extract_label: string;
  ignore: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  org_id: string;
  p_title: string;
  p_type: string;
  parent_id: number;
  time_spent: number;
  type: string;
  user_id: string;
  children?: any;
  color: string;
}

export interface IFieldComoponent {
  field: IDocField;
  checked: boolean;
  handleSelectedFields: Function;
  deleteHandler: Function;
}

export interface ISelectedFields {
  id: number;
  position: number[];
  color: string;
}

export interface IFieldsViewComponent {
  handleSelectedFields: Function;
  selectedFields: Array<ISelectedFields>;
  handleSelectAllFields: Function;
}

export interface IDocumentPreviewComponent {
  selectedFields: Array<ISelectedFields>;
}

export interface IPageInterface {
  id: number;
  image: {
    url: string;
    height: number;
    width: number;
  };
}

export interface IPreviewComponent {
  page: IPageInterface;
  selectedFields: Array<ISelectedFields>;
}
