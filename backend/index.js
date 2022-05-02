const app = require('./src/app')

PORT = process.env.PORT || 8000;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);