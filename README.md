# HomeVision


## Requirement

It is necessary to have install `NodeJs` and `Yarn`

## Configuration (optional)

Create an` .env` with the following values

```
IMAGE_FOLDER=./images
HOMES_API_URL=http://app-homevision-staging.herokuapp.com/api_project/houses
```

- IMAGE_FOLDER: location where to store the images (make sure to give the right permissions)
- HOMES_API_URL: url for the API

## Install dependencies, build and execute

```bash
yarn
yarn build
yarn start
```