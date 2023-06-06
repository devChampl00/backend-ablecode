const express = require('express'),
    app = express(),
    route = express.Router(),
    port = 3000,
    { getUsers, storeUser, updateUser, deleteUser } = require('./controllers/User');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

app.get('/', (req, res) => {
    res.send('Halo Gper.. teruslah mencoba!!');
});

app.get('/users', getUsers);
app.post('/users', storeUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
