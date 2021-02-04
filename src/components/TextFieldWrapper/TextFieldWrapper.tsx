import {FieldAttributes, useField} from "formik";
import React, {ReactElement} from "react";
import {TextField} from "@material-ui/core";

type MyFieldProps = {
    variant?: "filled" | "standard" | "outlined";
    margin?: 'dense' | 'none' | 'normal';
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    multiline?:boolean;
    rows?: number;
    rowsMax?: number
} & FieldAttributes<{}>;

const TextFieldWrapper: React.FC<MyFieldProps> = ({ placeholder, variant, margin,label, type, disabled, multiline, rows, rowsMax, ...props}): ReactElement => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return <TextField
        placeholder={placeholder}
        fullWidth
        type={type}
        multiline={multiline}
        disabled={disabled}
        label={label}
        variant={variant}
        rows={rows}
        rowsMax={rowsMax}
        margin={margin}
        {...field}
        helperText={errorText}
        error={!!errorText}
    />;
};

export default TextFieldWrapper;