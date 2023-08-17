# chrome-disable-web-security-macos

open Google Chrome.app with args --disable-web-security in macos

# init

npm i

# local

替换 main.js 中 run_script 方法入参中的 ROOT 为 mac 根目录名字<br>
npm run start
![avatar](/assets/script.jpg)

# build

npm run make<br>
移动 chrome-disable-web-security-macos/out/make/Google Chrome 2-darwin-arm64/Google Chrome 2.app 至应用程序<br>
确保应用程序已安装 Google Chrome.app
![avatar](/assets/name.jpg)
