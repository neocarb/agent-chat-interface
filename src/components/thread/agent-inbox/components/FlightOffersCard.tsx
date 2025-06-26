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
  routeCode?: string;
  stops?: string;
};

type Props = {
  offers: Offer[];
};

export const FlightOffersCard: React.FC<Props> = ({ offers }) => {
  const [offerId, setOfferId] = useState("");

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

  return (
    <div className="flex gap-3">
      {offers.map((offer) => (
        <div
          key={offer.offerId}
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-sm text-white">
                ✈️
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {offer.airlineName}
              </span>
            </div>
            <div className="text-lg font-bold text-green-700">
              {offer.currency} {offer.totalCost}
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-3 items-center gap-3 px-4 py-4 text-sm text-gray-800">
            {/* Departure */}
            <div>
              <p className="text-gray-600">{offer.origin}</p>
              <p className="text-xl font-semibold">
                {formatTime(offer.departureTime)}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(offer.departureTime)}
              </p>
            </div>

            {/* Flight path */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                {/* <hr className="w-6 border border-dashed" /> */}
                <span className="text-xl">✈️</span>
                {/* <hr className="w-6 border border-dashed" /> */}
              </div>
              <p className="mt-1 text-center text-xs text-blue-600">
                {offer.duration}
              </p>
              <p className="text-center text-[11px] text-gray-500">
                {offer.origin.split(" ")[0]} – {offer.destination.split(" ")[0]}
              </p>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <p className="text-gray-600">{offer.destination}</p>
              <p className="text-xl font-semibold">
                {formatTime(offer.arrivalTime)}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(offer.arrivalTime)}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-end border-t px-4 py-2">
            <button
              onClick={() => setOfferId(offer.offerId)}
              className="rounded-lg bg-blue-600 px-4 py-1 text-sm font-medium text-white hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
