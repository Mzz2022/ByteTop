FROM node:18-alpine as builder

WORKDIR /project

# 安装 pnpm
RUN npm install -g pnpm

# 设置 npm 镜像源以加快速度
RUN npm config set registry https://registry.npmmirror.com

# 复制工作区配置
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

# 复制前端项目配置和源代码
COPY Platform ./Platform
COPY Trace ./Trace

# 安装依赖
RUN pnpm install

# 在正确的目录下构建
WORKDIR /project/Platform
# 构建前端项目
RUN pnpm build

# 使用 alpine 作为基础镜像
FROM alpine:3.18
WORKDIR /dist
COPY --from=builder /project/Platform/dist /dist
# 添加一个简单的命令来保持容器运行
CMD ["tail", "-f", "/dev/null"]
