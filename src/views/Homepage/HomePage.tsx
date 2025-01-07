import { Card, CardTitle, Page,Title } from "@patternfly/react-core";
import { FC } from "react";
import { Link } from "react-router-dom";
import PfForm from "../../components/Form/Form";
import Demo1 from '../../components/demo/demo1';



const allComponents = [
    {
      path: "/button",
      title: "Button"
    },
    {
      path: "/breadcrumb",
      title: "BreadCrumb"
    },
    {
      path: "/form",
      title: "Form"
    },
    {
      path: "/accordion",
      title: "Accordion"
    },
    {
      path: "/card",
      title: "Card"
    }
  ]

const HomePage:FC=()=>{
    return (<>
        <Demo1></Demo1>
    </>)
}

export default HomePage;