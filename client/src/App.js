// import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./Components/getUser/User";
import Added from "./Components/addUser/Added";
import Edit from "./Components/updateUser/Edit";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User/>
    },
    {
      path: "/add",
      element: <Added/>
    },
    {
      path: "/edit/:id",
      element: <Edit/>,
    },
  ]);
  return (
    <div className="App">
      <div>
        <RouterProvider router={route}>
          
        </RouterProvider>
      </div>
    </div>
  );
}

export default App;
