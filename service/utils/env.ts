/* eslint-disable import/no-mutable-exports */
import * as Yup from 'yup'

const envVariables = Yup.object({
  NODE_ENV: Yup.string().required(),
  NEXT_PUBLIC_BASE_URL: Yup.string().url().required(),
})

const { NODE_ENV, NEXT_PUBLIC_BASE_URL } = process.env

let environmentVariables: Yup.InferType<typeof envVariables>

try {
  environmentVariables = envVariables.validateSync(
    {
      NODE_ENV,
      NEXT_PUBLIC_BASE_URL,
    },
    { abortEarly: false },
  )
} catch (error) {
  if (error instanceof Yup.ValidationError) {
    console.error(error.errors) // eslint-disable-line no-console
  }
  throw new Error("Environment doesn't match the schema")
}

export { environmentVariables }

// TypeScript type definition
type EnvVarSchemaType = Yup.InferType<typeof envVariables>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}
