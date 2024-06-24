// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: string
    username: string
    avatar?: string
    discriminator: string
  }

  interface UserSession {
    // Add your own fields
  }
}

export {}
