// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: string
    username: string
    avatar?: string
  }

  interface UserSession {
    // add your own props if needed
  }
}

export {}
