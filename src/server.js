const { serverHttp } = require('./http')
require('./websockets.js')

serverHttp.listen(3000, () => console.log('Server is running'))