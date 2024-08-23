import { CommentReport } from "@prisma/client";

export type CreateCommentReportDto = Pick<CommentReport, "commentId">;

export type CommentReportDto = CommentReport;
