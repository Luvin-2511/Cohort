FROM node:20
RUN apt-get update && apt-get install -y python3 ffmpeg
RUN ln -s /usr/bin/python3 /usr/bin/python
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]