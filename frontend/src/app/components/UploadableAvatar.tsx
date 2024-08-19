import React, { useState } from "react";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import User from "../types/user";
import InputFileUpload from "./FileUpload";

interface UploadableAvatarProps {
  avatarUrl: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function UploadableAvatar({ avatarUrl, onFileChange }: UploadableAvatarProps) {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: 150,
        height: 150,
        mx: "auto",
        mb: 2,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Avatar
        alt="User Avatar"
        src={avatarUrl}
        sx={{ width: "100%", height: "100%", mx: "auto", mb: 2 }}
      />
      {hover && (
        <>
          <Tooltip title="Upload Avatar">
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                "& .MuiIconButton-label": {
                  flexDirection: "column",
                },
              }}
              aria-label="upload picture"
              component="label"
            >
              <CloudUploadIcon fontSize="large" />
              <input type="file" accept="image/*" hidden onChange={onFileChange} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
}
