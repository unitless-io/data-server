#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:16.15.0-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --quiet

COPY tsconfig.json ./
COPY .babelrc ./
COPY ./src ./src

RUN npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:16.15.0-slim

ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/index.js"]
