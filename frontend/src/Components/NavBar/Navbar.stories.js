import NavBar from '.';

export default {
    title: 'NavBar',
    component: NavBar,
};

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    links: [{'name': 'Home', 'path': '/'}, {'name': 'About', 'path': '/about'}],
}
