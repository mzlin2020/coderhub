const fs = require('fs')

const useRoutes = (app) => { //readdirSync读取文件夹下的所有文件
    fs.readdirSync(__dirname).forEach(file => {
        if(file === 'index.js') return  //除了index.js
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}

module.exports = useRoutes