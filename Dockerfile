FROM node:14.15.0-buster-slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
ENV NAME Like_Service
ENV NODE_ENV production
CMD ["npm", "start"]