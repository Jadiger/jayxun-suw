import { queryClient } from '@/shared/config/query-client'
import { router } from '@/shared/config/router'
import { theme } from '@/shared/config/theme'
import { customModals } from '@/shared/ui/custom-modals/custom-modals'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'

import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <MantineProvider theme={theme}>
        <ModalsProvider modals={customModals}>
          <Notifications position="top-right" />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
