function Heading() {
  const agentType = process.env.NEXT_PUBLIC_ASSISTANT_ID;

  let title = "";
  let description = "";

  if (agentType === "flight_booking_agent") {
    title = "Flight Booking Agent";
    description =
      'Book your next flight in just 4 easy steps: search available flights, choose the one that fits you best, enter your details, and complete the payment.\nSay "Hi, I want to book a flight" to get started!';
  } else if (agentType === "writing_agent") {
    title = "Writing Agent";
    description =
      'Think of this as your personal co-writer! From outlining to polishing final drafts, this writing agent supports every part of the writing process. Say "I need help writing an article" to get started.';
  } else if (agentType === "finance_advisor_agent") {
    title = "Finance Advisor";
    description =
      'Manage your money smarter — from budgeting to saving, this agent helps you plan your financial future.\nSay "Help me build a monthly budget" to get started.';
  } else if (agentType === "travel_planner_agent") {
    title = "Travel Planner";
    description =
      'Plan dream vacations or weekend getaways with ease. This agent finds destinations, creates itineraries, and suggests activities.\nSay "Plan a trip to Goa for 3 days" to begin.';
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
