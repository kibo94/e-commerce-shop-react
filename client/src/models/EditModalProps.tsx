import { ChangeEventHandler } from "react";
import { ItemModel } from "./Item";

export interface EditModalProps {
    item:any,
    closeModal: () => void;
    onChangeItemName: any
    updateItem: any
}