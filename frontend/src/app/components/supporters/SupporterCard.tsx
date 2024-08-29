import { getAvatarUser } from "@/app/services/user";
import { getUserName } from "@/app/utils/name";
import { Avatar, Box, Card, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";

interface SupporterCardProps {
  name: string;
  avatarUrl: string;
  userId: string;
}

export function SupporterCard({ name, avatarUrl, userId }: SupporterCardProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.png");
  const router = useRouter();
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

  const handleAvatarClick = () => {
    router.push(`/profile/${userId}`);
  };
  return (
    <Card sx={{ width: { xs: "100%", sm: "200px" }, height: "72px", cursor: "pointer",}}>
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
        onClick={handleAvatarClick}
      />
    </Card>
  );
}
