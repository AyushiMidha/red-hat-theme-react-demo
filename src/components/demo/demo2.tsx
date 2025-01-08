import React from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionToggle, Card, Title, Alert, CardTitle, CardBody, CardFooter, ExpandableSection, Button, Modal, ModalHeader, ModalBody, ModalFooter, Popover, Pagination, Skeleton } from '@patternfly/react-core';

const Demo2: React.FunctionComponent = () => {
  const [expanded, setExpanded] = React.useState('def-list-toggle2');
  const [isExpanded1, setIsExpanded1] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen(!isModalOpen);
  };

  const onToggle1 = (_event: React.MouseEvent, isExpanded: boolean) => {
    setIsExpanded1(isExpanded);
  };


  const onToggle = (id: string) => {
    if (id === expanded) {
      setExpanded('');
    } else {
      setExpanded(id);
    }
  };

  return (
    <>
        <Title headingLevel="h2">Accordion</Title>
        <Card>
            <Accordion asDefinitionList>
            <AccordionItem isExpanded={expanded === 'def-list-toggle1'}>
                <AccordionToggle
                onClick={() => {
                    onToggle('def-list-toggle1');
                }}
                id="def-list-toggle1"
                >
                Item one
                </AccordionToggle>
                <AccordionContent id="def-list-expand1">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem isExpanded={expanded === 'def-list-toggle2'}>
                <AccordionToggle
                onClick={() => {
                    onToggle('def-list-toggle2');
                }}
                id="def-list-toggle2"
                >
                Item two
                </AccordionToggle>
                <AccordionContent id="def-list-expand2">
                <p>
                    Vivamus et tortor sed arcu congue vehicula eget et diam. Praesent nec dictum lorem. Aliquam id diam
                    ultrices, faucibus erat id, maximus nunc.
                </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem isExpanded={expanded === 'def-list-toggle3'}>
                <AccordionToggle
                onClick={() => {
                    onToggle('def-list-toggle3');
                }}
                id="def-list-toggle3"
                >
                Item three
                </AccordionToggle>
                <AccordionContent id="def-list-expand3">
                <p>Morbi vitae urna quis nunc convallis hendrerit. Aliquam congue orci quis ultricies tempus.</p>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </Card>
        <Title headingLevel="h2">Alert</Title>
        <Card>
            <Alert title="Custom alert title" ouiaId="CustomAlert" />
            <Alert variant="success" title="Success alert title" ouiaId="SuccessAlert" />
            <Alert variant="warning" title="Warning alert title" ouiaId="WarningAlert" />
            <Alert variant="danger" title="Danger alert title" ouiaId="DangerAlert" />
        </Card>
        <Title headingLevel="h2">Card</Title>
        <Card>
            <Card ouiaId="BasicCard">
                <CardTitle>Title</CardTitle>
                <CardBody>Body</CardBody>
                <CardFooter>Footer</CardFooter>
            </Card>
        </Card>
        <Title headingLevel='h2'>Expandable Section</Title>
        <Card>
            <ExpandableSection toggleText={isExpanded1 ? 'Show less' : 'Show more'} onToggle={onToggle1} isExpanded={isExpanded1}>
                This content is visible only when the component is expanded.
            </ExpandableSection>
        </Card>
        <Title headingLevel='h2'>Modal</Title>
        <Card>
            <Button variant="primary" onClick={handleModalToggle} ouiaId="ShowBasicModal">
            Show basic modal
            </Button>
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                ouiaId="BasicModal"
                aria-labelledby="basic-modal-title"
                aria-describedby="modal-box-body-basic"
            >
                <ModalHeader title="Basic modal" labelId="basic-modal-title" />
                <ModalBody id="modal-box-body-basic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
                </ModalBody>
                <ModalFooter>
                <Button key="confirm" variant="primary" onClick={handleModalToggle}>
                    Confirm
                </Button>
                <Button key="cancel" variant="link" onClick={handleModalToggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </Card>
        <Title headingLevel='h2'>Popover</Title>
        <Card>
            <Popover
                    aria-label="Basic popover"
                    headerContent={<div>Popover header</div>}
                    bodyContent={<div>Popovers are triggered by click rather than hover.</div>}
                    footerContent="Popover footer">
                <Button>Toggle popover</Button>
            </Popover>
        </Card>
        <Title headingLevel='h2'>Pagination</Title>
        <Card>
            <Pagination
                itemCount={523}
                perPage={perPage}
                page={page}
                onSetPage={onSetPage}
                widgetId="top-example"
                onPerPageSelect={onPerPageSelect}
                ouiaId="PaginationTop"/>
        </Card>
        <Title headingLevel='h2'>Skeleton</Title>
        <Card>
            <Skeleton width="25%" screenreaderText="Loaded 25% of content" />
            <br />
            <Skeleton width="33%" screenreaderText="Loaded 33% of content" />
            <br />
            <Skeleton width="50%" screenreaderText="Loaded 50% of content" />
            <br />
            <Skeleton width="66%" screenreaderText="Loaded 66% of content" />
            <br />
            <Skeleton width="75%" screenreaderText="Loaded 75% of content" />
            <br />
            <Skeleton />
        </Card>
    </>
  );
};

export default Demo2;