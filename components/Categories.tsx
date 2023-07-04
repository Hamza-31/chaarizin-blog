import React, { FC } from "react";
import CategoryCheckbox from "./forms/CategoryCheckbox";
import axios from "@/lib/axios";
import qs from "@/lib/queryString";


const getCategories = async () => {
	const params = qs.stringify(
		{
			fields: [
				"id",
				"name"
			]
		},
		{
			encodeValuesOnly: true, // prettify URL
		})
	try {
		const res = await axios.get(`/api/categories?${params}`)
		const { data } = res.data;
		const categories = data.map(({ id, attributes }: { id: number, attributes: Record<string, any> }) => {
			return { id, ...attributes };
		});
		return {
			categories: categories ?? []
		};
	} catch (error) {
		console.log("Error Fetching Categories: ", error);
		return {
			categories: []
		};
	}
}

const Categories = async () => {
	const { categories } = await getCategories()
	return (
		<nav>
			<ul className="flex justify-between flex-wrap px-2 absolute inset-x-0 bottom-4  mx-auto md:w-10/12 w-full">
				{categories.map((category: { name: string, id: number }) => (
					<li key={category.name} className=" text-center ">
						{/* {category.name} */}
						<CategoryCheckbox category={category} />
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Categories;
