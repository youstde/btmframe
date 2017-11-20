###gameframe 测试
cd test;node ../build.js create;

### 使用
```
cnpm install git+ssh://git@github.com:youstde/btmframe.git;node node_modules/btmframe/build.js create

```
根目录中，gulp文件，package.json等配置文件都是公用的，
只会在初始化时候去创建：
1.mock，src/layout，src/page
我们的业务代码是写在src=>page下面