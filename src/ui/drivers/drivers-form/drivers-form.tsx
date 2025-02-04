import {
  Button,
  Center,
  Group,
  Loader,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
// import style from './drivers-form.module.css'
// import { useState } from 'react'
// import { X } from 'react-feather'
// import { isNotEmpty, useForm } from '@mantine/form'

// import { http } from '@/shared/config/http'
import { isNotEmpty, useForm } from '@mantine/form'
import { ICourierBody } from '../../../types/drivers'
import { PatternFormat } from 'react-number-format'
import { BottomButtonWrapper } from '@/shared/ui'

export const DriverForm = ({
  initialValues,
  loading,
  submitFn,
  isLoading,
  title,
  isEdit,
}: {
  initialValues?: ICourierBody
  loading: boolean
  submitFn: (data: ICourierBody) => Promise<unknown>
  isLoading?: boolean
  title: string
  isEdit?: boolean
}) => {
  // const [file, setFile] = useState<File | null>(null)
  const handleSubmit = async (data: typeof form.values) => {
    try {
      submitFn(data)
    } catch (error) {
      console.log(error)
    }
  }
  const form = useForm<ICourierBody>({
    initialValues,
    validate: {
      // image: isNotEmpty('required'),
      firstName: isNotEmpty('required'),
      lastName: isNotEmpty('required'),
      carName: isNotEmpty('required'),
      carNumber: isNotEmpty('required'),
      password: !isEdit ? isNotEmpty('required') : undefined,
    },
    transformValues: (values) => {
      return {
        ...values,
        phoneNumber: `998${values.phoneNumber}`,
      }
    },
  })

  // const fileUpload = async (file: File | null) => {
  //   setFile(file)
  //   const formData = new FormData()

  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   formData.set('file', file)

  //   try {
  //     const { data } = await http.post<{ fileName: string; path: string }>(
  //       'upload',
  //       formData
  //     )
  //     // form.setFieldValue('image', data.path)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      {isLoading && (
        <Center>
          <Loader mt={30} />
        </Center>
      )}
      {isLoading || (
        <form
          className="container"
          onSubmit={form.onSubmit(handleSubmit)}
          style={{ marginBottom: '30px' }}
        >
          <Stack py={12} gap={24}>
            <Group gap={12} p={0} wrap="nowrap">
              {/* <div className={style.imageBlock}>
            <img
              src={`${
                form.values.image
                  ? form.values.image
                  : '/products/defaultProduct.svg'
              }`}
              className={style.image}
            />
            {form.values.image && (
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
          </div> */}
              {/* <Stack gap={8} p={0}>
            <p className={style.title}>Загрузить фото</p>
            <FileButton onChange={fileUpload} accept="image/png,image/jpeg">
              {(props) => (
                <div {...props}>
                  {file && <p className={style.imageName}>{file.name}</p>}
                  {!file && <p className={style.uploadImage}>Выберите файл</p>}
                </div>
              )}
            </FileButton>
          </Stack> */}
            </Group>
            <Stack gap={12}>
              <TextInput
                label="Имя водителя"
                withAsterisk
                placeholder="Введите имя водителя"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Фамилия водителя"
                withAsterisk
                placeholder="Введите фамилию водителя"
                {...form.getInputProps('lastName')}
              />
              <PatternFormat
                withAsterisk
                format="+998 ## ### ## ##"
                mask=" "
                allowEmptyFormatting={true}
                customInput={TextInput}
                label="Номер телефона"
                {...form.getInputProps('phoneNumber')}
                onValueChange={(values) => {
                  form.setFieldValue('phoneNumber', values.value)
                }}
                onChange={() => {}}
              />
              <TextInput
                label="Марка автомобиля"
                withAsterisk
                placeholder="Введите марка автомобиля"
                {...form.getInputProps('carName')}
              />
              <TextInput
                label="Номер автомобиля"
                withAsterisk
                placeholder="Введите номер автомобиля"
                {...form.getInputProps('carNumber')}
              />
              <TextInput
                label="Логин"
                withAsterisk
                placeholder="Введите логин"
                {...form.getInputProps('username')}
              />
              {!isEdit && (
                <PasswordInput
                  label="Пароль"
                  withAsterisk
                  placeholder="Введите пароль"
                  {...form.getInputProps('password')}
                />
              )}
            </Stack>

            <BottomButtonWrapper
              render={
                <Group wrap="nowrap">
                  <Button
                    type="submit"
                    fullWidth
                    loading={loading}
                    color="var(--mantine-color-primary-5)"
                    disabled={!form.isDirty()}
                  >
                    {title}
                  </Button>
                </Group>
              }
            />
          </Stack>
        </form>
      )}
    </>
  )
}
