import { Button, Center, Group, Loader, TextInput } from '@mantine/core'

import { CraeteNewOrderForBaseClient } from './create-new-order'
import { useFethcClient } from '@/features/clients/queries/client-queries'
import { useEffect, useState } from 'react'

function NewOrderForBaseClient() {
  const [id, setId] = useState('')
  const [search, setSearch] = useState(false)

  const { data, isFetching, isSuccess } = useFethcClient(Number(id), {
    queryKey: ['client', id],
    enabled: search,
    gcTime: 0,
    staleTime: 0,
  })

  useEffect(() => {
    setSearch(false)
  }, [isFetching])

  return (
    <>
      <div className="container">
        <Group justify="space-between" align="flex-end" mt={16}>
          <TextInput
            type="number"
            label="Клиент ID"
            placeholder="Введите ID клиента"
            withAsterisk
            value={id}
            onChange={(value) => setId(value.currentTarget.value)}
            flex={'1 0 0'}
          />
          <Button
            type="submit"
            color="var(--mantine-color-primary-5)"
            loading={isFetching}
            onClick={() => setSearch(true)}
          >
            Найти
          </Button>
        </Group>
      </div>

      {isFetching && (
        <Center mt={20}>
          <Loader />
        </Center>
      )}

      {!isFetching && isSuccess && <CraeteNewOrderForBaseClient data={data} />}
    </>
  )
}

export default NewOrderForBaseClient
