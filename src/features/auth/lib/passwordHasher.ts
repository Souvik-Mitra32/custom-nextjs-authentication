import crypto from "crypto"

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error)

      resolve(hash.toString("hex").normalize())
    })
  })
}

export async function comparePasswords(
  inputPassword: string,
  hasedPassword: string,
  salt: string
) {
  const inputHashedPassword = await hashPassword(inputPassword, salt)

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hasedPassword, "hex")
  )
}

export function generateSalt() {
  return crypto.randomBytes(16).toString().normalize()
}
