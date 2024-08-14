import { Avatar, Card, CardHeader } from "@mui/material";

interface SupporterCardProps {
  name: string;
  avatarUrl: string | null;
}

export function SupporterCard({ name }: SupporterCardProps) {
  return (
    <Card sx={{ width: { xs: "100%", sm: "200px" }, height: "72px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{ fontWeight: "bold" }}
      />
    </Card>
  );
}
