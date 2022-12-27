import { ChangeEventHandler } from "react";

export interface EditModalProps {
    name:string,
    closeModal: () => void;
    onChangeItemName: any
    updateItem: any
}