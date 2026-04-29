import { mockCampaigns } from "@/lib/mock-data"
import CampaignDetailClient from "./CampaignDetailClient"

export function generateStaticParams() {
  return mockCampaigns.map((c) => ({ id: c.id }))
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  return <CampaignDetailClient id={params.id} />
}
