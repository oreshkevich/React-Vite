interface PostCardProps {
  title: string;
  body: string;
}

export const PostCard: React.FC<PostCardProps> = ({title, body}) => {
  return (
    <div style={{border: '1px solid #ccc', padding: 16, borderRadius: 8}}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};
