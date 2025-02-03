import {
  Button,
  FileButton,
  Group,
  Loader,
  Stack,
  TextInput,
} from '@mantine/core'
import style from './product-form.module.css'
import { useState } from 'react'
import { X } from 'react-feather'
import { isNotEmpty, useForm } from '@mantine/form'
import { ProductBody } from '../../types/products'
import { useFileUpload } from '@/shared/hooks/use-file-upload'
import { BottomButtonWrapper } from '@/shared/ui'

const initialData: ProductBody = {
  image: '',
  name: '',
  price: undefined,
}

export const ProductForm = ({
  initialValues = initialData,
  submitFn,
  loading,
  title,
}: {
  initialValues?: ProductBody
  submitFn: (data: ProductBody) => Promise<unknown>
  loading: boolean
  title: string
}) => {
  const [file, setFile] = useState<File | null>(null)

  const { fileUpload, isloading } = useFileUpload()

  const form = useForm<ProductBody>({
    initialValues,
    validate: {
      image: isNotEmpty('required'),
      name: isNotEmpty('required'),
      price: isNotEmpty('required'),
    },
  })

  const handleSubmit = async (data: typeof form.values) => {
    try {
      await submitFn(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async (file: File | null) => {
    await fileUpload(file).then((path) => {
      if (path) {
        form.setFieldValue('image', path ?? '')
      }
    })
  }

  return (
    <form className="container" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack py={12} gap={24}>
        <div>
          <Group gap={12} p={0} wrap="nowrap">
            <div className={style.imageBlock}>
              <img
                src={`${
                  !isloading && form.values.image
                    ? form.values.image
                    : '/products/defaultProduct.svg'
                }`}
                className={style.image}
              />
              {!isloading && file && (
                <span
                  className={style.resetImage}
                  onClick={() => {
                    form.setFieldValue('image', '')
                    setFile(null)
                  }}
                >
                  <X size={24} color="#fff" />
                </span>
              )}

              {isloading && (
                <Loader
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
            </div>
            <Stack gap={8} p={0}>
              <p className={style.title}>Загрузить фото</p>
              <FileButton onChange={handleUpload} accept="image/png,image/jpeg">
                {(props) => (
                  <div {...props}>
                    <p className={style.uploadImage}>Выберите файл</p>
                  </div>
                )}
              </FileButton>
              {file && <p className={style.imageName}>{file.name}</p>}
            </Stack>
          </Group>
          {form.errors.image && (
            <span style={{ color: '#d45847', fontSize: '14px' }}>
              {form.errors.image}
            </span>
          )}
        </div>

        <Stack gap={12}>
          <TextInput
            label="Название товара"
            withAsterisk
            placeholder="Введите название товара"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Цена"
            withAsterisk
            placeholder="Введите цена товара. Только число"
            type="number"
            min={0}
            {...form.getInputProps('price')}
          />
        </Stack>

        {/* <Stack gap={12}>
            <Title order={4}>Количество</Title>
            <TextInput
              label="На складе"
              withAsterisk
              placeholder="Сколько на складе"
              type="number"
            />
            <TextInput
              label="В продаже"
              withAsterisk
              placeholder="Сколько в продаже"
              type="number"
            />
          </Stack> */}

        <BottomButtonWrapper
          render={
            <Group wrap="nowrap">
              <Button
                type="submit"
                fullWidth
                loading={loading}
                color="var(--mantine-color-primary-5)"
              >
                {title}
              </Button>
            </Group>
          }
        />
      </Stack>
    </form>
  )
}
