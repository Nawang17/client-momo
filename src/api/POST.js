import { api } from "./config";

export const AddNewPost = async (text, imageblob) => {
  return await api.post(
    "/newpost",
    {
      text: text,
      imageblob: imageblob,
    },

    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
};
