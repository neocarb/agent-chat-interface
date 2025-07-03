import React from "react";
import { FlightOffersCard } from "./FlightOffersCard";
import { MarkdownText } from "../../markdown-text";

type Offer = {
  offerId: string;
  totalCost: string;
  currency: string;
  origin: string;
  destination: string;
  airlineName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cabinClass: string;
};

type Message = {
  id?: string;
  content: string | object;
};

type Props = {
  messages: Message[];
  onOfferSelect: (id: string) => void;
};

function isFlightOfferArray(value: any): value is Offer[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "object" &&
    value[0] !== null &&
    "offerId" in value[0] &&
    "departureTime" in value[0] &&
    "arrivalTime" in value[0]
  );
}

export const ExtractOfferFromMessages: React.FC<Props> = ({
  messages,
  onOfferSelect,
}) => {
  const matchedMessage = messages.find((msg) =>
    msg.id?.includes("search-offers-run"),
  );

  if (!matchedMessage) return null;

  try {
    const raw =
      typeof matchedMessage.content === "string"
        ? matchedMessage.content
        : JSON.stringify(matchedMessage.content);

    // First try to extract the content inside ```json ... ```
    const jsonMatch = raw.match(/```json\s*([\s\S]*?)```/);

    const cleaned = jsonMatch ? jsonMatch[1].trim() : raw.trim();

    const parsed = JSON.parse(cleaned);
    const offers = parsed?.offers;

    if (isFlightOfferArray(offers)) {
      return (
        <div className="space-y-4">
          <p className="bg-muted mb-5 rounded-md p-3">
            Below are the available flight offers based on your search.
          </p>
          <FlightOffersCard
            offers={offers}
            onSelectOffer={onOfferSelect}
          />
        </div>
      );
    } else {
      return <MarkdownText>{JSON.stringify(parsed, null, 2)}</MarkdownText>;
    }
  } catch (err) {
    console.error("Invalid JSON in matched message:", err);
    return (
      <MarkdownText>
        {typeof matchedMessage.content === "string"
          ? matchedMessage.content
          : JSON.stringify(matchedMessage.content, null, 2)}
      </MarkdownText>
    );
  }
};
