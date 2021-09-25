FROM node:erbium

WORKDIR /app
COPY . /app/
ENV NODE_ENV=production
RUN npm install --production

EXPOSE 4001

CMD ["npm", "start"]
