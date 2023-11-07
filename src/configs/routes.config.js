import React from "react";


export const authRoutes = [
    {
        key: 'login',
        path: '/login',
        component: React.lazy(() => import('views/auth/Login'))
    },
    {
        key: 'register',
        path: '/register',
        component: React.lazy(() => import('views/auth/Register'))
    },
    {
        key: 'not-found',
        path: '/not-found',
        component: React.lazy(() => import('views/404'))
    }
]

export const ProtectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/home/Home'))
    },
    {
        key: 'not-found',
        path: '/not-found',
        component: React.lazy(() => import('views/404'))
    }
]