import { AlertProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type alertSnackType = {
  message: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  varient: AlertProps;
};
