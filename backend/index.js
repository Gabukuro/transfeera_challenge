const app = require('./src/app')

PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);