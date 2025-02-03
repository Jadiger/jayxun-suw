import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button, Group, Select, Stack } from '@mantine/core'

import { Dispatch, SetStateAction } from 'react'
import { DateInput } from '@mantine/dates'
import { ChevronRight } from 'react-feather'
import { BottomButtonWrapper } from '@/shared/ui'

export const AllOldersFilter = ({
  setFilter,
  setFilterModal,
}: {
  setFilter: Dispatch<SetStateAction<boolean>>
  setFilterModal: Dispatch<SetStateAction<boolean>>
}) => {
  const closeModal = () => {
    setFilterModal(false)
  }

  return (
    <Stack
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#fff',
        zIndex: '10',
      }}
    >
      <PageHead
        title="Фильтр"
        render={<ChevronRight color="var(--mantine-color-gray-1)" />}
        onClick={closeModal}
        noLink={true}
      />
      <Stack px={16} pt={12} gap={12}>
        <Group justify="space-between" wrap="nowrap">
          <DateInput
            // value={value}
            // onChange={setValue}
            label="С"
            placeholder="01.01.25"
            width={'100%'}
          />
          <DateInput
            // value={value}
            // onChange={setValue}
            label="По"
            placeholder="01.01.25"
            width={'100%'}
          />
        </Group>
        <Select
          label="Водитель"
          withAsterisk
          placeholder="Выберите водитель"
          data={['Bazarbay', 'Saparbay']}
          clearable
        />
        <Select
          label="Статус *"
          withAsterisk
          placeholder="Выберите статус *"
          data={['Успешно', 'Отменен']}
          clearable
        />
      </Stack>
      <BottomButtonWrapper
        render={
          <Group wrap="nowrap">
            <Button
              bg="var(--mantine-color-red-0)"
              fullWidth
              onClick={() => {
                setFilter(false)
                setFilterModal(false)
              }}
            >
              Сброс
            </Button>
            <Button
              bg="var(--mantine-color-primary-5)"
              fullWidth
              onClick={() => {
                setFilter(true)
                setFilterModal(false)
              }}
            >
              Применить
            </Button>
          </Group>
        }
      />
    </Stack>
  )
}
