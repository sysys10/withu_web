import { LoginFormValues, RegisterFormValues } from '@/types'

type RegisterFormErrors = {
  [K in keyof RegisterFormValues]?: string
}

export function RegisterValidation(values: RegisterFormValues): RegisterFormErrors {
  const errors: RegisterFormErrors = {}

  // 비밀번호 검증
  if (values.password?.length < 8) {
    errors.password = '8자 이상의 패스워드를 사용해야 합니다.'
  } else if (!/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/.test(values.password)) {
    errors.password = '비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.'
  }

  // 비밀번호 확인 검증
  if (!values.passwordCheck) {
    errors.passwordCheck = '비밀번호 확인이 입력되지 않았습니다.'
  } else if (values.password !== values.passwordCheck) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.'
  }

  // 이메일 검증
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '입력된 이메일이 유효하지 않습니다.'
  }
  if (!values.name) {
    errors.name = '이름을 입력해주세요.'
  }

  return errors
}

type LoginFormErrors = {
  [K in keyof LoginFormValues]?: string
}

export function LoginValidation(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}

  // 이메일 검증
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '입력된 이메일이 유효하지 않습니다.'
  }
  // 비밀번호 검증
  if (!values.password) {
    errors.password = '비밀번호를 입력해주세요.'
  } else if (values.password?.length < 8) {
    errors.password = '8자 이상의 패스워드를 사용해야 합니다.'
  } else if (!/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/.test(values.password)) {
    errors.password = '비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.'
  }

  return errors
}
