import StatusInfo from '.';

export default {
    title: 'StatusInfo',
    component: StatusInfo,
};

const Template = (args) => <StatusInfo {...args} />;

export const Valid = Template.bind({});
Valid.args = {
    status: 'valid',
}

export const Invalid = Template.bind({});
Invalid.args = {
    status: 'invalid',
}

export const Draft = Template.bind({});
Draft.args = {
    status: 'draft',
}

export const New = Template.bind({});
New.args = {
    status: 'new',
}