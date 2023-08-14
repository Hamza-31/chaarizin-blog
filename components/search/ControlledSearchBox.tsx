
'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, FormEvent, RefObject } from 'react'

export type ControlledSearchBoxProps = React.ComponentProps<'div'> & {
	inputRef: RefObject<HTMLInputElement>;
	onChange(event: ChangeEvent): void;
	onReset(event: FormEvent): void;
	onSubmit?(event: FormEvent): void;
	placeholder?: string;
	value: string;
};

const ControlledSearchBox = ({
	inputRef,
	onChange,
	onReset,
	onSubmit,
	placeholder,
	value,
	...props
}: ControlledSearchBoxProps) => {

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		e.stopPropagation();
		if (onSubmit) {
			onSubmit(e);
		}

		if (inputRef.current) {
			inputRef.current.blur();
		}
	}

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		event.stopPropagation();

		onReset(event);

		if (inputRef.current) {
			inputRef.current.focus();
		}
	}
	return (
		<form
			onReset={handleReset}
			onSubmit={handleSubmit}
		>
			<label htmlFor="query" className="mb-2 text-sm font-medium relative flex justify-end">

				<input
					ref={inputRef}
					onChange={onChange}
					type="search"
					id="query"
					value={value}
					name='query'
					className="opacity-70 w-[300px]  hover:opacity-100 focus:outline-none focus:opacity-100 transition ease-in-out duration-200 bg-beige text-dark-purple block p-4 text-sm" placeholder="Moisture, Oil ..." required />
			</label>
		</form>
	)
}

export default ControlledSearchBox









