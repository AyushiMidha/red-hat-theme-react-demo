import ReactDOM  from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.scss'
import HomePage from './views/Homepage/HomePage'
import PfButton from "./components/Button/Button";
import PfBreadcrumb from "./components/BreadCrumb/BreadCrumb";
import PfForm from "./components/Form/Form";
import PfAccordion from "./components/Accordion/Accordion";
import PfCard from "./components/Card/Card";
import 'rhds-theme/dist/rhds-theme.css';

function App() {

  return (
    <div className="app">
      
      <Outlet />
    </div>
  )
}

const AppRoutes = createBrowserRouter([{
  path: '/',
  element: <App/>,
  children:[
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/button",
      element: <PfButton/>
    },
    {
      path: "/breadcrumb",
      element: <PfBreadcrumb/>
    },
    {
      path: "/form",
      element: <PfForm/>
    },
    {
      path: "/accordion",
      element: <PfAccordion/>
    },
    {
      path: "/card",
      element: <PfCard/>
    }
  ]
}])

const root= ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<RouterProvider router={AppRoutes}/>)
