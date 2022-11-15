# Pull official base image
FROM node:16-alpine

# Create the appropriate directories
ENV APP_HOME=/home/app/web

RUN mkdir -p $APP_HOME

# Set working directory
WORKDIR $APP_HOME

# Set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1

COPY ./package*.json ./
RUN npm install

# Copy project files
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]