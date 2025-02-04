import {
  ActionIcon,
  Button,
  Group,
  Loader,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'

import { hasLength, isNotEmpty, useForm } from '@mantine/form'

import { Minus, Plus, X } from 'react-feather'

import {
  useCreateNewClientOrder,
  useFetchProductsList,
} from '@/queries/orders-queries'

import { useFetchCouriers } from '@/queries/courierQueries'

import { PatternFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'

import { BottomButtonWrapper } from '@/shared/ui'

export const NewClientOrder = () => {
  const navigate = useNavigate()

  const createNewORder = useCreateNewClientOrder()
  const { data: products, isLoading } = useFetchProductsList()
  const { data: couriers, isLoading: isCourierLoading } = useFetchCouriers()

  const form = useForm({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      streetName: '',
      landmark: '',
      latitude: '',
      longitude: '',
      courierId: null,
      productIds: [
        {
          productId: null,
          count: 1,
          price: 0,
        },
      ],
    },
    validate: {
      fullName: hasLength({ min: 2 }, 'Keminde 2 belgi boliwi kerek'),
      phoneNumber: isNotEmpty('required'),
      streetName: hasLength({ min: 5 }, 'Keminde 5 belgi kiritiliwi kerek'),
      courierId: isNotEmpty('required'),
      productIds: {
        productId: isNotEmpty('required'),
      },
    },
    transformValues: (values) => {
      return {
        ...values,
        phoneNumber: `998${values.phoneNumber}`,
      }
    },
  })

  const hanldeSubmit = async (data: typeof form.values) => {
    const transveredData = {
      ...data,
      productIds: data.productIds.flatMap((product) =>
        Array.from({ length: product.count }, () => Number(product.productId))
      ),
    }

    try {
      createNewORder.mutateAsync(transveredData).then(() => {
        navigate('/')
        form.reset()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const transveredProducts = products?.map((product) => {
    const isDisabled = form.values.productIds.some(
      (item) => item.productId === product.id.toString()
    )

    return {
      label: `${product.name} - ${product.price} сум`,
      value: product.id.toString(),
      disabled: isDisabled,
    }
  })

  const transveredCuriers = couriers?.map((courier) => ({
    label:
      courier.lastName +
      ' ' +
      courier.firstName +
      ' - ' +
      courier.carName +
      ' ' +
      courier.carNumber,
    value: courier.id.toString(),
  }))

  const calculateTotal = () => {
    return form.values.productIds.reduce((total, product) => {
      return total + product.count * product.price
    }, 0)
  }

  const fields = form.values.productIds.map((_, index) => {
    return (
      <Stack
        key={index}
        mt="xs"
        p={12}
        bg={'var(--mantine-color-gray-1)'}
        style={{
          border: '1px solid var(--mantine-color-gray-2)',
          borderRadius: '8px',
        }}
      >
        {index > 0 && form.values.productIds.length - 1 === index && (
          <Group justify="end" mb={-10}>
            <ActionIcon
              variant="white"
              size={'lg'}
              onClick={() => form.removeListItem('productIds', index)}
            >
              <X size={25} />
            </ActionIcon>
          </Group>
        )}

        <Select
          label="Товар"
          withAsterisk
          placeholder="Выберите товар"
          rightSection={isLoading && <Loader size={16} />}
          data={transveredProducts}
          clearable
          {...form.getInputProps(`productIds.${index}.productId`)}
          onChange={(value) => {
            form.setFieldValue(`productIds.${index}.productId`, value)
            form.setFieldValue(
              `productIds.${index}.price`,
              products?.find((item) => item.id.toString() === value)?.price
            )
          }}
        />

        <Stack gap={8}>
          <p
            style={{
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Количество <span style={{ color: '#D45847' }}>*</span>
          </p>
          <Group
            justify="space-between"
            align="center"
            bg={'#fff'}
            p={12}
            style={{
              border: '1px solid var(--mantine-color-gray-2)',
              borderRadius: '8px',
            }}
            wrap="nowrap"
          >
            <ActionIcon
              color="var(--mantine-color-gray-8)"
              onClick={() => {
                if (form.values.productIds[index].count > 1) {
                  form.setFieldValue(
                    `productIds.${index}.count`,
                    --form.values.productIds[index].count
                  )
                }
              }}
              variant="transparent"
              disabled={!form.values.productIds[index].productId}
            >
              <Minus size={24} />
            </ActionIcon>

            {form.values.productIds[index].count}

            <ActionIcon
              color="var(--mantine-color-gray-8)"
              onClick={() =>
                form.setFieldValue(
                  `productIds.${index}.count`,
                  ++form.values.productIds[index].count
                )
              }
              variant="transparent"
              disabled={!form.values.productIds[index].productId}
            >
              <Plus size={24} />
            </ActionIcon>
          </Group>
        </Stack>
      </Stack>
    )
  })

  return (
    <form onSubmit={form.onSubmit(hanldeSubmit)}>
      <div className="container" style={{ marginBottom: '30px' }}>
        <Stack gap={12} pt={16}>
          <TextInput
            withAsterisk
            label="Клиент ФИО"
            placeholder="Введите ФИО"
            {...form.getInputProps('fullName')}
          />

          <PatternFormat
            withAsterisk
            format="+998 ## ### ## ##"
            mask=" "
            allowEmptyFormatting={true}
            customInput={TextInput}
            type="tel"
            label="Номер телефона"
            {...form.getInputProps('phoneNumber')}
            onValueChange={(values) => {
              form.setFieldValue('phoneNumber', values.value)
            }}
            onChange={() => {}}
          />
          <TextInput
            withAsterisk
            label="Адрес"
            placeholder="Введите адрес"
            {...form.getInputProps('streetName')}
          />

          <TextInput
            withAsterisk
            label="Ориентир"
            placeholder="Введите ориентир"
            {...form.getInputProps('landmark')}
          />

          {fields}

          <Group justify="center">
            <Button
              leftSection={<Plus />}
              onClick={() =>
                form.insertListItem('productIds', {
                  productId: null,
                  count: 1,
                  price: '',
                })
              }
              variant="light"
              disabled={form.values.productIds.length === products?.length}
            >
              Добавить еще
            </Button>
          </Group>

          <Group justify="space-between" wrap="nowrap">
            <p
              style={{ color: 'var(--mantine-color-gray-6)', fontSize: '16px' }}
            >
              Всего
            </p>
            <Title order={4}>{calculateTotal()} сум</Title>
          </Group>

          <Select
            label="Водитель"
            rightSection={isCourierLoading && <Loader size={16} />}
            clearable
            placeholder="Выберите водитель"
            data={transveredCuriers}
            {...form.getInputProps('courierId')}
          />
        </Stack>
      </div>

      <BottomButtonWrapper
        render={
          <Group wrap="nowrap">
            <Button type="submit" fullWidth loading={createNewORder.isPending}>
              Создать заказ
            </Button>
          </Group>
        }
      />
    </form>
  )
}
