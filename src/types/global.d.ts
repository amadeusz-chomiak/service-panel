type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never })

type PartialOptionally<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>