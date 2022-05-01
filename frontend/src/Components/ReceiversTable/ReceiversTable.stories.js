const ReceiversTable = require('.').default

export default {
    title: 'ReceiversTable',
    component: ReceiversTable,
};

// const sampleData = [{"id":1,"name":"Gildo Carvalho Filho","cpf_cnpj":"74735641610","email":"Cynthia_Melo17@hotmail.com","pix_key":"74735641610","pix_key_type":"CPF","status":"valid"},{"id":2,"name":"Cristina Macedo","cpf_cnpj":null,"email":"Desir_Nogueira@hotmail.com","pix_key":"15405516953","pix_key_type":"CPF","status":"draft"},{"id":3,"name":"Dijosilene Reis","cpf_cnpj":"11153523183","email":"Marlete_Costa30@gmail.com","pix_key":"11153523183","pix_key_type":"CPF","status":"valid"},{"id":4,"name":"Anibal Carvalho","cpf_cnpj":"14432176970","email":"Valeria.Martins3@hotmail.com","pix_key":"14432176970","pix_key_type":"CPF","status":"valid"},{"id":5,"name":"Tarly Xavier","cpf_cnpj":null,"email":"Dov77@live.com","pix_key":"24612053613","pix_key_type":"CPF","status":"draft"},{"id":6,"name":"Dilton Albuquerque","cpf_cnpj":"31912227231","email":"Marins78@gmail.com","pix_key":"31912227231","pix_key_type":"CPF","status":"valid"},{"id":7,"name":"Kacia Albuquerque Filho","cpf_cnpj":"38414459692","email":"Pedro_Costa34@bol.com.br","pix_key":"38414459692","pix_key_type":"CPF","status":"valid"},{"id":8,"name":"Catarina Reis","cpf_cnpj":null,"email":"Hudson.Pereira@bol.com.br","pix_key":"39211834643","pix_key_type":"CPF","status":"draft"},{"id":9,"name":"Márcia Martins","cpf_cnpj":"83319574663","email":"Cidinei_Melo@hotmail.com","pix_key":"83319574663","pix_key_type":"CPF","status":"valid"},{"id":10,"name":"Lucicleide Macedo Jr.","cpf_cnpj":null,"email":"Caio.Xavier@live.com","pix_key":"56615335433","pix_key_type":"CPF","status":"draft"}]
const sampleData = [{ "id": 1, "name": "Gildo Carvalho Filho", "cpf_cnpj": "74735641610", "email": "Cynthia_Melo17@hotmail.com", "pix_key": "74735641610", "pix_key_type": "CPF", "status": "valid" }]
const Template = (args) => <ReceiversTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: sampleData,
    totalPages: 3,
    currentPage: 1,
    rowsPerPage: 10,
}

