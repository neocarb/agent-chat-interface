import React, { useState } from "react";

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

type OfferWithLabel = Offer & { tierLabel?: string };

type Props = {
  offers: Offer[];
  onSelectOffer: (id: string) => void;
};

export const FlightOffersCard: React.FC<Props> = ({
  offers,
  onSelectOffer,
}) => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {},
  );

  const formatTime = (time: string) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (time: string) =>
    new Date(time).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const groupOffers = () => {
    const groups: Record<string, Offer[]> = {};
    for (const offer of offers) {
      const key = `${offer.airlineName}-${offer.departureTime}-${offer.arrivalTime}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(offer);
    }
    return Object.values(groups);
  };

  const labelAndOrderOffersByTier = (offers: Offer[]): OfferWithLabel[] => {
    const tierOrder = [
      "Economy Value",
      "Economy Classic",
      "Economy Flex",
      "Premium Economy",
      "Business",
    ];

    const economy = offers.filter(
      (o) => o.cabinClass.toLowerCase() === "economy"
    );

    const sortedEconomy: OfferWithLabel[] = economy
      .sort((a, b) => parseFloat(a.totalCost) - parseFloat(b.totalCost))
      .map((offer, i) => ({
        ...offer,
        tierLabel:
          ["Economy Value", "Economy Classic", "Economy Flex"][i] || "Economy",
      }));

    const labeledOffers: OfferWithLabel[] = offers.map((offer) => {
      const lowerCabin = offer.cabinClass.toLowerCase();
      if (lowerCabin === "economy") {
        const match = sortedEconomy.find((o) => o.offerId === offer.offerId);
        return { ...offer, tierLabel: match?.tierLabel };
      } else if (lowerCabin === "premium_economy") {
        return { ...offer, tierLabel: "Premium Economy" };
      } else if (lowerCabin === "business") {
        return { ...offer, tierLabel: "Business" };
      } else {
        return { ...offer, tierLabel: offer.cabinClass };
      }
    });

    return labeledOffers.sort((a, b) => {
      const indexA = tierOrder.indexOf(a.tierLabel || "");
      const indexB = tierOrder.indexOf(b.tierLabel || "");
      return indexA - indexB;
    });
  };

  const groupedOffers = groupOffers();

  return (
    <div className="flex flex-wrap gap-3">
      {groupedOffers.map((flightOffers, index) => {
        const base = flightOffers[0];
        const isExpanded = expandedCards[index] ?? false;
        const visibleOffers: OfferWithLabel[] = labelAndOrderOffersByTier(
          isExpanded ? flightOffers : [flightOffers[0]],
        );

        return (
          <div
            key={index}
            className="relative basis-[calc(50%-0.375rem)] overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-sm text-white">
                  ✈️
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {base.airlineName}
                </span>
              </div>
              <div className="text-xs font-semibold text-gray-500">
                {formatDate(base.departureTime)}
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-3 items-center gap-3 px-4 py-4 text-sm text-gray-800">
              {/* Departure */}
              <div>
                <p className="text-gray-600">{base.origin}</p>
                <p className="text-xl font-semibold">
                  {formatTime(base.departureTime)}
                </p>
              </div>

              {/* Flight path */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-xl">✈️</span>
                <p className="mt-1 text-center text-xs text-blue-600">
                  {base.duration}
                </p>
              </div>

              {/* Arrival */}
              <div className="text-right">
                <p className="text-gray-600">{base.destination}</p>
                <p className="text-xl font-semibold">
                  {formatTime(base.arrivalTime)}
                </p>
              </div>
            </div>

            {/* Cabin Class Options */}
            <div className="space-y-1 border-t px-4 py-2">
              {visibleOffers.map((offer) => (
                <div
                  key={offer.offerId}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="capitalize">
                    {offer.tierLabel ||
                      offer.cabinClass.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-green-700">
                      {offer.currency} {offer.totalCost}
                    </span>
                    <button
                      onClick={() => onSelectOffer(offer.offerId)}
                      className="rounded-md bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle Button */}
            {flightOffers.length > 1 && (
              <div className="px-4 pb-3">
                <button
                  onClick={() =>
                    setExpandedCards((prev) => ({
                      ...prev,
                      [index]: !isExpanded,
                    }))
                  }
                  className="text-xs text-blue-600 hover:underline"
                >
                  {isExpanded ? "Show less ▲" : "Show more options ▼"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
