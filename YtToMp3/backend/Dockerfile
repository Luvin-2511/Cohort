FROM node:20
RUN apt-get update && apt-get install -y python3 pip ffmpeg
RUN pip install yt-dlp --break-system-packages
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]