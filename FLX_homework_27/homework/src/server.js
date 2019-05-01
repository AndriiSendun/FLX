const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use('/car', require('./routes'));

const PORT = 3000;
app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
