import {FieldAttributes, useField} from "formik";
import React, {ReactElement} from "react";
import {TextField} from "@material-ui/core";

type MyFieldProps = {
    variant?: "filled" | "standard" | "outlined";
    margin?: 'dense' | 'none' | 'normal';
    label?: string;
    placeholder?: string;
} & FieldAttributes<{}>;

const TextFieldWrapper: React.FC<MyFieldProps> = ({ placeholder, variant, margin,label, type , ...props}): ReactElement => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return <TextField
        placeholder={placeholder}
        fullWidth
        type={type}
        label={label}
        variant={variant}
        margin={margin}
        {...field}
        helperText={errorText}
        error={!!errorText}
    />;
};

export default TextFieldWrapper;