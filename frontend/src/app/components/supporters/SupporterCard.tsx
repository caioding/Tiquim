import { getAvatarUser } from "@/app/services/user";
import { getUserName } from "@/app/utils/name";
import { Avatar, Box, Card, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface SupporterCardProps {
  name: string;
  avatarUrl: string;
}

export function SupporterCard({ name, avatarUrl }: SupporterCardProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.png");

  useEffect(() => {
    const fetchImage = async () => {
      if (avatarUrl && avatarUrl.length > 0) {
        const image = await getAvatarUser(avatarUrl);
        console.log(image);
        setAvatar(image);
      }
    };
    fetchImage();
  }, [avatarUrl]);

  return (
    <Card sx={{ width: { xs: "100%", sm: "200px" }, height: "72px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
            {avatar ? (
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                }}
                src={avatar}
              />
            ) : (
              <AccountCircleIcon sx={{ height: "auto", width: "auto" }} />
            )}
          </Avatar>
        }
        title={getUserName(name)}
        titleTypographyProps={{ fontWeight: "bold" }}
      />
    </Card>
  );
}
