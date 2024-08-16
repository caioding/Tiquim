"use client";
import React from "react";
import { CommentCard } from "./CommentCard";
import { Container, Typography } from "@mui/material";
import { CreateComment } from "./CreateComment";
import { useComments } from "@/app/hooks/useComments";
import { sortByDateDesc } from "@/app/utils/sort";
import { useCampaignSupporters } from "@/app/hooks/useCampaignSupporters";
import useAuthContext from "@/app/hooks/useAuthContext";

interface TabPanelProps {
  idCampaign: string;
  index: number;
  value: number;
}

export function CommentsTabPanel({ idCampaign, value, index }: TabPanelProps) {
  const { comments } = useComments(idCampaign);

  const sortedComments = sortByDateDesc(comments ?? []);

  const { supporters } = useCampaignSupporters(idCampaign);

  const { id } = useAuthContext();

  const isSupporter = supporters?.supporters.some((supporter) => supporter.id === id);

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <Container
          component="main"
          sx={{
            width: "100%",
            height: "auto",
            minHeight: "487px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            p: 3,
          }}
        >
          {isSupporter ? (
            <CreateComment idCampaign={idCampaign} />
          ) : (
            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
              Doe qualquer quantia para poder comentar!
            </Typography>
          )}
          {sortedComments?.map((comment) => <CommentCard comment={comment} />)}
        </Container>
      )}
    </div>
  );
}
