FROM --platform=linux/amd64 node:22.17.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM --platform=linux/amd64 node:22.17.0-alpine
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/
COPY --from=build /app/data /app/data


EXPOSE 3000

CMD ["node", "dist/server.js"]
