import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist/es'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import { PERSIST_STORE_NAME } from 'constant/app.constant'



const middlewares = []

const persistConfig = {
    key: PERSIST_STORE_NAME,
    keyPrefix: '',
    storage,
    whitelist: ['auth'],
}


const store = configureStore({
    reducer:
        persistReducer(persistConfig, rootReducer()),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }).concat(middlewares),
    devTools: 'development',
})


store.asyncReducers = {}

const persistor = persistStore(store)

export const injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) {
        return false
    }
    store.asyncReducers[key] = reducer
    store.replaceReducer(
        persistReducer(persistConfig, rootReducer(store.asyncReducers))
    )
    persistor.persist()
    return store
}

export default store