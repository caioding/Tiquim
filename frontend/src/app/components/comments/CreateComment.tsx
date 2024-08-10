import useAuthContext from "@/app/hooks/useAuthContext";
import useSnackbar from "@/app/hooks/useSnackbar";
import { useUser } from "@/app/hooks/useUser";
import { createComment } from "@/app/services/comment";
import { CreateCommentDTO } from "@/app/types/comment";
import { Avatar, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface CreateCommentProps {
  idCampaign: string;
}

export function CreateComment({ idCampaign }: CreateCommentProps) {
  const initialState = {
    campaignId: idCampaign,
    text: "",
  };

  const [comment, setComment] = useState<CreateCommentDTO>(initialState);
  const { id } = useAuthContext();
  const { user } = useUser(id);
  const { setSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const handleFormSubmit = async () => {
    if (id === "") {
      setSnackbar("Você precisa estar logado para comentar", "error");
    } else {
      try {
        const response = await createComment(comment);

        setSnackbar("Comentário criado com sucesso!");
        setComment(initialState);
        queryClient.invalidateQueries({ queryKey: ["comments", idCampaign] });
      } catch (error) {
        setSnackbar("Erro na criação do comentário", "error");
      }
    }
  };

  return (
    <Card sx={{ width: { xs: "100%", sm: "80%" }, height: "auto" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {user?.name?.charAt(0).toUpperCase() ?? "D"}
          </Avatar>
        }
        title={user?.name ?? "Desconhecido"}
        titleTypographyProps={{ fontWeight: "bold" }}
      />
      <CardContent
        component="form"
        onSubmit={() => {}}
        sx={{
          py: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <TextField
          required
          fullWidth
          id="comment"
          autoComplete="comment"
          autoFocus
          variant="outlined"
          multiline
          sx={{
            backgroundColor: "transparent",
            m: 0,
            "& .MuiOutlinedInput-root": {
              pt: 0,
              "& fieldset": {
                border: "none",
              },
            },
          }}
          inputProps={{
            maxLength: 200,
            disableUnderline: true,
            style: { fontSize: "13px" },
          }}
          placeholder="Clique aqui para escrever seu comentário..."
          value={comment.text}
          onChange={(e) => setComment({ ...comment, text: e.target.value })}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#32a852",
            color: "white",
            "&:hover": { backgroundColor: "#008000" },
            mt: 3,
          }}
          onClick={handleFormSubmit}
        >
          Comentar
        </Button>
      </CardContent>
    </Card>
  );
}
