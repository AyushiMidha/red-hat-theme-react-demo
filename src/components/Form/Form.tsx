import React, { FC, FormEvent } from 'react';
import {
  Form,
  FormGroup,
  TextInput,
  Select, 
  SelectOption, 
  SelectList, 
  MenuToggle, 
  MenuToggleElement,
  Checkbox,
  ActionGroup,
  Button,
  Radio,
  HelperText,
  HelperTextItem,
  FormHelperText,
  Card,
  CardBody,
  CardTitle
} from '@patternfly/react-core';
import './Form.scss';

const PfForm: FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [formValue, setFormValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('Select a value');
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const onChange = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
    setFormValue(value);
  };

  const options = [
    { value: '', label: 'Select a number', disabled: false, isPlaceholder: true },
    { value: '1', label: 'One', disabled: false, isPlaceholder: false },
    { value: '2', label: 'Two', disabled: false, isPlaceholder: false },
    { value: '3', label: 'Three - the only valid option', disabled: false, isPlaceholder: false }
  ];

  const handleNameChange = (_event: FormEvent<HTMLInputElement>, name: string) => {
    setName(name);
  };

  const handleEmailChange = (_event: FormEvent<HTMLInputElement>, email: string) => {
    setEmail(email);
  };

  const handlePhoneChange = (_event: FormEvent<HTMLInputElement>, phone: string) => {
    setPhone(phone);
  };

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    // eslint-disable-next-line no-console
    console.log('selected', value);

    setSelected(value as string);
    setIsOpen(false);
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggleClick}
      isExpanded={isOpen}
      isDisabled={isDisabled}
      style={
        {
          width: '200px'
        } as React.CSSProperties
      }
    >
      {selected}
    </MenuToggle>
  );

  return (
    <Card>
      <CardTitle>Patternfly 6 Form with RHDS theme</CardTitle>
      <CardBody>
        <Form>
          <FormGroup
            label="Full name"
            isRequired
          >
            <TextInput
              isRequired
              type="text"
              id="simple-form-name-01"
              name="simple-form-name-01"
              aria-describedby="simple-form-name-01-helper"
              value={name}
              onChange={handleNameChange}
            />
            <FormHelperText>
              <HelperText>
                <HelperTextItem>Include your middle name if you have one.</HelperTextItem>
              </HelperText>
            </FormHelperText>
          </FormGroup>
          <FormGroup label="Email" isRequired fieldId="simple-form-email-01">
            <TextInput
              isRequired
              type="email"
              id="simple-form-email-01"
              name="simple-form-email-01"
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroup>
          <FormGroup label="Phone number" isRequired fieldId="simple-form-phone-01">
            <TextInput
              isRequired
              type="tel"
              id="simple-form-phone-01"
              name="simple-form-phone-01"
              placeholder="555-555-5555"
              value={phone}
              onChange={handlePhoneChange}
            />
          </FormGroup>
          <FormGroup label="Selection:" type="string" fieldId="selection">
            <Select
              id="single-select"
              isOpen={isOpen}
              selected={selected}
              onSelect={onSelect}
              onOpenChange={(isOpen) => setIsOpen(isOpen)}
              toggle={toggle}
              shouldFocusToggleOnSelect
            >
              <SelectList>
                <SelectOption value="Option 1">Option 1</SelectOption>
                <SelectOption value="Option 2">Option 2</SelectOption>
                <SelectOption value="Option 3">Option 3</SelectOption>
              </SelectList>
            </Select>
          </FormGroup>
          <ActionGroup>
            <Button variant="primary">Submit</Button>
            <Button variant="link">Cancel</Button>
          </ActionGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default PfForm;