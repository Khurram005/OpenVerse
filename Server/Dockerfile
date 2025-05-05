FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./docker-entrypoint.sh"]
