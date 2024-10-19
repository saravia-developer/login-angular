FROM node:20-alpine
WORKDIR /front
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4400
CMD ["npm", "start"]
