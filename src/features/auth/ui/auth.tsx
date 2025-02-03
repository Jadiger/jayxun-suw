import { Await, Outlet, useLoaderData } from 'react-router-dom'
import { AuthProvider } from '../auth-context/auth-provider'
import { Suspense } from 'react'
import { Center, Loader } from '@mantine/core'

export const Auth = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { auth } = useLoaderData()

  return (
    <Suspense
      fallback={
        <Center h={'100vh'}>
          <Loader />
        </Center>
      }
    >
      <Await
        resolve={auth}
        children={(auth) => {
          return (
            <AuthProvider authored={auth.isAuth} authorizedUser={auth.user}>
              <Outlet />
            </AuthProvider>
          )
        }}
      />
    </Suspense>
  )
}
