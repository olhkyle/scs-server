const allowedOrigins = [process.env.CLIENT_SIDE_DEV_URL, process.env.CLIENT_SIDE_PRODUCTION_URL].filter((url): url is string => !!url);

export default allowedOrigins;
