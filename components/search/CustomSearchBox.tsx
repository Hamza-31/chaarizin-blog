'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { UseSearchBoxProps, useSearchBox } from 'react-instantsearch-hooks-web';
import ControlledSearchBox from './ControlledSearchBox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type SearchBoxProps = React.ComponentProps<'div'> & UseSearchBoxProps;
const CustomSearchBox = (props: SearchBoxProps) => {
	// Fix Deprecated
	const { query, refine } = useSearchBox(props);
	const [value, setValue] = useState(query);
	const router = useRouter()
	const path = usePathname()
	const searchParams = useSearchParams()
	const inputRef = useRef<HTMLInputElement>(null);
	const onReset = () => {
		setValue('')
	}
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value);
		const encodedQuery = encodeURI(event.currentTarget.value)
		router.push(`${path}?q=${encodedQuery}`)
	}

	useEffect(() => {
		if (query !== value) {
			refine(value);
		}
		if (query === "" && searchParams.has('q') && searchParams.get('q')?.length === 0) {
			router.push(path)
		}
		if (query === "" && searchParams.has('q') && searchParams.get('q')?.length !== 0) {
			const decodedQuery = decodeURI(searchParams.get("q") as string)
			setValue(decodedQuery)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, refine, router, searchParams]);
	useEffect(() => {
		// updates when typing.
		if (document.activeElement !== inputRef.current && query !== value) {
			setValue(query);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);
	return (
		<ControlledSearchBox
			inputRef={inputRef}
			onChange={onChange}
			onReset={onReset}
			value={value}
		/>
	)
}

export default CustomSearchBox