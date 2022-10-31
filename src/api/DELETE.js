import { api } from "./config";
export const deletePost = async ({ postid }) => {
  return await api.delete(`/deletepost/${postid}`, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};
