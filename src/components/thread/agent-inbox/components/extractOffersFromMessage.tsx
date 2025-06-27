import React from "react";
import { FlightOffersCard } from "./FlightOffersCard";

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

type Props = {
  offer: any[];
  onOfferSelect: (id: string) => void;
};

export const ExtractOfferFromMessages: React.FC<Props> = ({
  offer,
  onOfferSelect,
}) => {
  const requiredOfferMessages = offer.filter(
    (item) => item.name === "search_offers" && item.type === "tool",
  );

  const extractedOffers: Offer[] = requiredOfferMessages.flatMap((item) => {
    try {
      const parsed = JSON.parse(item.content);
      return parsed.offers || [];
    } catch (err) {
      console.error("Failed to parse content:", err);
      return [];
    }
  });

  return (
    <div>
      {extractedOffers.length > 0 ? (
        <FlightOffersCard
          offers={
            extractedOffers
            // .slice(0, 10)
          }
          onSelectOffer={onOfferSelect}
        />
      ) : null}
    </div>
  );
};
