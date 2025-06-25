import { Plane } from "lucide-react";
import type { StaticImageData } from "next/image";

// Heading
export let headHeading: string = "";

// Prompts
export let promptButtons: { label: string; prompt: string }[] = [];

// Icon map
export const agentIconMap: Record<string, React.ElementType> = {
  flight_booking_agent: Plane,
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
  } else {
    // Fallback for unknown agents
    title = "Generic Assistant Agent";
    description =
      "Hello! I'm your AI assistant, here to help with a wide range of tasks. Just type your request and I'll assist you right away!";
    headHeading = "Generic Assistant Agent";
    promptButtons = [
      {
        label: "What can you do?",
        prompt: "What can you help me with?",
      },
      {
        label: "Assist me with something",
        prompt: "I need help with a task.",
      },
    ];
  }

  return (
    <div className="flex flex-col items-center gap-2 my-5">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text max-w-lg text-center whitespace-pre-line text-gray-900">
        {description}
      </p>
    </div>
  );
}

export default Heading;
