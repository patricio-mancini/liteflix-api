FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
COPY . ./
RUN npm install
RUN npm run build
CMD ["npm", "start"]
