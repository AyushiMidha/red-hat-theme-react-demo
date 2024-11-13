import { Card, CardTitle, Page,Title } from "@patternfly/react-core";
import { FC } from "react";
import { Link } from "react-router-dom";
import PfForm from "../../components/Form/Form";


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
        <PfForm></PfForm>
    </>)
}

export default HomePage;