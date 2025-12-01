interface Post {
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}
interface Comment {
  id: number;
  author: string;
  text: string;
}

export const filterByLength = (posts: Post[], minLength: number) => {
  if (!minLength) return posts;
  return posts.filter((p) => p.title.length >= minLength);
};
