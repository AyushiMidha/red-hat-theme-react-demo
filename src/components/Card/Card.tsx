import { FC } from 'react';
import { Card, CardTitle, CardBody, CardFooter } from '@patternfly/react-core';

const PfCard:FC = () => (
  <Card ouiaId="PfCard">
    <CardTitle>Hack Day</CardTitle>
    <CardBody>PatternFly 6</CardBody>
    <CardFooter>Betterment</CardFooter>
  </Card>
);

export default PfCard;
