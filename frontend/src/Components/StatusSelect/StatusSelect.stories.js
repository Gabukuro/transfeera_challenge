import StatusSelect from '.';

export default {
    title: 'StatusSelect',
    component: StatusSelect,
};

const Template = (args) => <StatusSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    onChange: (value) => console.log(value),
}