const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    user = require('./routes/user'),
    note = require('./routes/note');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/', user);
app.use('/', note);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
