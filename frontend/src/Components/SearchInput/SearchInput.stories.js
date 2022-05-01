import SearchInput from ".";

export default {
    title: 'SearchInput',
    component: SearchInput,
};

const Template = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    onChange: (value) => console.log(value),
}