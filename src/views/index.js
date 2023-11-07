import AppRoute from 'components/route/AppRoute'
import ProtectedRoute from 'components/route/ProtectedRoute'
import PublicRoute from 'components/route/PublicRoute'
import AuthContainer from 'components/template/AuthContaier'
import PageContainer from 'components/template/PageContainer'
import appConfig from 'configs/app.config'
import { ProtectedRoutes, authRoutes } from 'configs/routes.config'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props) => {

    const mainroutes = [...ProtectedRoutes]

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={<Navigate replace to={authenticatedEntryPath} />}
                />
                {mainroutes.map((route, index) => (
                    <Route
                        key={route.key + index}
                        path={route.path}
                        element={
                            <PageContainer {...props} {...route.meta}>
                                <AppRoute
                                    routeKey={route.key}
                                    component={route.component}
                                />
                            </PageContainer>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
                {authRoutes.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={
                            <AuthContainer {...props} {...route.meta}>
                                <AppRoute
                                    routeKey={route.key}
                                    component={route.component}
                                />
                            </AuthContainer>
                        }
                    />
                ))}
            </Route>
        </Routes>
    )
}

export default function Views() {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <AllRoutes />
            </Suspense>
        </div>
    )
}
