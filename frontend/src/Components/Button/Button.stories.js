import Button from '.';

export default {
    title: 'Button',
    component: Button,
};

const Template = (args) => <Button {...args}>Click</Button>;

export const Delete = Template.bind({});
Delete.args = {
    type: 'delete'
}

export const Save = Template.bind({});
Save.args = {
    type: 'save'
}

export const Cancel = Template.bind({});
Cancel.args = {
    type: 'cancel'
}