'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface Category {
	id: number,
	name: string
}

interface CategoryCheckboxProps {
	category: Category
}

const CategoryCheckbox: FC<CategoryCheckboxProps> = ({ category }) => {
	const searchParams = useSearchParams()
	const [checked, setChecked] = useState(false);
	const router = useRouter()
	const path = usePathname()

	const page = searchParams.get('page')
	const categories = searchParams.get('category')?.split(",")
	const categoryName = category.name.toLowerCase()

	const selectArticlesByCategory = (hasPage: boolean, hasCategory: boolean, checked: boolean) => {

		if (!hasCategory && !checked) {
			setChecked(true)
			if (hasPage) router.push(`${path}?category=${categoryName}`)
			if (!hasPage) router.push(`${path}?category=${categoryName}`)
		}
		if (hasCategory && !categories?.join(',')?.includes(categoryName) && !checked) {
			setChecked(true)
			if (hasPage) router.push(`${path}?category=${categories?.join(',')},${categoryName}&page=${page}`)
			if (!hasPage) router.push(`${path}?category=${categories?.join(',')},${categoryName}`)
		}
		if (hasCategory && categories?.join(',')?.includes(categoryName) && checked) {
			const newCategories = categories.filter(cat => cat !== categoryName).join(',')
			setChecked(false)
			if (hasPage) router.push(`${path}?category=${newCategories}&page=${page}`)
			if (!hasPage) router.push(`${path}${newCategories.length === 0 ? '' : '?category=' + newCategories}`)
		}
	}
	return (
		<>
			<input
				type="checkbox"
				id={category.name}
				value={category.name}
				onChange={() => {
					selectArticlesByCategory(searchParams.has('page'), searchParams.has('category'), checked);
				}}
				className="hidden peer"
				checked={checked}
			/>
			<label
				htmlFor={category.name}
				className="flex items-center text-md min-[500px]:text-lg min-[1024px]:text-xl min-[640px]:text-md justify-center p-2 underline cursor-pointer hover:text-neo-purple peer-checked:font-bold font-patrickHand rounded-md peer-checked:text-neo-purple "
			>
				<div className="block">
					<div className="w-full ">{category.name}</div>
				</div>
			</label>
		</>
	);
};

export default CategoryCheckbox;
