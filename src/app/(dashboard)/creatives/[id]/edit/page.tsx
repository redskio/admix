import { mockCreatives } from "@/lib/mock-data"
import CreativeEditClient from "./CreativeEditClient"

export function generateStaticParams() {
  return mockCreatives.map((c) => ({ id: c.id }))
}

export default function CreativeEditPage({ params }: { params: { id: string } }) {
  return <CreativeEditClient id={params.id} />
}
