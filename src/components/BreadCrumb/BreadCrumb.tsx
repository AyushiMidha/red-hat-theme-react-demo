import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';

const PfBreadcrumb: React.FunctionComponent = () => (
  <Breadcrumb ouiaId="Breadcrumb">
    <BreadcrumbItem to="#">Section home</BreadcrumbItem>
    <BreadcrumbItem to="#">Section title</BreadcrumbItem>
    <BreadcrumbItem to="#">Section title</BreadcrumbItem>
    <BreadcrumbItem to="#" isActive>
      Section landing
    </BreadcrumbItem>
  </Breadcrumb>
);

export default PfBreadcrumb;