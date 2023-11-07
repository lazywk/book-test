import axios from "axios";
const { default: appConfig } = require("configs/app.config");
const { PERSIST_STORE_NAME, REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } = require("constant/app.constant");
const { default: store } = require("store");
const { onSignOutSuccess } = require("store/auth/sessionSlice");
const { default: deepParseJson } = require("utils/deepPareJson");



const BaseService = axios.create({
    baseURL: appConfig.apiPrefix,
    timeout: 60000
})

const unauthorizedCode = [403]


BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        let accessToken = persistData.auth.session.token

        if (accessToken) {
            const { auth } = store.getState()
            accessToken = auth.session.token
        }

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(onSignOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService