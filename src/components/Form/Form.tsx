import React from 'react';
import {
  Form,
  FormGroup,
  TextInput,
  Checkbox,
  Popover,
  ActionGroup,
  Button,
  Radio,
  HelperText,
  HelperTextItem,
  FormHelperText,
  FormGroupLabelHelp,
  Title,
  InputGroup,
  InputGroupItem,
  Grid,
  GridItem,
  Select,
  SelectList,
  SelectOption,
  MenuToggle,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities
} from '@patternfly/react-core';


const initialSelectOptions = [
  { value: 'Alabama', children: 'Alabama' },
  { value: 'Florida', children: 'Florida' },
  { value: 'New Jersey', children: 'New Jersey' },
  { value: 'New Mexico', children: 'New Mexico' },
  { value: 'New York', children: 'New York' },
  { value: 'North Carolina', children: 'North Carolina' }
];


const PfForm: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState<string>('');
  const [filterValue, setFilterValue] = React.useState<string>('');
  const [selectOptions, setSelectOptions] = React.useState<SelectOptionProps[]>(initialSelectOptions);
  const [focusedItemIndex, setFocusedItemIndex] = React.useState<number | null>(null);
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
  const textInputRef = React.useRef<HTMLInputElement>();

  const NO_RESULTS = 'no results';

  React.useEffect(() => {
    let newSelectOptions = initialSelectOptions;

    // Filter menu items based on the text input value when one exists
    if (filterValue) {
      newSelectOptions = initialSelectOptions.filter((menuItem) =>
        String(menuItem.children).toLowerCase().includes(filterValue.toLowerCase())
      );

      // When no options are found after filtering, display 'No results found'
      if (!newSelectOptions.length) {
        newSelectOptions = [
          { isAriaDisabled: true, children: `No results found for "${filterValue}"`, value: NO_RESULTS }
        ];
      }

      // Open the menu when the input value changes and the new value is not empty
      if (!isOpen) {
        setIsOpen(true);
      }
    }

    setSelectOptions(newSelectOptions);
  }, [filterValue]);

  const createItemId = (value: any) => `select-typeahead-${value.replace(' ', '-')}`;

  const setActiveAndFocusedItem = (itemIndex: number) => {
    setFocusedItemIndex(itemIndex);
    const focusedItem = selectOptions[itemIndex];
    setActiveItemId(createItemId(focusedItem.value));
  };

  const resetActiveAndFocusedItem = () => {
    setFocusedItemIndex(null);
    setActiveItemId(null);
  };

  const closeMenu = () => {
    setIsOpen(false);
    resetActiveAndFocusedItem();
  };

  const onInputClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (!inputValue) {
      closeMenu();
    }
  };

  const selectOption = (value: string | number, content: string | number) => {
    // eslint-disable-next-line no-console
    console.log('selected', content);

    setInputValue(String(content));
    setFilterValue('');
    setSelected(String(value));

    closeMenu();
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    if (value && value !== NO_RESULTS) {
      const optionText = selectOptions.find((option) => option.value === value)?.children;
      selectOption(value, optionText as string);
    }
  };

  const onTextInputChange = (_event: React.FormEvent<HTMLInputElement>, value: string) => {
    setInputValue(value);
    setFilterValue(value);

    resetActiveAndFocusedItem();

    if (value !== selected) {
      setSelected('');
    }
  };

  const handleMenuArrowKeys = (key: string) => {
    let indexToFocus = 0;

    if (!isOpen) {
      setIsOpen(true);
    }

    if (selectOptions.every((option) => option.isDisabled)) {
      return;
    }

    if (key === 'ArrowUp') {
      // When no index is set or at the first index, focus to the last, otherwise decrement focus index
      if (focusedItemIndex === null || focusedItemIndex === 0) {
        indexToFocus = selectOptions.length - 1;
      } else {
        indexToFocus = focusedItemIndex - 1;
      }

      // Skip disabled options
      while (selectOptions[indexToFocus].isDisabled) {
        indexToFocus--;
        if (indexToFocus === -1) {
          indexToFocus = selectOptions.length - 1;
        }
      }
    }

    if (key === 'ArrowDown') {
      // When no index is set or at the last index, focus to the first, otherwise increment focus index
      if (focusedItemIndex === null || focusedItemIndex === selectOptions.length - 1) {
        indexToFocus = 0;
      } else {
        indexToFocus = focusedItemIndex + 1;
      }

      // Skip disabled options
      while (selectOptions[indexToFocus].isDisabled) {
        indexToFocus++;
        if (indexToFocus === selectOptions.length) {
          indexToFocus = 0;
        }
      }
    }

    setActiveAndFocusedItem(indexToFocus);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const focusedItem = focusedItemIndex !== null ? selectOptions[focusedItemIndex] : null;

    switch (event.key) {
      case 'Enter':
        if (isOpen && focusedItem && focusedItem.value !== NO_RESULTS && !focusedItem.isAriaDisabled) {
          selectOption(focusedItem.value, focusedItem.children as string);
        }

        if (!isOpen) {
          setIsOpen(true);
        }

        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        handleMenuArrowKeys(event.key);
        break;
    }
  };

  const onToggleClick = () => {
    setIsOpen(!isOpen);
    textInputRef?.current?.focus();
  };

  const onClearButtonClick = () => {
    setSelected('');
    setInputValue('');
    setFilterValue('');
    resetActiveAndFocusedItem();
    textInputRef?.current?.focus();
  };

  const toggle = (toggleRef:any) => (
    <MenuToggle
      ref={toggleRef}
      variant="default"
      aria-label="Typeahead menu toggle"
      onClick={onToggleClick}
      isExpanded={isOpen}
      isFullWidth
    >
    
    </MenuToggle>
  );
  return (
    <>
<Title headingLevel="h2">Login information</Title>
<br/>
    <Form isWidthLimited>
      <FormGroup
        label="Choose a Red Hat login"
        isRequired
        fieldId="simple-form-name-02"
      >
        <TextInput
          isRequired
          type="text"
          id="simple-form-name-02"
          name="simple-form-name-02"
          aria-describedby="simple-form-name-02-helper"
          value={""}
          onChange={()=>{}}
        />
      
          Your login is a user ID for accessing your account across all Red Hat sites. It must be at least 5 characters and <b>cannot be changed once created</b>.
    
      </FormGroup>
      <FormGroup label={"Choose a password"} isRequired fieldId="pf-login-password-id">
      <TextInput
          isRequired
          type="password"
          id="simple-form-name-02"
          name="simple-form-name-02"
          aria-describedby="simple-form-name-02-helper"
          value={""}
          onChange={()=>{}}
        />
     <HelperText>
      <HelperTextItem variant="indeterminate">Must be at least 14 characters: indeterminate status</HelperTextItem>
    </HelperText>
    <HelperText>
      <HelperTextItem variant="indeterminate">Must include at least 3 of the following: lowercase letter, uppercase letters, numbers, symbols: indeterminate status</HelperTextItem>
    </HelperText>
    <HelperText>
      <HelperTextItem variant="indeterminate">Must include at least 3 of the following: lowercase letter, uppercase letters, numbers, symbols: indeterminate status;
      Cannot contain the word(s) "redhat" or "password"</HelperTextItem>
    </HelperText>

      </FormGroup>
      <FormGroup label={"Confirm Password"} isRequired fieldId="pf-login-password-id">
      <TextInput
          isRequired
          type="password"
          id="simple-form-name-02"
          name="simple-form-name-02"
          aria-describedby="simple-form-name-02-helper"
          value={''}
          onChange={()=>{}}
        />
    
      
      </FormGroup>
      <Title headingLevel='h3'> Personal Information</Title>
<Grid hasGutter>
  <GridItem span={6}>
  <FormGroup
        label="First Name"
        isRequired
        fieldId="simple-form-name-02"
      >
        <TextInput
          isRequired
          type="text"
          id="simple-form-name-02"
          name="simple-form-name-02"
          aria-describedby="simple-form-name-02-helper"
          value={""}
          onChange={()=>{}}
        />
      </FormGroup>
  </GridItem>
  <GridItem span={6}>
  <FormGroup
        label="Last Name"
        isRequired
        fieldId="simple-form-name-02"
      >
        <TextInput
          isRequired
          type="text"
          id="simple-form-name-02"
          name="simple-form-name-02"
          aria-describedby="simple-form-name-02-helper"
          value={""}
          onChange={()=>{}}
        />
      </FormGroup>
  </GridItem>
</Grid>


<Grid hasGutter>
  <GridItem span={8}>
      <FormGroup label="Email" isRequired fieldId="simple-form-email-02">
        <TextInput
          isRequired
          type="email"
          id="simple-form-email-02"
          name="simple-form-email-02"
          value={""}
          onChange={()=>{}}
        />
      </FormGroup>
      </GridItem>
      <GridItem span={4}>
      <FormGroup label="Phone number" isRequired fieldId="simple-form-number">
        <TextInput
          isRequired
          type="tel"
          placeholder="555-555-5555"
          id="simple-form-number"
          name="simple-form-number"
          value={""}
          onChange={()=>{}}
        />
      </FormGroup>
      </GridItem >

      </Grid>
      <FormGroup label="Department" isRequired>
      <Select
      id="typeahead-select"
      isOpen={isOpen}
      selected={selected}
      onSelect={onSelect}
      onOpenChange={(isOpen) => {
        !isOpen && closeMenu();
      }}
      shouldFocusFirstItemOnOpen={false}
      toggle={toggle}
    >
      <SelectList id="select-typeahead-listbox">
        {selectOptions.map((option, index) => (
          <SelectOption
            key={option.value || option.children}
            isFocused={focusedItemIndex === index}
            className={option.className}
            id={createItemId(option.value)}
            {...option}
            ref={null}
          />
        ))}
      </SelectList>
    </Select>
    </FormGroup>
    {/* <FormGroup label="Job Role" isRequired>
      <Select
      id="typeahead-select"
      isOpen={isOpen}
      selected={selected}
      onSelect={onSelect}
      onOpenChange={(isOpen) => {
        !isOpen && closeMenu();
      }}
      shouldFocusFirstItemOnOpen={false}
      toggle={toggle}
    >
      <SelectList id="select-typeahead-listbox">
        {selectOptions.map((option, index) => (
          <SelectOption
            key={option.value || option.children}
            isFocused={focusedItemIndex === index}
            className={option.className}
            id={createItemId(option.value)}
            {...option}
            ref={null}
          />
        ))}
      </SelectList>
    </Select>
    </FormGroup> */}
      <Title headingLevel='h3'>Account type</Title>

    
      <FormGroup role="radiogroup" isRequired fieldId="limit-width-form-radio-group" label="Choose account type">
        <Radio name="limit-width-radio" label="Corporate" id="limit-width-inline-radio-01" description="Allows a set of users within your organization to centrally make purchases or administer systems" />
  <br/>
        <Radio name="limit-width-radio" label="Personal" id="limit-width-inline-radio-02" description="For purchasing or administering your own personal systems" />
      </FormGroup>
      <ActionGroup>
        <Button variant="primary">Create my account</Button>
        <Button variant="link">Back to login page</Button>
      </ActionGroup>
    </Form>
    </>
  );
};

export default PfForm; 