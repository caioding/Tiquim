import api from "./api";
import { Comment } from "../types/comment";

export function createReportComment(commentId: string): Promise<Comment> {
  return api.post("/reportComment", { commentId }).then((response) => response.data);
}
