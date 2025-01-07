import React from 'react';
import {
    TextInput,
    Button,
    HelperText,
    HelperTextItem,
    Title,
    MenuToggle,
    TextInputGroup,
    TextInputGroupMain,
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
    TextArea, ValidatedOptions,
    FlexItem,
    Hint,
    HintBody,
    Label,
    Nav, NavItem, NavList,
    NotificationBadge, NotificationBadgeVariant,
    NumberInput,
    NotificationDrawer,
    NotificationDrawerBody,
    NotificationDrawerHeader,
    NotificationDrawerList,
    NotificationDrawerListItem,
    NotificationDrawerListItemBody,
    NotificationDrawerListItemHeader,
    Dropdown,
    DropdownList,
    DropdownItem,
    MenuToggleElement,
    Wizard, WizardStep,
    Truncate,
    Tooltip,
    Toolbar,
    ToolbarItem,
    ToolbarContent,
    SearchInput,
    ToggleGroup, ToggleGroupItem,
} from '@patternfly/react-core';
import { Tile } from '@patternfly/react-core/deprecated';
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
import CubeIcon from '@patternfly/react-icons/dist/esm/icons/cube-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';

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

const Demo1: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string>('');
    const [inputValue, setInputValue] = React.useState<string>('');
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [selectOptions, setSelectOptions] = React.useState<SelectOptionProps[]>(initialSelectOptions);
    const [focusedItemIndex, setFocusedItemIndex] = React.useState<number | null>(null);
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

    const [activeItem, setActiveItem] = React.useState(0);

    const [readExpanded, setReadExpanded] = React.useState(false);
    const [unreadExpanded, setUnreadExpanded] = React.useState(false);
    const [attentionExpanded, setAttentionExpanded] = React.useState(false);

    const [isOpenMap, setIsOpenMap] = React.useState(new Array(7).fill(false));

    const [isSelected, setIsSelected] = React.useState('');
    const handleItemClick = (event, _isSelected: boolean) => {
        const id = event.currentTarget.id;
        setIsSelected(id);
    };

    const onToggle = (index: number) => () => {
        const newState = [...isOpenMap.slice(0, index), !isOpenMap[index], ...isOpenMap.slice(index + 1)];
        setIsOpenMap(newState);
    };

    const onDrawerClose = (_event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent) => {
        setIsOpenMap(new Array(7).fill(false));
    };

    const [isOpen0, isOpen1, isOpen2, isOpen3, isOpen4, isOpen5, isOpen6] = isOpenMap;
    const dropdownItems = (
        <>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem
                to="#default-link2"
                // Prevent the default onClick functionality for example purposes
                onClick={(ev: any) => ev.preventDefault()}
            >
                Link
            </DropdownItem>
            <DropdownItem isDisabled>Disabled Action</DropdownItem>
            <DropdownItem isDisabled to="#default-link4">
                Disabled Link
            </DropdownItem>
        </>
    );

    const onReadClick = () => {
        setReadExpanded(!readExpanded);
    };

    const onUnreadClick = () => {
        setUnreadExpanded(!unreadExpanded);
    };

    const onAttentionClick = () => {
        setAttentionExpanded(!attentionExpanded);
    };

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

    const logColor = (color: string) => {
        // eslint-disable-next-line no-console
    };

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

    const toggle = (toggleRef: any) => (
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
            <div className='toolbar'>
                <Toolbar id="toolbar-items-example">
                    <ToolbarContent>
                        <ToolbarItem>
                            <img src="../src/assets/redhat-icon.svg" alt="Red Hat logo" />
                        </ToolbarItem>
                        <ToolbarItem>
                            <p>Red Hat Brand Theme</p>
                        </ToolbarItem>
                    </ToolbarContent>
                </Toolbar>
            </div>
            <div className='container'>
                <Title headingLevel="h1">Red Hat Branded Theme for Patternfly 6</Title>
                <Title headingLevel="h2">Button</Title>
                <section>
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
                </section>
                <Title headingLevel="h2">Divider</Title>
                <section>
                    <Divider
                        inset={{
                            default: 'insetMd',
                            md: 'insetNone',
                            lg: 'inset3xl',
                            xl: 'insetLg'
                        }}
                    />
                </section>
                <Title headingLevel="h2">Toggle Drawer</Title>
                <section>
                    <DualListSelector>
                        <DualListSelectorPane
                            title="Available options"
                            status={`${availableOptions.filter((option) => option.selected && option.isVisible).length} of ${availableOptions.filter((option) => option.isVisible).length
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
                            status={`${chosenOptions.filter((option) => option.selected && option.isVisible).length} of ${chosenOptions.filter((option) => option.isVisible).length
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
                </section>
                <Title headingLevel="h2">Multiple File Upload</Title>
                <section>
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
                </section>
                <Title headingLevel="h2">Simple File Upload</Title>
                <section>
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
                </section>
                <Title headingLevel="h2">Form Control</Title>
                <section>
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
                            <option selected>Selectable placeholder</option>
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
                </section>
                <Title headingLevel="h2">Banner</Title>
                <section>
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
                    <br></br>
                </section>
                <Title headingLevel="h2">Hint</Title>
                <section>
                    <Hint>
                        <HintBody>
                            Welcome to the new documentation experience.
                            <Button variant="link" isInline>
                                Learn more about the improved features.
                            </Button>
                        </HintBody>
                    </Hint>
                </section>
                <Title headingLevel="h2">Label</Title>
                <section>
                    <strong>Non-status:</strong>
                    <br />
                    <br />
                    <Label>Grey</Label>
                    <Label icon={<CubeIcon />}>Grey icon</Label>
                    <Label onClose={() => Function.prototype}>Grey removable</Label>
                    <Label icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Grey icon removable
                    </Label>
                    <Label href="#filled">Grey link</Label>
                    <Label href="#filled" onClose={() => Function.prototype}>
                        Grey link removable
                    </Label>{' '}
                    <Label onClick={() => logColor('grey')}>Grey clickable</Label>{' '}
                    <Label onClick={() => logColor('grey')} onClose={() => Function.prototype}>
                        Grey clickable removable
                    </Label>{' '}
                    <Label icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Grey label with icon that overflows
                    </Label>{' '}
                    <Label isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Grey link removable (disabled)
                    </Label>{' '}
                    <Label isDisabled icon={<CubeIcon />} onClick={() => logColor('grey')} onClose={() => Function.prototype}>
                        Grey clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <Label color="blue">Blue</Label>
                    <Label color="blue" icon={<CubeIcon />}>
                        Blue icon
                    </Label>
                    <Label color="blue" onClose={() => Function.prototype}>
                        Blue removable
                    </Label>
                    <Label color="blue" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Blue icon removable
                    </Label>
                    <Label color="blue" href="#filled">
                        Blue link
                    </Label>
                    <Label color="blue" href="#filled" onClose={() => Function.prototype}>
                        Blue link removable
                    </Label>{' '}
                    <Label color="blue" onClick={() => logColor('blue')}>
                        Blue clickable
                    </Label>
                    <Label color="blue" onClick={() => logColor('blue')} onClose={() => Function.prototype}>
                        Blue clickable removable
                    </Label>{' '}
                    <Label color="blue" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Blue label with icon that overflows
                    </Label>{' '}
                    <Label color="blue" isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Blue link removable (disabled)
                    </Label>{' '}
                    <Label
                        color="blue"
                        isDisabled
                        icon={<CubeIcon />}
                        onClick={() => logColor('blue')}
                        onClose={() => Function.prototype}
                    >
                        Blue clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <Label color="green">Green</Label>
                    <Label color="green" icon={<CubeIcon />}>
                        Green icon
                    </Label>
                    <Label color="green" onClose={() => Function.prototype}>
                        Green removable
                    </Label>
                    <Label color="green" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Green icon removable
                    </Label>
                    <Label color="green" href="#filled">
                        Green link
                    </Label>
                    <Label color="green" href="#filled" onClose={() => Function.prototype}>
                        Green link removable
                    </Label>{' '}
                    <Label color="green" onClick={() => logColor('green')}>
                        Green clickable
                    </Label>
                    <Label color="green" onClick={() => logColor('green')} onClose={() => Function.prototype}>
                        Green clickable removable
                    </Label>{' '}
                    <Label color="green" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Green label with icon that overflows
                    </Label>{' '}
                    <Label color="green" isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Green link removable (disabled)
                    </Label>{' '}
                    <Label
                        color="green"
                        isDisabled
                        icon={<CubeIcon />}
                        onClick={() => logColor('green')}
                        onClose={() => Function.prototype}
                    >
                        Green clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <Label color="orange">Orange</Label>
                    <Label color="orange" icon={<CubeIcon />}>
                        Orange icon
                    </Label>
                    <Label color="orange" onClose={() => Function.prototype}>
                        Orange removable
                    </Label>
                    <Label color="orange" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Orange icon removable
                    </Label>
                    <Label color="orange" href="#filled">
                        Orange link
                    </Label>
                    <Label color="orange" href="#filled" onClose={() => Function.prototype}>
                        Orange link removable
                    </Label>{' '}
                    <Label color="orange" onClick={() => logColor('orange')}>
                        Orange clickable
                    </Label>
                    <Label color="orange" onClick={() => logColor('orange')} onClose={() => Function.prototype}>
                        Orange clickable removable
                    </Label>{' '}
                    <Label color="orange" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Orange label with icon that overflows
                    </Label>{' '}
                    <Label color="orange" isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Orange link removable (disabled)
                    </Label>{' '}
                    <Label
                        color="orange"
                        isDisabled
                        icon={<CubeIcon />}
                        onClick={() => logColor('orange')}
                        onClose={() => Function.prototype}
                    >
                        Orange clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <Label color="red">Red</Label>
                    <Label color="red" icon={<CubeIcon />}>
                        Red icon
                    </Label>
                    <Label color="red" onClose={() => Function.prototype}>
                        Red removable
                    </Label>
                    <Label color="red" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Red icon removable
                    </Label>
                    <Label color="red" href="#filled">
                        Red link
                    </Label>
                    <Label color="red" href="#filled" onClose={() => Function.prototype}>
                        Red link removable
                    </Label>{' '}
                    <Label color="red" onClick={() => logColor('red')}>
                        Red clickable
                    </Label>
                    <Label color="red" onClick={() => logColor('red')} onClose={() => Function.prototype}>
                        Red clickable removable
                    </Label>{' '}
                    <Label color="red" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Red label with icon that overflows
                    </Label>{' '}
                    <Label color="red" isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Red link removable (disabled)
                    </Label>{' '}
                    <Label
                        color="red"
                        isDisabled
                        icon={<CubeIcon />}
                        onClick={() => logColor('red')}
                        onClose={() => Function.prototype}
                    >
                        Red clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <Label color="orangered">Orange red</Label>
                    <Label color="orangered" icon={<CubeIcon />}>
                        Orange red icon
                    </Label>
                    <Label color="orangered" onClose={() => Function.prototype}>
                        Orange red removable
                    </Label>
                    <Label color="orangered" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Orange red icon removable
                    </Label>
                    <Label color="orangered" href="#filled">
                        Orange red link
                    </Label>
                    <Label color="orangered" href="#filled" onClose={() => Function.prototype}>
                        Orange red link removable
                    </Label>
                    <Label color="orangered" onClick={() => logColor('orangered')}>
                        Orange red clickable
                    </Label>
                    <Label color="orangered" onClick={() => logColor('orangered')} onClose={() => Function.prototype}>
                        Orange red clickable removable
                    </Label>
                    <Label color="orangered" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Orange red label with icon that overflows
                    </Label>
                    <br />
                    <br />
                    <Label color="purple">Purple</Label>
                    <Label color="purple" icon={<CubeIcon />}>
                        Purple icon
                    </Label>
                    <Label color="purple" onClose={() => Function.prototype}>
                        Purple removable
                    </Label>
                    <Label color="purple" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Purple icon removable
                    </Label>
                    <Label color="purple" href="#filled">
                        Purple link
                    </Label>
                    <Label color="purple" href="#filled" onClose={() => Function.prototype}>
                        Purple link removable
                    </Label>{' '}
                    <Label color="purple" onClick={() => logColor('purple')}>
                        Purple clickable
                    </Label>
                    <Label color="purple" onClick={() => logColor('purple')} onClose={() => Function.prototype}>
                        Purple clickable removable
                    </Label>{' '}
                    <Label color="purple" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Purple label with icon that overflows
                    </Label>{' '}
                    <Label color="purple" isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Purple link removable (disabled)
                    </Label>{' '}
                    <Label
                        color="purple"
                        isDisabled
                        icon={<CubeIcon />}
                        onClick={() => logColor('purple')}
                        onClose={() => Function.prototype}
                    >
                        Purple clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <Label color="teal">Teal</Label>
                    <Label color="teal" icon={<CubeIcon />}>
                        Teal icon
                    </Label>
                    <Label color="teal" onClose={() => Function.prototype}>
                        Teal removable
                    </Label>
                    <Label color="teal" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Teal icon removable
                    </Label>
                    <Label color="teal" href="#filled">
                        Teal link
                    </Label>
                    <Label color="teal" href="#filled" onClose={() => Function.prototype}>
                        Teal link removable
                    </Label>{' '}
                    <Label color="teal" onClick={() => logColor('teal')}>
                        Teal clickable
                    </Label>
                    <Label color="teal" onClick={() => logColor('teal')} onClose={() => Function.prototype}>
                        Teal clickable removable
                    </Label>{' '}
                    <Label color="teal" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Teal label with icon that overflows
                    </Label>{' '}
                    <Label color="teal" isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Teal link removable (disabled)
                    </Label>{' '}
                    <Label
                        color="teal"
                        isDisabled
                        icon={<CubeIcon />}
                        onClick={() => logColor('teal')}
                        onClose={() => Function.prototype}
                    >
                        Teal clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <Label color="yellow">Yellow</Label>
                    <Label color="yellow" icon={<CubeIcon />}>
                        Yellow icon
                    </Label>
                    <Label color="yellow" onClose={() => Function.prototype}>
                        Yellow removable
                    </Label>
                    <Label color="yellow" icon={<CubeIcon />} onClose={() => Function.prototype}>
                        Yellow icon removable
                    </Label>
                    <Label color="yellow" href="#filled">
                        Yellow link
                    </Label>
                    <Label color="yellow" href="#filled" onClose={() => Function.prototype}>
                        Yellow link removable
                    </Label>{' '}
                    <Label color="yellow" onClick={() => logColor('yellow')}>
                        Yellow clickable
                    </Label>
                    <Label color="yellow" onClick={() => logColor('yellow')} onClose={() => Function.prototype}>
                        Yellow clickable removable
                    </Label>{' '}
                    <Label color="yellow" icon={<CubeIcon />} onClose={() => Function.prototype} textMaxWidth="16ch">
                        Yellow label with icon that overflows
                    </Label>{' '}
                    <Label color="yellow" isDisabled icon={<CubeIcon />} href="#filled" onClose={() => Function.prototype}>
                        Yellow link removable (disabled)
                    </Label>{' '}
                    <Label
                        color="yellow"
                        isDisabled
                        icon={<CubeIcon />}
                        onClick={() => logColor('yellow')}
                        onClose={() => Function.prototype}
                    >
                        Yellow clickable removable (disabled)
                    </Label>
                    <br />
                    <br />
                    <div style={{ width: '250px' }}>
                        <Label>Label that overflows its parent, but has no textMaxWidth on its own</Label>
                    </div>
                    <br />
                </section>
                <Title headingLevel="h2">Navigation</Title>
                <section>
                    <Nav aria-label="Default global" ouiaId="DefaultNav">
                        <NavList>
                            <NavItem preventDefault id="nav-default-link1" to="#nav-default-link1" itemId={0} isActive={activeItem === 0}>
                                Default Link 1
                            </NavItem>
                            <NavItem preventDefault id="nav-default-link2" to="#nav-default-link2" itemId={1} isActive={activeItem === 1}>
                                Default Link 2
                            </NavItem>
                            <NavItem preventDefault id="nav-default-link3" to="#nav-default-link3" itemId={2} isActive={activeItem === 2}>
                                Default Link 3
                            </NavItem>
                            <NavItem preventDefault id="nav-default-link4" to="#nav-default-link4" itemId={3} isActive={activeItem === 3}>
                                Default Link 4
                            </NavItem>
                        </NavList>
                    </Nav>
                </section>
                <Title headingLevel="h2">Notification Badge</Title>
                <section>
                    <br></br>
                    <NotificationBadge
                        variant={NotificationBadgeVariant.read}
                        onClick={onReadClick}
                        aria-label="Basic notification badge with read variant"
                        isExpanded={readExpanded}
                    />
                    <NotificationBadge
                        variant={NotificationBadgeVariant.unread}
                        onClick={onUnreadClick}
                        aria-label="Basic notification badge with unread variant"
                        isExpanded={unreadExpanded}
                    />
                    <NotificationBadge
                        variant={NotificationBadgeVariant.attention}
                        onClick={onAttentionClick}
                        aria-label="Basic notification badge with attention variant"
                        isExpanded={attentionExpanded}
                    />
                    <br></br>
                </section>
                <Title headingLevel="h2">Number Input</Title>
                <section>
                    <br></br>
                    <NumberInput
                        inputName="input"
                        inputAriaLabel="number input"
                        minusBtnAriaLabel="minus"
                        plusBtnAriaLabel="plus"
                    />
                    <br></br>
                </section>
                <Title headingLevel="h2">Notification Drawer</Title>
                <section>
                    <NotificationDrawer>
                        <NotificationDrawerHeader count={3} onClose={onDrawerClose}>
                            <Dropdown
                                onSelect={onSelect}
                                isOpen={isOpen0}
                                onOpenChange={() => setIsOpenMap(new Array(7).fill(false))}
                                popperProps={{ position: 'right' }}
                                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                                    <MenuToggle
                                        ref={toggleRef}
                                        isExpanded={isOpen0}
                                        onClick={onToggle(0)}
                                        variant="plain"
                                        aria-label={`Basic example header kebab toggle`}
                                        icon={<EllipsisVIcon aria-hidden="true" />}
                                    />
                                )}
                            >
                                <DropdownList>{dropdownItems}</DropdownList>
                            </Dropdown>
                        </NotificationDrawerHeader>
                        <NotificationDrawerBody>
                            <NotificationDrawerList aria-label="Notifications in the basic example">
                                <NotificationDrawerListItem variant="info">
                                    <NotificationDrawerListItemHeader
                                        variant="info"
                                        title="Unread info notification title"
                                        srTitle="Info notification:"
                                    >
                                        <Dropdown
                                            onSelect={onSelect}
                                            isOpen={isOpen1}
                                            onOpenChange={() => setIsOpenMap(new Array(7).fill(false))}
                                            popperProps={{ position: 'right' }}
                                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                                                <MenuToggle
                                                    ref={toggleRef}
                                                    isExpanded={isOpen0}
                                                    onClick={onToggle(1)}
                                                    variant="plain"
                                                    aria-label={`Basic example notification 1 kebab toggle`}
                                                    icon={<EllipsisVIcon aria-hidden="true" />}
                                                />
                                            )}
                                        >
                                            <DropdownList>{dropdownItems}</DropdownList>
                                        </Dropdown>
                                    </NotificationDrawerListItemHeader>
                                    <NotificationDrawerListItemBody timestamp="5 minutes ago">
                                        This is an info notification description.
                                    </NotificationDrawerListItemBody>
                                </NotificationDrawerListItem>
                                <NotificationDrawerListItem variant="danger">
                                    <NotificationDrawerListItemHeader
                                        variant="danger"
                                        title="Unread danger notification title. This is a long title to show how the title will wrap if it is long and wraps to multiple lines."
                                        srTitle="Danger notification:"
                                    >
                                        <Dropdown
                                            onSelect={onSelect}
                                            isOpen={isOpen2}
                                            onOpenChange={() => setIsOpenMap(new Array(7).fill(false))}
                                            popperProps={{ position: 'right' }}
                                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                                                <MenuToggle
                                                    ref={toggleRef}
                                                    isExpanded={isOpen2}
                                                    onClick={onToggle(2)}
                                                    variant="plain"
                                                    aria-label={`Basic example notification 2 kebab toggle`}
                                                    icon={<EllipsisVIcon aria-hidden="true" />}
                                                />
                                            )}
                                        >
                                            <DropdownList>{dropdownItems}</DropdownList>
                                        </Dropdown>
                                    </NotificationDrawerListItemHeader>
                                    <NotificationDrawerListItemBody timestamp="10 minutes ago">
                                        This is a danger notification description. This is a long description to show how the title will wrap if
                                        it is long and wraps to multiple lines.
                                    </NotificationDrawerListItemBody>
                                </NotificationDrawerListItem>
                                <NotificationDrawerListItem variant="danger">
                                    <NotificationDrawerListItemHeader
                                        truncateTitle={1}
                                        variant="danger"
                                        title="Unread danger notification title. This is a long title to show how the title will be truncated if it is long and will be shown in a single line."
                                        srTitle="Danger notification:"
                                    >
                                        <Dropdown
                                            onSelect={onSelect}
                                            isOpen={isOpen3}
                                            onOpenChange={() => setIsOpenMap(new Array(7).fill(false))}
                                            popperProps={{ position: 'right' }}
                                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                                                <MenuToggle
                                                    ref={toggleRef}
                                                    isExpanded={isOpen3}
                                                    onClick={onToggle(3)}
                                                    variant="plain"
                                                    aria-label={`Basic example notification 3 kebab toggle`}
                                                    icon={<EllipsisVIcon aria-hidden="true" />}
                                                />
                                            )}
                                        >
                                            <DropdownList>{dropdownItems}</DropdownList>
                                        </Dropdown>
                                    </NotificationDrawerListItemHeader>
                                    <NotificationDrawerListItemBody timestamp="10 minutes ago">
                                        This is a danger notification description. This is a long description to show how the title will wrap if
                                        it is long and wraps to multiple lines.
                                    </NotificationDrawerListItemBody>
                                </NotificationDrawerListItem>
                                <NotificationDrawerListItem variant="warning" isRead>
                                    <NotificationDrawerListItemHeader
                                        variant="warning"
                                        title="Read warning notification title"
                                        srTitle="Warning notification:"
                                    >
                                        <Dropdown
                                            onSelect={onSelect}
                                            isOpen={isOpen4}
                                            onOpenChange={() => setIsOpenMap(new Array(7).fill(false))}
                                            popperProps={{ position: 'right' }}
                                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                                                <MenuToggle
                                                    ref={toggleRef}
                                                    isExpanded={isOpen4}
                                                    onClick={onToggle(4)}
                                                    variant="plain"
                                                    aria-label={`Basic example notification 4 kebab toggle`}
                                                    icon={<EllipsisVIcon aria-hidden="true" />}
                                                />
                                            )}
                                        >
                                            <DropdownList>{dropdownItems}</DropdownList>
                                        </Dropdown>
                                    </NotificationDrawerListItemHeader>
                                    <NotificationDrawerListItemBody timestamp="20 minutes ago">
                                        This is a warning notification description.
                                    </NotificationDrawerListItemBody>
                                </NotificationDrawerListItem>
                                <NotificationDrawerListItem variant="success" isRead>
                                    <NotificationDrawerListItemHeader
                                        variant="success"
                                        title="Read success notification title"
                                        srTitle="Success notification:"
                                    >
                                        <Dropdown
                                            onSelect={onSelect}
                                            isOpen={isOpen5}
                                            onOpenChange={() => setIsOpenMap(new Array(7).fill(false))}
                                            popperProps={{ position: 'right' }}
                                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                                                <MenuToggle
                                                    ref={toggleRef}
                                                    isExpanded={isOpen5}
                                                    onClick={onToggle(5)}
                                                    variant="plain"
                                                    aria-label={`Basic example notification 5 kebab toggle`}
                                                    icon={<EllipsisVIcon aria-hidden="true" />}
                                                />
                                            )}
                                        >
                                            <DropdownList>{dropdownItems}</DropdownList>
                                        </Dropdown>
                                    </NotificationDrawerListItemHeader>
                                    <NotificationDrawerListItemBody timestamp="30 minutes ago">
                                        This is a success notification description.
                                    </NotificationDrawerListItemBody>
                                </NotificationDrawerListItem>
                                <NotificationDrawerListItem isRead>
                                    <NotificationDrawerListItemHeader title="Read (default) notification title" srTitle="notification:">
                                        <Dropdown
                                            onSelect={onSelect}
                                            isOpen={isOpen6}
                                            onOpenChange={() => setIsOpenMap(new Array(7).fill(false))}
                                            popperProps={{ position: 'right' }}
                                            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                                                <MenuToggle
                                                    ref={toggleRef}
                                                    isExpanded={isOpen6}
                                                    onClick={onToggle(6)}
                                                    variant="plain"
                                                    aria-label={`Basic example notification 6 kebab toggle`}
                                                    icon={<EllipsisVIcon aria-hidden="true" />}
                                                />
                                            )}
                                        >
                                            <DropdownList>{dropdownItems}</DropdownList>
                                        </Dropdown>
                                    </NotificationDrawerListItemHeader>
                                    <NotificationDrawerListItemBody timestamp="35 minutes ago">
                                        This is a default notification description.
                                    </NotificationDrawerListItemBody>
                                </NotificationDrawerListItem>
                            </NotificationDrawerList>
                        </NotificationDrawerBody>
                    </NotificationDrawer>
                </section>
                <Title headingLevel="h2">Wizard</Title>
                <section>
                    <Wizard height={400} title="Basic wizard">
                        <WizardStep name="Step 1" id="basic-first-step">
                            <p>
                                The content of this step overflows and creates a scrollbar, which causes a tabindex of "0", a role of "region",
                                and an aria-label or aria-labelledby to be applied.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum in neque nec pharetra. Duis lacinia
                                vel sapien ut imperdiet. Nunc ultrices mollis dictum. Duis tempus, massa nec tincidunt tempor, enim ex porttitor
                                odio, eu facilisis dolor tortor id sapien. Etiam sit amet molestie lacus. Nulla facilisi. Duis eget finibus
                                ipsum. Quisque dictum enim sed sodales porta. Curabitur eget orci eu risus posuere pulvinar id nec turpis. Morbi
                                mattis orci vel posuere tincidunt. Fusce bibendum et libero a auctor.
                            </p>
                            <p>
                                Proin elementum commodo sodales. Quisque eget libero mattis, ornare augue at, egestas nisi. Mauris ultrices orci
                                fringilla pretium mattis. Aliquam erat volutpat. Sed pharetra condimentum dui, nec bibendum ante. Vestibulum
                                sollicitudin, sem accumsan pharetra molestie, purus turpis lacinia lorem, commodo sodales quam lectus a urna.
                                Nam gravida, felis a lacinia varius, ex ipsum ultrices orci, non egestas diam velit in mi. Ut sit amet commodo
                                orci. Duis sed diam odio. Duis mi metus, dignissim in odio nec, ornare aliquet libero. Sed luctus elit nibh.
                                Quisque et felis diam. Integer ac metus dolor.
                            </p>
                        </WizardStep>
                        <WizardStep name="Step 2" id="basic-second-step">
                            Step 2 content
                        </WizardStep>
                        <WizardStep name="Review" id="basic-review-step" footer={{ nextButtonText: 'Finish' }}>
                            Review step content
                        </WizardStep>
                    </Wizard>
                </section>
                <Title headingLevel="h2">Truncate</Title>
                <section>
                    <div className="truncate-example-resize">
                        <Truncate
                            content={'redhat_logo_black_and_white_reversed_simple_with_fedora_container.zip'}
                            trailingNumChars={10}
                            position={'middle'}
                        />
                    </div>
                </section>
                <Title headingLevel="h2">Tooltip</Title>
                <section>
                    <div>
                        <Tooltip
                            content={
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id feugiat augue, nec fringilla turpis.
                                </div>
                            }
                        >
                            <Button>I have a tooltip!</Button>
                        </Tooltip>
                    </div>
                </section>
                <Title headingLevel="h2">Toolbar</Title>
                <section className='toolbar-example'>
                    <ToolbarItem>
                        <SearchInput aria-label="Items example search input" />
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button variant="secondary">Action</Button>
                    </ToolbarItem>
                    <ToolbarItem variant="separator" />
                    <ToolbarItem>
                        <Button variant="primary">Action</Button>
                    </ToolbarItem>
                </section>
                <Title headingLevel="h2">Toggle Group</Title>
                <section>
                    <ToggleGroup aria-label="Default with single selectable">
                        <ToggleGroupItem
                            text="Option 1"
                            buttonId="toggle-group-single-1"
                            isSelected={isSelected === 'toggle-group-single-1'}
                            onChange={handleItemClick}
                        />
                        <ToggleGroupItem
                            text="Option 2"
                            buttonId="toggle-group-single-2"
                            isSelected={isSelected === 'toggle-group-single-2'}
                            onChange={handleItemClick}
                        />
                        <ToggleGroupItem
                            text="Option 3"
                            buttonId="toggle-group-single-3"
                            isSelected={isSelected === 'toggle-group-single-3'}
                            onChange={handleItemClick}
                        />
                    </ToggleGroup>
                </section>
                <Title headingLevel="h2">List Box</Title>
                <section>
                    <div role="listbox" aria-label="Basic tiles">
                        <Tile title="Default" isSelected={false} />
                        <Tile title="Selected" isSelected />
                        <Tile title="Disabled" isDisabled isSelected={false} />
                    </div>
                </section>
                <Title headingLevel="h2">Text Input Group</Title>
                <section>
                    <TextInputGroup>
                        <TextInputGroupMain value={value} onChange={(_event, value) => setValue(value)} />
                    </TextInputGroup>
                </section>
            </div>
        </>
    );
};

export default Demo1; 