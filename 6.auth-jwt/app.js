const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000

const user = require('./routes/user')
const note = require('./routes/note')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(`Halo gper.. teruslah mencoba!!`)
})
app.use('/', user)
app.use('/notes', note)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
