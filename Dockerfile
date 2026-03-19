# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /workspace

# Copy templates and component images (needed at build time)
COPY template_email.md template_markdown.md ./
COPY component/ ./component/

# Install dependencies
COPY app/package.json app/package-lock.json* ./app/
WORKDIR /workspace/app
RUN npm install

# Copy app source and build
COPY app/ ./
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /workspace/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
