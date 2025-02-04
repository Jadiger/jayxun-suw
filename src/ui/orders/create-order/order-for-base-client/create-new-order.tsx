import { IClient } from '@/types/clients'
import { useFetchCouriers } from '@/queries/courierQueries'
import {
  useCreateNewOrder,
  useFetchProductsList,
} from '@/queries/orders-queries'
import { CreateNewOrderTransBody } from '@/types/orders'
import { BottomButtonWrapper } from '@/shared/ui'
import ClientInfo from '@/shared/ui/client-info/client-info'
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Loader,
  Select,
  Stack,
  Title,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { Minus, Plus } from 'react-feather'
import { useNavigate } from 'react-router-dom'

export const CraeteNewOrderForBaseClient = ({ data }: { data: IClient }) => {
  const navigate = useNavigate()

  const { data: products, isLoading } = useFetchProductsList()
  const { data: couriers, isLoading: isCourierLoading } = useFetchCouriers()

  const cretaeOrderMutation = useCreateNewOrder()

  const form = useForm<CreateNewOrderTransBody>({
    initialValues: {
      clientId: null,
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
      courierId: isNotEmpty('required'),
      productIds: {
        productId: isNotEmpty('required'),
      },
    },
  })

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

  const hanldeSubmit = async (values: typeof form.values) => {
    const transveredData = {
      ...values,
      clientId: data.id.toString(),
      productIds: values.productIds.flatMap((product) =>
        Array.from({ length: product.count }, () => Number(product.productId))
      ),
    }

    try {
      cretaeOrderMutation.mutateAsync(transveredData).then(() => {
        navigate('/')
        form.reset()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const fields = form.values.productIds.map((_, index) => (
    <Stack
      mt="xs"
      key={index}
      p={12}
      bg={'var(--mantine-color-gray-0)'}
      style={{
        border: '1px solid var(--mantine-color-gray-3)',
        borderRadius: '8px',
      }}
    >
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
  ))

  return (
    <form onSubmit={form.onSubmit(hanldeSubmit)}>
      <div className="container">
        <Stack gap={0} pt={12}>
          <ClientInfo title="Клиент" info={data.fullName} />
          <Divider my={12} />
          <ClientInfo title="Номер телефона" info={data.phoneNumber} />
          <Divider my={12} />
          <ClientInfo title="Адрес" info={data.streetName} />
          <Divider my={12} />
          <ClientInfo title="Ориентир" info={data.landmark} />
          <Divider my={12} />
        </Stack>

        <Stack gap={12} pt={16} pb={40}>
          <Title order={5} p={0}>
            Товары
          </Title>

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

          <Group justify="space-between">
            <p
              style={{ color: 'var(--mantine-color-gray-6)', fontSize: '16px' }}
            >
              Всего
            </p>
            <Title order={4} style={{ color: 'var(--mantine-color-gray-8)' }}>
              {calculateTotal()} сум
            </Title>
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
            <Button
              type="submit"
              fullWidth
              loading={cretaeOrderMutation.isPending}
            >
              Создать заказ
            </Button>
          </Group>
        }
      />
    </form>
  )
}
