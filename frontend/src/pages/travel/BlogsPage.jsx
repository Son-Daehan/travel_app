import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/reducers/BlogSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogsPage = () => {
	const dispatch = useDispatch();
	const { blogs } = useSelector((state) => state.blog);

	useEffect(() => {
		dispatch(getAllBlogs());
	}, []);

	return (
		<div>
			{blogs &&
				blogs.map((blog) => {
					return (
						<>
							<h3>{blog.title}</h3>
							<h4>{blog.category}</h4>
							<h4>{blog.user}</h4>
							<p>{blog.description}</p>
							<Link to={`/blogs/${blog.id}`}>Click for more detail</Link>
						</>
					);
				})}
			<Link to="/blogs/create">Create a blog</Link>
		</div>
	);
};

export default BlogsPage;
