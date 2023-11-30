import { createBrowserRouter,RouterProvider}  from "react-router-dom";

import Main from "./layouts/Main";

import Index from "./pages/Index";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";

import loginLoader from "./utils/isLogin";

const App = () =>{
	const router = createBrowserRouter([
		{
			path : "/",
			element : <Main/>,
			children : [
				{
					index: true,
					element : <Index/>,
				},
				{
					path : "/create",
					element : <Create/>,
					loader : loginLoader,
				},
				{
					path : "/edit/:id",
					element : <Edit/>,
					loader : loginLoader,
				},
				{
					path : "/notes/:id",
					element : <Details/>,
				},
				{
					path : "/register",
					element : <Register/>,
				},
				{
					path : "/login",
					element : <Login/>
				}
			]
		}
	])
	return <RouterProvider router={router} />
};

export default App;