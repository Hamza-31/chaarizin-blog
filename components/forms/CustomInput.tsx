'use client'
import { FieldHookConfig, useField } from "formik";
import React, { FC, HTMLProps } from "react";

interface CustomInputProps extends HTMLProps<HTMLInputElement> {
	label: string;
	htmlFor: string;
	bg: string;
}

const CustomInput: FC<CustomInputProps> = ({ label, htmlFor, bg, ...props }) => {
	const [field, meta] = useField(props as FieldHookConfig<any>);
	return (
		<>
			<div>
				<label htmlFor={htmlFor} className="block mb-2 text-sm font-medium">
					{label}
				</label>
				<input
					{...field}
					{...props}
					className={`text-dark-purple outline-none sm:text-sm rounded-lg block w-full p-2.5 ${bg ? bg : "bg-beige"}`}
					required
				/>
				{meta.error && meta.touched && (
					<span className="text-red">{meta.error}</span>

				)}
			</div>
		</>
	);
};

export default CustomInput;
