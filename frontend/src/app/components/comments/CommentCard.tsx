import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import { CommentHeader } from "./CommentHeader";
import { useUser } from "@/app/hooks/useUser";
import { Comment } from "@/app/types/comment";

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  const { user } = useUser(comment.userId);

  return (
    <Card sx={{ width: { xs: "100%", sm: "80%" }, height: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {user?.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={<CommentHeader user={user?.name ?? ""} createdAt={comment.createdAt} />}
      />
      <CardContent sx={{ pt: 0, fontSize: "13px" }}>{comment.text}</CardContent>
    </Card>
  );
}
