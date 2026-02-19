import { Badge } from "@/components/ui/badge";

interface RiskBadgeProps {
  level: "Safe" | "Adjust Dosage" | "Toxic or Ineffective";
}

export function RiskBadge({ level }: RiskBadgeProps) {
  let className = "";

  switch (level) {
    case "Safe":
      className =
        "bg-green-500 hover:bg-green-600 text-white border-transparent";
      break;
    case "Adjust Dosage":
      className =
        "bg-yellow-500 hover:bg-yellow-600 text-white border-transparent";
      break;
    case "Toxic or Ineffective":
      className = "bg-red-500 hover:bg-red-600 text-white border-transparent";
      break;
    default:
      className = "bg-gray-500 hover:bg-gray-600 text-white";
  }

  return <Badge className={className}>{level}</Badge>;
}
