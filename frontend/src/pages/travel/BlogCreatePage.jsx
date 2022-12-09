import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createBlog } from "../../redux/reducers/BlogSlice";

const BlogCreatePage = () => {
	const [inputTitle, setInputTitle] = useState(null);
	const [inputCategory, setInputCategory] = useState(null);
	const [inputDescription, setInputDescription] = useState(null);
	const [inputText, setInputText] = useState(null);

	const dispatch = useDispatch();
	const { restaurantID } = useParams();

	const handleCreateBlog = () => {
		const data = {
			title: inputTitle,
			category: inputCategory,
			description: inputDescription,
			text: inputText,
			restaurantID: restaurantID,
		};

		dispatch(createBlog(data));
	};

	return (
		<div>
			<input
				placeholder="title"
				onChange={(event) => setInputTitle(event.target.value)}
			/>
			<input
				placeholder="category"
				onChange={(event) => setInputCategory(event.target.value)}
			/>
			<input
				placeholder="description"
				onChange={(event) => setInputDescription(event.target.value)}
			/>
			<input
				placeholder="text"
				onChange={(event) => setInputText(event.target.value)}
			/>
			<button onClick={handleCreateBlog}>Create a Blog</button>
		</div>
	);
};

export default BlogCreatePage;
