import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
} from '@chakra-ui/react'
import { useField } from 'formik'
import { ReactNode } from 'react'

interface IInputFieldProps {
  name: string
  label?: string
  leftAddon?: ReactNode
  [key: string]: unknown
}

export const InputField = (props: IInputFieldProps): JSX.Element => {
  const [field, meta] = useField(props)
  const { label, leftAddon, ...restOfProps } = props

  return (
    <FormControl id={props.name} isInvalid={!!meta.error && !!meta.touched}>
      {label && (
        <FormLabel mb={1} htmlFor={props.name}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {leftAddon && (
          <InputLeftAddon bg="purple.50">{leftAddon}</InputLeftAddon>
        )}
        <Input focusBorderColor="purple.500" {...field} {...restOfProps} />
      </InputGroup>
      {meta.error && meta.touched && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  )
}
