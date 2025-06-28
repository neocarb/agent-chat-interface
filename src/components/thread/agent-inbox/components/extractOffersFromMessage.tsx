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

type ToolMessage = {
  name: string;
  type: string;
  content: string;
};

type Props = {
  offer: Array<{ name: string; type: string; content: string }>;
  onOfferSelect: (id: string) => void;
};

// Helper to detect valid offer data
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
  offer,
  onOfferSelect,
}) => {
  return (
    <div className="space-y-4">
      <p className="bg-muted mb-5 rounded-md p-3">
        Below are the available flight offers based on your search.
      </p>
      {offer.map((item, index) => {
        if (item.name === "search_offers" && item.type === "tool") {
          try {
            const parsed = JSON.parse(item.content);
            const offers = parsed?.offers;

            if (isFlightOfferArray(offers)) {
              // Render only the card — and return early
              return (
                <FlightOffersCard
                  key={`card-${index}`}
                  offers={offers}
                  onSelectOffer={onOfferSelect}
                />
              );
            } else {
              // Only render JSON if not valid offers
              return (
                <MarkdownText key={`markdown-${index}`}>
                  {JSON.stringify(parsed, null, 2)}
                </MarkdownText>
              );
            }
          } catch (err) {
            console.error("Invalid JSON in tool message:", err);
            return (
              <MarkdownText key={`error-${index}`}>
                {JSON.stringify(item.content, null, 2)}
              </MarkdownText>
            );
          }
        }

        // Add this to handle items that are NOT `search_offers`
        return null;
      })}
    </div>
  );
};
