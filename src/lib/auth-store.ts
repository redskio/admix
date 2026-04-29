import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  company: string
  credits: number
  plan: string
  role: "advertiser" | "publisher"
}

interface AuthStore {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string, role?: "advertiser" | "publisher") => boolean
  signup: (name: string, email: string, password: string, company: string, role: "advertiser" | "publisher") => void
  logout: () => void
  addCredits: (amount: number) => void
}

const DEMO_USERS: User[] = [
  {
    id: "demo_001",
    name: "김재우",
    email: "jaewoo@weirdsector.co.kr",
    company: "WeirdSector",
    credits: 450000,
    plan: "growth",
    role: "advertiser",
  },
]

const DEMO_PASSWORD = "test1234"

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: (email: string, password: string, role?: "advertiser" | "publisher") => {
        // Check hardcoded demo users first
        const existingUser = DEMO_USERS.find((u) => u.email === email)
        if (existingUser && password === DEMO_PASSWORD) {
          set({ user: existingUser, isLoggedIn: true })
          return true
        }

        // Demo mode: any email + "test1234" works
        if (password === DEMO_PASSWORD) {
          const demoUser: User = {
            id: `demo_${Date.now()}`,
            name: email.split("@")[0],
            email,
            company: "Demo Company",
            credits: 50000,
            plan: "starter",
            role: role ?? "advertiser",
          }
          set({ user: demoUser, isLoggedIn: true })
          return true
        }

        return false
      },

      signup: (name: string, email: string, password: string, company: string, role: "advertiser" | "publisher") => {
        const newUser: User = {
          id: `user_${Date.now()}`,
          name,
          email,
          company,
          credits: 50000,
          plan: "starter",
          role,
        }
        set({ user: newUser, isLoggedIn: true })
      },

      logout: () => {
        set({ user: null, isLoggedIn: false })
      },

      addCredits: (amount: number) => {
        const { user } = get()
        if (!user) return
        set({ user: { ...user, credits: user.credits + amount } })
      },
    }),
    {
      name: "admix-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuthStore
export type { User, AuthStore }
