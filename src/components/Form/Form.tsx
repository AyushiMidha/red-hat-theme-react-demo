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
  TextInputGroupUtilities, 
  Banner, 
  Divider,
  Flex,
  DualListSelector,
  DualListSelectorPane,
  DualListSelectorList,
  DualListSelectorListItem,
  DualListSelectorControlsWrapper,
  DualListSelectorControl,
  MultipleFileUpload,
  MultipleFileUploadMain,
  MultipleFileUploadStatus,
  MultipleFileUploadStatusItem,
  FileUpload, DropEvent,
  FormSelect, FormSelectOption,
  TextArea,ValidatedOptions,
   FlexItem
} from '@patternfly/react-core';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import ExternalLinkSquareAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon';
import CopyIcon from '@patternfly/react-icons/dist/esm/icons/copy-icon';
import BellIcon from '@patternfly/react-icons/dist/esm/icons/bell-icon';
import AngleDoubleLeftIcon from '@patternfly/react-icons/dist/esm/icons/angle-double-left-icon';
import AngleLeftIcon from '@patternfly/react-icons/dist/esm/icons/angle-left-icon';
import AngleDoubleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-double-right-icon';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
import UploadIcon from '@patternfly/react-icons/dist/esm/icons/upload-icon';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';

interface readFile {
  fileName: string;
  data?: string;
  loadResult?: 'danger' | 'success';
  loadError?: DOMException;
}


interface Option {
  text: string;
  selected: boolean;
  isVisible: boolean;
}


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
  const [availableOptions, setAvailableOptions] = React.useState<Option[]>([
    { text: 'Option 1', selected: false, isVisible: true },
    { text: 'Option 2', selected: false, isVisible: true },
    { text: 'Option 3', selected: false, isVisible: true },
    { text: 'Option 4', selected: false, isVisible: true }
  ]);
  const [chosenOptions, setChosenOptions] = React.useState<Option[]>([]);

  const [isHorizontal, setIsHorizontal] = React.useState(false);
  const [fileUploadShouldFail, setFileUploadShouldFail] = React.useState(false);
  const [currentFiles, setCurrentFiles] = React.useState<File[]>([]);
  const [readFileData, setReadFileData] = React.useState<readFile[]>([]);
  const [showStatus, setShowStatus] = React.useState(false);
  const [statusIcon, setStatusIcon] = React.useState('inProgress');

  const [value, setValue] = React.useState('');
  const [filename, setFilename] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [formSelectValue, setFormSelectValue] = React.useState('mrs');

  const onChange = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
    setFormSelectValue(value);
  };

  const options = [
    { value: 'please choose', label: 'Select one', disabled: true },
    { value: 'mr', label: 'Mr', disabled: false },
    { value: 'miss', label: 'Miss', disabled: false },
    { value: 'mrs', label: 'Mrs', disabled: false },
    { value: 'ms', label: 'Ms', disabled: false },
    { value: 'dr', label: 'Dr', disabled: false },
    { value: 'other', label: 'Other', disabled: false }
  ];

  const handleFileInputChange = (_, file: File) => {
    setFilename(file.name);
  };

  const handleTextChange = (_event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => {
    setValue(value);
  };

  const handleDataChange = (_event: DropEvent, value: string) => {
    setValue(value);
  };

  const handleClear = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFilename('');
    setValue('');
  };

  const handleFileReadStarted = (_event: DropEvent, _fileHandle: File) => {
    setIsLoading(true);
  };

  const handleFileReadFinished = (_event: DropEvent, _fileHandle: File) => {
    setIsLoading(false);
  };

  // only show the status component once a file has been uploaded, but keep the status list component itself even if all files are removed
  if (!showStatus && currentFiles.length > 0) {
    setShowStatus(true);
  }

  // determine the icon that should be shown for the overall status list
  React.useEffect(() => {
    if (readFileData.length < currentFiles.length) {
      setStatusIcon('inProgress');
    } else if (readFileData.every((file) => file.loadResult === 'success')) {
      setStatusIcon('success');
    } else {
      setStatusIcon('danger');
    }
  }, [readFileData, currentFiles]);

  // remove files from both state arrays based on their name
  const removeFiles = (namesOfFilesToRemove: string[]) => {
    const newCurrentFiles = currentFiles.filter(
      (currentFile) => !namesOfFilesToRemove.some((fileName) => fileName === currentFile.name)
    );

    setCurrentFiles(newCurrentFiles);

    const newReadFiles = readFileData.filter(
      (readFile) => !namesOfFilesToRemove.some((fileName) => fileName === readFile.fileName)
    );

    setReadFileData(newReadFiles);
  };

  /** Forces uploaded files to become corrupted if "Demonstrate error reporting by forcing uploads to fail" is selected in the example,
   * only used in this example for demonstration purposes */
  const updateCurrentFiles = (files: File[]) => {
    if (fileUploadShouldFail) {
      const corruptedFiles = files.map((file) => ({ ...file, lastModified: 'foo' as unknown as number }));

      setCurrentFiles((prevFiles) => [...prevFiles, ...(corruptedFiles as any)]);
    } else {
      setCurrentFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  // callback that will be called by the react dropzone with the newly dropped file objects
  const handleFileDrop = (_event: DropEvent, droppedFiles: File[]) => {
    // identify what, if any, files are re-uploads of already uploaded files
    const currentFileNames = currentFiles.map((file) => file.name);
    const reUploads = droppedFiles.filter((droppedFile) => currentFileNames.includes(droppedFile.name));

    /** this promise chain is needed because if the file removal is done at the same time as the file adding react
     * won't realize that the status items for the re-uploaded files needs to be re-rendered */
    Promise.resolve()
      .then(() => removeFiles(reUploads.map((file) => file.name)))
      .then(() => updateCurrentFiles(droppedFiles));
  };

  // callback called by the status item when a file is successfully read with the built-in file reader
  const handleReadSuccess = (data: string, file: File) => {
    setReadFileData((prevReadFiles) => [...prevReadFiles, { data, fileName: file.name, loadResult: 'success' }]);
  };

  // callback called by the status item when a file encounters an error while being read with the built-in file reader
  const handleReadFail = (error: DOMException, file: File) => {
    setReadFileData((prevReadFiles) => [
      ...prevReadFiles,
      { loadError: error, fileName: file.name, loadResult: 'danger' }
    ]);
  };

  // add helper text to a status item showing any error encountered during the file reading process
  const createHelperText = (file: File) => {
    const fileResult = readFileData.find((readFile) => readFile.fileName === file.name);
    if (fileResult?.loadError) {
      return (
        <HelperText isLiveRegion>
          <HelperTextItem variant="error">{fileResult.loadError.toString()}</HelperTextItem>
        </HelperText>
      );
    }
  };

  const successfullyReadFileCount = readFileData.filter((fileData) => fileData.loadResult === 'success').length;


  // callback for moving selected options between lists
  const moveSelected = (fromAvailable: boolean) => {
    const sourceOptions = fromAvailable ? availableOptions : chosenOptions;
    const destinationOptions = fromAvailable ? chosenOptions : availableOptions;
    for (let i = 0; i < sourceOptions.length; i++) {
      const option = sourceOptions[i];
      if (option.selected && option.isVisible) {
        sourceOptions.splice(i, 1);
        destinationOptions.push(option);
        option.selected = false;
        i--;
      }
    }
    if (fromAvailable) {
      setAvailableOptions([...sourceOptions]);
      setChosenOptions([...destinationOptions]);
    } else {
      setChosenOptions([...sourceOptions]);
      setAvailableOptions([...destinationOptions]);
    }
  };

  // callback for moving all options between lists
  const moveAll = (fromAvailable: boolean) => {
    if (fromAvailable) {
      setChosenOptions([...availableOptions.filter((option) => option.isVisible), ...chosenOptions]);
      setAvailableOptions([...availableOptions.filter((option) => !option.isVisible)]);
    } else {
      setAvailableOptions([...chosenOptions.filter((option) => option.isVisible), ...availableOptions]);
      setChosenOptions([...chosenOptions.filter((option) => !option.isVisible)]);
    }
  };

  // callback when option is selected
  const onOptionSelect = (
    event: React.MouseEvent | React.ChangeEvent | React.KeyboardEvent,
    index: number,
    isChosen: boolean
  ) => {
    if (isChosen) {
      const newChosen = [...chosenOptions];
      newChosen[index].selected = !chosenOptions[index].selected;
      setChosenOptions(newChosen);
    } else {
      const newAvailable = [...availableOptions];
      newAvailable[index].selected = !availableOptions[index].selected;
      setAvailableOptions(newAvailable);
    }
  };

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
      <div>
      <Banner>Default banner</Banner>
        <br />
        <Banner color="red">Red banner</Banner>
        <br />
        {/* <Banner color="orangered">Orangered banner</Banner> */}
        {/* <Banner color="orange">Orange banner</Banner> */}
        <Banner color="yellow">Yellow banner</Banner>
        <br />
        <Banner color="green">Green banner</Banner>
        <br />
        {/* <Banner color="teal">Teal banner</Banner> */}
        <Banner color="blue">Blue banner</Banner>
        <br />
        {/* <Banner color="purple">Purple banner</Banner> */}
      </div>

      <Flex columnGap={{ default: 'columnGapSm' }}>
      <Button variant="primary" ouiaId="Primary">
        Primary
      </Button>
      <Button variant="secondary" ouiaId="Secondary">
        Secondary
      </Button>
      <Button variant="secondary" ouiaId="DangerSecondary" isDanger>
        Danger Secondary
      </Button>
      <Button variant="tertiary" ouiaId="Tertiary">
        Tertiary
      </Button>
      <Button variant="danger" ouiaId="Danger">
        Danger
      </Button>
      <Button variant="warning" ouiaId="Warning">
        Warning
      </Button>
    </Flex>
    <br />
    <Flex columnGap={{ default: 'columnGapSm' }}>
      <Button variant="link" icon={<PlusCircleIcon />}>
        Link
      </Button>
      <Button variant="link" icon={<ExternalLinkSquareAltIcon />} iconPosition="end">
        Link
      </Button>
      <Button variant="link" isInline>
        Inline link
      </Button>
      <Button variant="link" isDanger>
        Danger link
      </Button>
      <Button variant="plain" aria-label="Action" icon={<TimesIcon />} />
    </Flex>
    <br />
    <Flex columnGap={{ default: 'columnGapSm' }}>
      <Button variant="control">Control</Button>
      <Button variant="control" aria-label="Copy" icon={<CopyIcon />} />
    </Flex>
    <br />
    <Flex columnGap={{ default: 'columnGapSm' }}>
      <Button variant="stateful" icon={<BellIcon />} state="read">
        Stateful read
      </Button>
      <Button variant="stateful" icon={<BellIcon />} state="unread">
        Stateful unread
      </Button>
      <Button variant="stateful" icon={<BellIcon />} state="attention">
        Stateful attention
      </Button>
    </Flex>

    <Divider
      inset={{
        default: 'insetMd',
        md: 'insetNone',
        lg: 'inset3xl',
        xl: 'insetLg'
      }}
    />
    <Button>
        Toggle drawer
      </Button>
      <DualListSelector>
      <DualListSelectorPane
        title="Available options"
        status={`${availableOptions.filter((option) => option.selected && option.isVisible).length} of ${
          availableOptions.filter((option) => option.isVisible).length
        } options selected`}
      >
        <DualListSelectorList>
          {availableOptions.map((option, index) =>
            option.isVisible ? (
              <DualListSelectorListItem
                key={index}
                isSelected={option.selected}
                id={`basic-available-option-${index}`}
                onOptionSelect={(e) => onOptionSelect(e, index, false)}
              >
                {option.text}
              </DualListSelectorListItem>
            ) : null
          )}
        </DualListSelectorList>
      </DualListSelectorPane>
      <DualListSelectorControlsWrapper>
        <DualListSelectorControl
          isDisabled={!availableOptions.some((option) => option.selected)}
          onClick={() => moveSelected(true)}
          aria-label="Add selected"
          icon={<AngleRightIcon />}
        />
        <DualListSelectorControl
          isDisabled={availableOptions.length === 0}
          onClick={() => moveAll(true)}
          aria-label="Add all"
          icon={<AngleDoubleRightIcon />}
        />
        <DualListSelectorControl
          isDisabled={chosenOptions.length === 0}
          onClick={() => moveAll(false)}
          aria-label="Remove all"
          icon={<AngleDoubleLeftIcon />}
        />
        <DualListSelectorControl
          onClick={() => moveSelected(false)}
          isDisabled={!chosenOptions.some((option) => option.selected)}
          aria-label="Remove selected"
          icon={<AngleLeftIcon />}
        />
      </DualListSelectorControlsWrapper>
      <DualListSelectorPane
        title="Chosen options"
        status={`${chosenOptions.filter((option) => option.selected && option.isVisible).length} of ${
          chosenOptions.filter((option) => option.isVisible).length
        } options selected`}
        isChosen
      >
        <DualListSelectorList>
          {chosenOptions.map((option, index) =>
            option.isVisible ? (
              <DualListSelectorListItem
                key={index}
                isSelected={option.selected}
                id={`composable-basic-chosen-option-${index}`}
                onOptionSelect={(e) => onOptionSelect(e, index, true)}
              >
                {option.text}
              </DualListSelectorListItem>
            ) : null
          )}
        </DualListSelectorList>
      </DualListSelectorPane>
    </DualListSelector>
    <MultipleFileUpload
        onFileDrop={handleFileDrop}
        dropzoneProps={{
          accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'application/msword': ['.doc'],
            'application/pdf': ['.pdf'],
            'image/png': ['.png']
          }
        }}
        isHorizontal={isHorizontal}
      >
        <MultipleFileUploadMain
          titleIcon={<UploadIcon />}
          titleText="Drag and drop files here"
          titleTextSeparator="or"
          infoText="Accepted file types: JPEG, Doc, PDF, PNG"
        />
        {showStatus && (
          <MultipleFileUploadStatus
            statusToggleText={`${successfullyReadFileCount} of ${currentFiles.length} files uploaded`}
            statusToggleIcon={statusIcon}
            aria-label="Current uploads"
          >
            {currentFiles.map((file) => (
              <MultipleFileUploadStatusItem
                file={file}
                key={file.name}
                onClearClick={() => removeFiles([file.name])}
                onReadSuccess={handleReadSuccess}
                onReadFail={handleReadFail}
                progressHelperText={createHelperText(file)}
              />
            ))}
          </MultipleFileUploadStatus>
        )}
      </MultipleFileUpload>

      <FileUpload
      id="text-file-simple"
      type="text"
      value={value}
      filename={filename}
      filenamePlaceholder="Drag and drop a file or upload one"
      onFileInputChange={handleFileInputChange}
      onDataChange={handleDataChange}
      onTextChange={handleTextChange}
      onReadStarted={handleFileReadStarted}
      onReadFinished={handleFileReadFinished}
      onClearClick={handleClear}
      isLoading={isLoading}
      allowEditingUploadedText={false}
      browseButtonText="Upload"
    />
    </Form>
    <span className="pf-v6-c-form-control pf-m-success">
  <input
    type="text"
    value="Success"
    id="input-success"
    aria-label="Success state input example"
  />
  <span className="pf-v6-c-form-control__utilities">
    <span className="pf-v6-c-form-control__icon pf-m-status">
      <i className="fas fa-check-circle" aria-hidden="true"></i>
    </span>
  </span>
</span>
<br></br>
<span className="pf-v6-c-form-control pf-m-placeholder">
  <select
    id="select-selectable-placeholder"
    name="select-selectable-placeholder"
    aria-label="Selectable placeholder select example"
  >
    <option  selected>Selectable placeholder</option>
    <option value="Mr">Mr</option>
    <option value="Miss">Miss</option>
    <option value="Mrs">Mrs</option>
    <option value="Ms">Ms</option>
    <option value="Dr">Dr</option>
    <option value="Dr" disabled>Disabled option</option>
    <option value="Other">Other</option>
  </select>
  <span className="pf-v6-c-form-control__utilities">
    <span className="pf-v6-c-form-control__toggle-icon">
      <i className="fas fa-caret-down" aria-hidden="true"></i>
    </span>
  </span>
</span>
<br></br>
<FormSelect value={formSelectValue} onChange={onChange} aria-label="FormSelect Input" ouiaId="BasicFormSelect">
      {options.map((option, index) => (
        <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
      ))}
    </FormSelect>
    <br></br>
    <TextArea
      value={value}
      onChange={(_event, value) => setValue(value)}
      resizeOrientation="vertical"
      aria-label="text area vertical resize example"
    />
    <br></br>
    <TextArea
      value={value}
      onChange={(_event, value) => setValue(value)}
      isRequired
      validated={'error'}
      aria-label="invalid text area example"
    />
    <br></br>
    <TextInput
      value={value}
      onChange={(_event, value) => setValue(value)}
      isRequired
      validated={ValidatedOptions.error}
      type="text"
      aria-label="invalid text input example"
    />
    <br></br>
    <br></br>
     <Banner screenReaderText="Success banner" status="success">
      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
        <FlexItem>
          <CheckCircleIcon />
        </FlexItem>
        <FlexItem>Success banner</FlexItem>
      </Flex>
    </Banner>
    <br />
    <Banner screenReaderText="Warning banner" status="warning">
      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
        <FlexItem>
          <ExclamationTriangleIcon />
        </FlexItem>
        <FlexItem>Warning banner</FlexItem>
      </Flex>
    </Banner>
    <br />
    <Banner screenReaderText="Danger banner" status="danger">
      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
        <FlexItem>
          <ExclamationCircleIcon />
        </FlexItem>
        <FlexItem>Danger banner</FlexItem>
      </Flex>
    </Banner>
    <br />
    <Banner screenReaderText="Info banner" status="info">
      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
        <FlexItem>
          <InfoCircleIcon />
        </FlexItem>
        <FlexItem>Info banner</FlexItem>
      </Flex>
    </Banner>
    <br />
    <Banner screenReaderText="Custom banner" status="custom">
      <Flex spaceItems={{ default: 'spaceItemsSm' }}>
        <FlexItem>
          <BellIcon />
        </FlexItem>
        <FlexItem>Custom banner</FlexItem>
      </Flex>
    </Banner>
    </>
    
  );
};

export default PfForm; 