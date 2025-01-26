# 构建阶段
FROM node:18-alpine AS builder
# FROM registry.npmmirror.com/node:18-alpine AS builder

WORKDIR /project

RUN npm install -g pnpm

# 配置 pnpm 以允许不匹配的 peer dependencies
RUN pnpm config set auto-install-peers true
RUN pnpm config set strict-peer-dependencies false

COPY package.json pnpm-workspace.yaml ./
COPY Server/package.json ./Server/
COPY Tracing/package.json ./Tracing/

# 安装所有依赖
RUN pnpm install

# 然后再复制源代码
COPY Server/prisma ./Server/prisma
COPY Server/tsconfig*.json ./Server/
COPY Server/nest-cli.json ./Server/
COPY Server ./Server
COPY Tracing ./Tracing

WORKDIR /project/Server

RUN pnpm install
RUN npm install -g @nestjs/cli
RUN pnpm install @nestjs/core @nestjs/common @nestjs/platform-express

# 生成 Prisma Client
RUN npx prisma generate

RUN pnpm build

# 生产阶段
FROM node:18-alpine
# FROM registry.npmmirror.com/node:18-alpine

WORKDIR /project

# 复制 workspace 配置
COPY package.json pnpm-workspace.yaml ./
COPY Server/package.json ./Server/
COPY Tracing/package.json ./Tracing/

# 复制 prisma 文件
COPY Server/prisma ./Server/prisma

# 复制构建产物
COPY --from=builder /project/Server/dist ./Server/dist

# 安装生产依赖并生成 Prisma Client
RUN npm install -g pnpm && \
    pnpm install --prod && \
    cd Server && \
    npx prisma generate

WORKDIR /project/Server

# 生成 Prisma Client
RUN npx prisma generate

EXPOSE 24567

CMD ["node", "dist/main"]
