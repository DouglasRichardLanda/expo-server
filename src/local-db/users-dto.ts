
interface HUMAN_ENTITY_INTERFACE {
  id: string,
  firstname: string,
  secondname: string,
  fathername: string,
  email: string,
  password: string,
  birthday: string,
  subscription: string,
  model: "PREMIUM" | "STANDARD",
  language: "ru" | "en" | "de",
  notes: {
    date: string,
    content: string,
    matches: boolean
  }[],
  luckynumber: number,
  birthdaynumber: number,
  namenumber: number,
  fathernumber: number
}

const HUMAN_ENTITY1: HUMAN_ENTITY_INTERFACE = Object.freeze({
  id: "1",
  firstname: "Антон",
  secondname: "Кравчук",
  fathername: "Вадим",
  email: "custom@gmail.com",
  password: "hashed password",
  birthday: "1985-11-11",
  subscription: "2025-01-06",
  model: "PREMIUM",
  language: "ru",
  notes: [],
  luckynumber: 3,
  birthdaynumber: 9,
  namenumber: 3,
  fathernumber: 0
})

export type {HUMAN_ENTITY_INTERFACE}
export {HUMAN_ENTITY1}