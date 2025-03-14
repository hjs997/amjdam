# 选择 Node.js 官方基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 以便安装依赖
COPY package.json package-lock.json* ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 运行应用
CMD ["node", "index.js"]
