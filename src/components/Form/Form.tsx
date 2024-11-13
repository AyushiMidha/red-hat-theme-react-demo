import React, {FC, FormEvent } from 'react';
import {
  Form,
  FormGroup,
  TextInput,
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

const PfForm: FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const handleNameChange = (_event:FormEvent<HTMLInputElement>, name: string) => {
    setName(name);
  };

  const handleEmailChange = (_event:FormEvent<HTMLInputElement>, email: string) => {
    setEmail(email);
  };

  const handlePhoneChange = (_event:FormEvent<HTMLInputElement>, phone: string) => {
    setPhone(phone);
  };

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
        <FormGroup role="group" isInline fieldId="basic-form-checkbox-group" label="How can we contact you?">
          <Checkbox label="Email" aria-label="Email" id="inlinecheck01" />
          <Checkbox label="Phone" aria-label="Phone" id="inlinecheck02" />
          <Checkbox label="Mail" aria-label="Mail" id="inlinecheck03" />
        </FormGroup>
        <FormGroup role="radiogroup" isInline fieldId="basic-form-radio-group" label="Time zone">
          <Radio name="basic-inline-radio" label="Eastern" id="basic-inline-radio-01" />
          <Radio name="basic-inline-radio" label="Central" id="basic-inline-radio-02" />
          <Radio name="basic-inline-radio" label="Pacific" id="basic-inline-radio-03" />
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