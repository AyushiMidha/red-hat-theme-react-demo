import { Card, CardTitle, Page,Title } from "@patternfly/react-core";
import { FC } from "react";
import { Link } from "react-router-dom";


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
        <Title headingLevel="h1">All Components</Title>
        {allComponents.map((component)=>
            <Link to={component.path}>
                <Card>
                    <CardTitle>{component.title}</CardTitle>
                </Card>
            </Link>
        )}
    </>)
}

export default HomePage;