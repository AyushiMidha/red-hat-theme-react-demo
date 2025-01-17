import React from 'react';
import { BadgeCountObject, Button, Card, Flex, Title, Tooltip } from "@patternfly/react-core";
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import ExternalLinkSquareAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon';
import CopyIcon from '@patternfly/react-icons/dist/esm/icons/copy-icon';
import BellIcon from '@patternfly/react-icons/dist/esm/icons/bell-icon';
import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon';
import UploadIcon from '@patternfly/react-icons/dist/esm/icons/upload-icon';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import { Link } from 'react-router-dom';


interface LoadingPropsType {
    spinnerAriaValueText: string;
    spinnerAriaLabelledBy?: string;
    spinnerAriaLabel?: string;
    isLoading: boolean;
}

const PfButton = () => {
    const [isPrimaryLoading, setIsPrimaryLoading] = React.useState<boolean>(true);
    const [isSecondaryLoading, setIsSecondaryLoading] = React.useState<boolean>(true);
    const [isInlineLoading, setIsInlineLoading] = React.useState<boolean>(true);
    const [isUploading, setIsUploading] = React.useState<boolean>(false);

    const primaryLoadingProps = {} as LoadingPropsType;
    primaryLoadingProps.spinnerAriaValueText = 'Loading';
    primaryLoadingProps.spinnerAriaLabelledBy = 'primary-loading-button';
    primaryLoadingProps.isLoading = isPrimaryLoading;

    const secondaryLoadingProps = {} as LoadingPropsType;
    secondaryLoadingProps.spinnerAriaValueText = 'Loading';
    secondaryLoadingProps.spinnerAriaLabel = 'Content being loaded';
    secondaryLoadingProps.isLoading = isSecondaryLoading;

    const inlineLoadingProps = {} as LoadingPropsType;
    inlineLoadingProps.spinnerAriaValueText = 'Loading';
    inlineLoadingProps.spinnerAriaLabel = 'Content being loaded';
    inlineLoadingProps.isLoading = isInlineLoading;

    const uploadingProps = {} as LoadingPropsType;
    uploadingProps.spinnerAriaValueText = 'Loading';
    uploadingProps.spinnerAriaLabel = 'Uploading data';
    uploadingProps.isLoading = isUploading;

    const badgeCountObjectNotRead: BadgeCountObject = {
        isRead: false,
        count: 7,
        className: 'custom-badge-unread'
    };

    const badgeCountObjectRead: BadgeCountObject = {
        isRead: true,
        count: 10,
        className: 'custom-badge-read'
    };

    return <>
        <Title headingLevel="h2">Button</Title>
        <Card>
            <section>
                <Title headingLevel="h3">Variant Examples</Title>
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
            <section>
                <Title headingLevel="h3">Disabled Buttons</Title>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button isDisabled>Primary</Button>
                    <Button variant="secondary" isDisabled>
                        Secondary
                    </Button>
                    <Button variant="secondary" isDanger isDisabled>
                        Danger secondary
                    </Button>
                    <Button isDisabled variant="tertiary">
                        Tertiary
                    </Button>
                    <Button isDisabled variant="danger">
                        Danger
                    </Button>
                    <Button isDisabled variant="warning">
                        Warning
                    </Button>
                </Flex>
                <br />
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button isDisabled variant="link" icon={<PlusCircleIcon />}>
                        Link
                    </Button>
                    <Button isDisabled variant="link" isInline>
                        Inline link
                    </Button>
                    <Button variant="link" isDanger isDisabled>
                        Danger link
                    </Button>
                    <Button isDisabled variant="plain" aria-label="Action" icon={<TimesIcon />} />
                </Flex>
                <br />
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button isDisabled variant="control">
                        Control
                    </Button>
                    <Button isDisabled variant="control" aria-label="Copy" icon={<CopyIcon />} />
                </Flex>
            </section>
            <section>
                <Title headingLevel="h3">Small Buttons</Title>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button variant="primary" size="sm">
                        Primary
                    </Button>
                    <Button variant="secondary" size="sm">
                        Secondary
                    </Button>
                    <Button variant="tertiary" size="sm">
                        Tertiary
                    </Button>
                    <Button variant="danger" size="sm">
                        Danger
                    </Button>
                    <Button variant="warning" size="sm">
                        Warning
                    </Button>
                </Flex>
            </section>
            <section>
                <Title headingLevel="h3">Call to action (CTA) buttons</Title>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button variant="primary" size="lg">
                        Call to action
                    </Button>
                    <Button variant="secondary" size="lg">
                        Call to action
                    </Button>
                    <Button variant="tertiary" size="lg">
                        Call to action
                    </Button>
                    <Button variant="link" size="lg" icon={<ArrowRightIcon />} iconPosition="end">
                        Call to action
                    </Button>
                </Flex>
            </section>
            <section>
                <Title headingLevel="h3">Block level buttons</Title>
                <Button isBlock>Block level button</Button>
            </section>
            <section>
                <Title headingLevel="h3">Progress indicators</Title>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button
                        variant="primary"
                        id="primary-loading-button"
                        onClick={() => setIsPrimaryLoading(!isPrimaryLoading)}
                        {...primaryLoadingProps}
                    >
                        {isPrimaryLoading ? 'Click to stop loading' : 'Click to start loading'}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setIsSecondaryLoading(!isSecondaryLoading)}
                        {...secondaryLoadingProps}
                    >
                        {isSecondaryLoading ? 'Click to stop loading' : 'Click to start loading'}
                    </Button>
                </Flex>
                <br />
                <Button
                    variant="plain"
                    {...(!isUploading && { 'aria-label': 'Upload' })}
                    onClick={() => setIsUploading(!isUploading)}
                    icon={<UploadIcon />}
                    {...uploadingProps}
                />
                <br />
                <br />
                <Button variant="link" isInline onClick={() => setIsInlineLoading(!isInlineLoading)} {...inlineLoadingProps}>
                    {isInlineLoading ? 'Pause loading logs' : 'Resume loading logs'}
                </Button>
            </section>
            <section>
                <Title headingLevel="h3">Links as buttons</Title>
                <Flex>
                    <Button component="a" href="https://www.patternfly.org/" target="_blank" variant="primary">
                        Link to PatternFly home
                    </Button>
                    <Button component="a" href="https://www.patternfly.org/" target="_blank" variant="secondary">
                        Secondary link to PatternFly home
                    </Button>
                    <Button isDisabled component="a" href="https://www.patternfly.org/" target="_blank" variant="tertiary">
                        Tertiary link to PatternFly home
                    </Button>
                    <Button component="a" href="https://www.patternfly.org/" variant="link">
                        Jump to PatternFly home
                    </Button>
                </Flex>
            </section>
            <section>
                <Title headingLevel="h3">Inline link as span</Title>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <Button variant="link" isInline component="span">
                        This is long button text that needs to be a span so that it will wrap inline with the text around it.
                    </Button>
                    Sed hendrerit nisi in cursus maximus. Ut malesuada nisi turpis, in condimentum velit elementum non.
                </p>

                <br />

                <p>
                    Note that using a <b>span</b> as a button does not fire the <b>onclick</b> event for Enter or Space keys.
                    <Button variant="link" isInline component="span">
                        An <b>onKeyDown</b> event listener is needed for Enter and Space key presses to prevent their default behavior
                        and trigger your code.
                    </Button>
                    Pressing the Enter or Space keys on the inline link as span above demonstrates this by triggering an alert.
                </p>
            </section>
            <section>
                <Title headingLevel="h3">Router Link</Title>
                <Button variant="link" component={(props: any) => <Link {...props} to="#" />}>
                    Router link
                </Button>
            </section>
            <section>
                <Title headingLevel="h3">Aria-disabled examples</Title>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button isAriaDisabled>Primary aria disabled</Button>
                    <Button isAriaDisabled variant="link" icon={<PlusCircleIcon />}>
                        Link aria disabled
                    </Button>
                    <Button isAriaDisabled variant="link" isInline>
                        Inline link aria disabled
                    </Button>
                </Flex>
                <br />
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Tooltip content="Aria-disabled buttons are like disabled buttons, but focusable. Allows for tooltip support.">
                        <Button isAriaDisabled>Primary button with tooltip</Button>
                    </Tooltip>
                    <Tooltip content="Aria-disabled link as button with tooltip">
                        <Button component="a" isAriaDisabled href="https://www.patternfly.org/" target="_blank" variant="secondary">
                            Secondary link as button to PatternFly home
                        </Button>
                    </Tooltip>
                </Flex>
            </section>
            <section>
                <Title headingLevel="h3">Button with count</Title>
                <div>Unread:</div>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button variant="primary" countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="secondary" countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="tertiary" countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="control" countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="link" countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                </Flex>
                <br />
                <div>Unread disabled:</div>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button variant="primary" isDisabled countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="secondary" isDisabled countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="tertiary" isDisabled countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="control" isDisabled countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                    <Button variant="link" isDisabled countOptions={badgeCountObjectNotRead}>
                        Issues
                    </Button>
                </Flex>
                <br />
                <div>Read:</div>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button variant="primary" countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="secondary" countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="tertiary" countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="control" countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="link" countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                </Flex>
                <br />
                <div>Read disabled:</div>
                <Flex columnGap={{ default: 'columnGapSm' }}>
                    <Button variant="primary" isDisabled countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="secondary" isDisabled countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="tertiary" isDisabled countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="control" isDisabled countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                    <Button variant="link" isDisabled countOptions={badgeCountObjectRead}>
                        Issues
                    </Button>
                </Flex>
            </section>
            <section>
                <Title headingLevel="h3">Plain with no padding            </Title>
                <p>
                    This is an example of a button
                    <Button variant="plain" hasNoPadding aria-label="More info" icon={<QuestionCircleIcon />} />
                    which is placed inline with text
                </p>
            </section>
            <section>
                <Title headingLevel="h3">Stateful</Title>
                <Flex>
                    <div>
                        <div>
                            <strong>Read</strong>
                        </div>
                        <Button variant="stateful" state="read" icon={<BellIcon />}>
                            10 <span className="pf-v6-screen-reader">items</span>
                        </Button>
                    </div>
                    <div>
                        <div>
                            <strong>Unread</strong>
                        </div>
                        <Button variant="stateful" state="unread" icon={<BellIcon />}>
                            10 <span className="pf-v6-screen-reader">unread items</span>
                        </Button>
                    </div>
                    <div>
                        <div>
                            <strong>Attention</strong>
                        </div>
                        <Button variant="stateful" state="attention" icon={<BellIcon />}>
                            10 <span className="pf-v6-screen-reader">unread items, needs attention</span>
                        </Button>
                    </div>
                </Flex>
            </section>
        </Card>

    </>

}

export default PfButton;