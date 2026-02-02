const app = require('./src/app')
let Port = 3000


app.listen(Port, () => {
    console.log(`Server is listening at port :${Port}`);
})