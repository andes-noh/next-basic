import React from 'react'
import 'reflect-metadata'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1_000 * 60, // fetch 1분간 refetch 하지 않도록 캐싱
    },
  },
})

if (typeof window !== 'undefined') {
  const localStoragePersistor = createWebStoragePersistor({
    storage: window.localStorage,
  })

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  })
}

const MyApp: React.FC<AppProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <props.Component {...props.pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
