import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type AdminStatCardProps = {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "secondary" | "accent";
};

export function AdminStatCard({
  label,
  value,
  hint,
  tone = "default",
}: AdminStatCardProps) {
  return (
    <Card className="bg-white/6">
      <CardContent className="space-y-3 p-6">
        <Badge variant={tone}>{label}</Badge>
        <p className="font-display text-3xl font-semibold text-white">
          {value}
        </p>
        <p className="text-sm leading-6 text-slate-400">{hint}</p>
      </CardContent>
    </Card>
  );
}
