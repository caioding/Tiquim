"use client";
import React from "react";
import { CommentCard } from "./CommentCard";
import { Container } from "@mui/material";
import { CreateComment } from "./CreateComment";
import { useComments } from "@/app/hooks/useComments";
import { sortByDateDesc } from "@/app/utils/sort";

interface TabPanelProps {
  idCampaign: string;
  index: number;
  value: number;
}

export function CommentsTabPanel({ idCampaign, value, index }: TabPanelProps) {
  const { comments } = useComments(idCampaign);

  const sortedComments = sortByDateDesc(comments ?? []);

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
          <CreateComment idCampaign={idCampaign} />
          {sortedComments?.map((comment) => <CommentCard comment={comment} />)}
        </Container>
      )}
    </div>
  );
}
