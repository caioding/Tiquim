import { Avatar, Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { PostHeader } from "./PostHeader";
import { Post } from "@/app/types/post";
import { removePost } from "@/app/services/post";

interface PostCardProps {
  post: Post;
  isOwner: boolean;
}

export function PostCard({ post, isOwner }: PostCardProps) {
  const handleRemoveBtn = () => {
    const check = window.confirm("Você tem certeza que deseja excluir a postagem?");
    if (check) {
      removePost(post.id);
      window.location.reload();
    }
  };

  return (
    <Card sx={{ width: { xs: "100%", sm: "80%" }, margin: "16px auto", boxShadow: 3 }}>
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {post.title}
          </Typography>
        }
        subheader={<PostHeader user={""} createdAt={post.createdAt} />}
      />
      <CardContent
        sx={{
          pt: 0,
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Typography variant="body1" color="text.primary">
          {post.description}
        </Typography>
        {isOwner ? (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#BB0000",
              color: "white",
              "&:hover": { backgroundColor: "#DD0000" },
              mt: 3,
            }}
            onClick={handleRemoveBtn}
          >
            Excluir
          </Button>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}
