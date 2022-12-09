import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBlogsByRestaurant } from "../../redux/reducers/BlogSlice";

const RestaurantBlogs = () => {
	const { restaurantID } = useParams();
	const dispatch = useDispatch();

	const { blogs } = useSelector((state) => state.blog);

	console.log(restaurantID);

	useEffect(() => {
		dispatch(getBlogsByRestaurant({ restaurantID: restaurantID }));
	}, []);

	return (
		<div className="restaurant-blogs-container">
			<div>
				<img />
			</div>
			<div>
				{blogs &&
					blogs.map((blog) => {
						return (
							<>
								<div>{blog.title}</div>
								<div>{blog.description}</div>
								<div>{blog.category}</div>
								{/* <div>{blog.title}</div> */}
							</>
						);
					})}
			</div>
			<Link to={`/blogs/${restaurantID}/create`}>Create a blog!</Link>
		</div>
	);
};

export default RestaurantBlogs;
