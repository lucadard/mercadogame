declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ML_CLIENT_SECRET: string | undefined
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
