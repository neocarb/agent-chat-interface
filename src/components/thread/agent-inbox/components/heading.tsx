import { Plane, Pencil, CircleDollarSign, MapPin } from "lucide-react";
import type { StaticImageData } from "next/image";
import FlightBG from "../../../../assets/a13.jpg";
import WritingBG from "../../../../assets/writing.jpg";
import FinanceBG from "../../../../assets/finance.jpg";
import TravelBG from "../../../../assets/travel1.jpg";

// Heading
export let headHeading: string = "";
// prompts
export let promptButtons: { label: string; prompt: string }[] = [];
// icons
export const agentIconMap: Record<string, React.ElementType> = {
  flight_booking_agent: Plane,
  writing_agent: Pencil,
  finance_advisor_agent: CircleDollarSign,
  travel_planner_agent: MapPin,
};
// backgrounds
export const agentBackgroundMap: Record<string, StaticImageData> = {
  flight_booking_agent: FlightBG,
  writing_agent: WritingBG,
  finance_advisor_agent: FinanceBG,
  travel_planner_agent: TravelBG,
};

function Heading() {
  const agentType = process.env.NEXT_PUBLIC_ASSISTANT_ID;

  let title = "";
  let description = "";

  if (agentType === "flight_booking_agent") {
    title = "Flight Booking Agent";
    description =
      "Welcome aboard, traveler! Your next adventure begins here. Ready to book that perfect flight and explore the world your way?";
    headHeading = "Flight Booking Agent";
    promptButtons = [
      {
        label: "Ready to Fly? Book Now!",
        prompt: "Hi, I want to book a flight",
      },
      {
        label: "Show list of flights from a departure date to a return date.",
        prompt: "Show list of flights from a departure date to return date.",
      },
      {
        label: "Show flights that fit within my budget.",
        prompt: "Show flights that fit within my budget.",
      },
    ];
  } else if (agentType === "writing_agent") {
    title = "Writing Agent";
    description =
      'Think of this as your personal co-writer! From outlining to polishing final drafts, this writing agent supports every part of the writing process. Say "I need help writing an article" to get started.';
    headHeading = "Writing Assistant Agent";
    promptButtons = [
      {
        label: "Start an article",
        prompt: "Help me start an article about climate change.",
      },
      {
        label: "Improve my writing",
        prompt: "Can you polish this paragraph?",
      },
    ];
  } else if (agentType === "finance_advisor_agent") {
    title = "Finance Advisor";
    description =
      'Manage your money smarter — from budgeting to saving, this agent helps you plan your financial future.\nSay "Help me build a monthly budget" to get started.';
    promptButtons = [
      {
        label: "Start my finance journey",
        prompt: "Help me start my finance journey",
      },
      {
        label: "Improve my fiance",
        prompt: "Can you help improve my finance.",
      },
    ];
    headHeading = "Finance Advisor Agent";
  } else if (agentType === "travel_planner_agent") {
    title = "Travel Planner";
    description =
      'Plan dream vacations or weekend getaways with ease. This agent finds destinations, creates itineraries, and suggests activities.\nSay "Plan a trip to Goa for 3 days" to begin.';
    headHeading = "Travel Planner Agent";
    promptButtons = [
      {
        label: "Plan a trip to",
        prompt: "Help me plan a trip to",
      },
      {
        label: "Find hotels to stay on this trip",
        prompt: "Find hotels to stay on this trip destination",
      },
    ];
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text max-w-lg text-center whitespace-pre-line text-gray-900">
        {description}
      </p>
    </div>
  );
}

export default Heading;
