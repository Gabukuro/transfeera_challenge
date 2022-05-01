const FilterTab = require('.').default

export default {
    title: 'FilterTab',
    component: FilterTab,
};

const Template = (args) => <FilterTab {...args} />;

export const Default = Template.bind({});
Default.args = {}
