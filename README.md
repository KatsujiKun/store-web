# empty-vue

### 项目运行依赖
1. Nodejs 12.x +
2. vue 2.x
3. @vue/cli@4

### 项目的运行命令
1. npm run start/npm start 运行开发环境--可以在项目中进行功能开发
2. npm run build 项目打包、项目构建
3. npm run lint 代码质量检查

### 项目架构
```
|—— empty-vue
    |—— package.json                     项目依赖管理文件
    |—— public                           项目静态资源包--一般不会做开发
        |—— favicon.ico                  网站的偏好图标
        |—— index.html                   vue项目一般都是单页应用--整个应用只有一个html页面，它就是项目的html入口文件
    |—— src (source)                     整个项目的开发目录，所有的项目功能文件全部被包含在这个文件夹中
        |—— main.js                      它是整个项目的JS入口
```