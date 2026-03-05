import EventCheckoutContent from "@/components/modules/Event/EventCheckoutContent";
import { getEventDetailsById } from "@/services/event/event.service";

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ quantity?: string }>;
}

export default async function EventCheckoutPage({
  params,
  searchParams,
}: CheckoutPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const quantity = Number(query?.quantity || 1);

  const result = await getEventDetailsById(id);

  return <EventCheckoutContent event={result.data} quantity={quantity} />;
}
