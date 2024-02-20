# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container



WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container

# run npm install in our local machine

# copy the generated modules and all other files to the container
COPY . .
RUN npm install
#WORKDIR /
#RUN rm -r usr/src/app/node_modules

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 3001

# the command that starts our app
CMD ["npm", "run" , "dev" , "--", "--host" , "0.0.0.0"]