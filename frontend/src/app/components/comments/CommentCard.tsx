import { Avatar, Box, Card, CardContent, CardHeader } from "@mui/material";
import { CommentHeader } from "./CommentHeader";
import { useUser } from "@/app/hooks/useUser";
import { Comment } from "@/app/types/comment";
import { useEffect, useState } from "react";
import { getAvatarUser } from "@/app/services/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  const { user } = useUser(comment.userId);
  const [avatar, setAvatar] = useState<string>("/placeholder.png");

  useEffect(() => {
    const fetchImage = async () => {
      if (user?.avatarUrl && user?.avatarUrl.length > 0) {
        const image = await getAvatarUser(user?.avatarUrl);
        console.log(image);
        setAvatar(image);
      }
    };
    fetchImage();
  }, [user?.avatarUrl]);

  return (
    <Card sx={{ width: { xs: "100%", sm: "80%" }, height: "auto" }}>
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
        title={<CommentHeader user={user?.name ?? ""} createdAt={comment.createdAt} />}
      />
      <CardContent sx={{ pt: 0, fontSize: "13px" }}>{comment.text}</CardContent>
    </Card>
  );
}
