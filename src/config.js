let apiPath
let apiKey

if (process.env.NODE_ENV === 'production') {
    apiPath = process.env.REACT_APP_API_ENDPOINT
    apiKey = process.env.REACT_APP_TOKEN_KEY
} else {
    apiPath = 'http://localhost:8000/api'
    apiKey = 'init-client-auth-token'
}

export default {
    REACT_APP_API_ENDPOINT: apiPath,
    REACT_APP_TOKEN_KEY: apiKey,
}