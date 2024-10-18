FROM node:20-alpine
WORKDIR /front
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
EXPOSE 4400
CMD ["npm", "start"]
