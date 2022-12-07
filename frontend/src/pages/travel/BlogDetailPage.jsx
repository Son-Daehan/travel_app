import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
	const [blog, setBlog] = useState(null);

	const { blogID } = useParams();

	const handleGetBlog = async () => {
		const response = await axios.get(`/api/blogs/${blogID}`);
		console.log(response);

		setBlog(response.data.blog);
	};

	useEffect(() => {
		handleGetBlog();
	}, []);

	return (
		<div>
			{blog && (
				<>
					<div>{blog.title}</div>
					<div>{blog.text}</div>
				</>
			)}
		</div>
	);
};

export default BlogDetailPage;
