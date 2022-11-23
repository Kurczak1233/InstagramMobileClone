export type DbPost = {
  id: number;
  image_url: string | null;
  description: string | null;
  created_at: string | null;
  creator_uuid: string;
  archived_at: string | null;
};
