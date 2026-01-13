"use client";
import * as S from "./styles";
import Link from "next/link";

interface FeaturedPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

interface FeaturedPostsProps {
  posts: FeaturedPost[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Featured Articles</S.Title>
        <S.Subtitle>Handpicked content for your learning journey</S.Subtitle>
      </S.Header>
      
      <S.Grid>
        {posts.map((post) => (
          <S.PostCard key={post.id}>
            <S.ImageWrapper>
              <S.PostImage src={post.image} alt={post.title} />
              <S.CategoryBadge>{post.category}</S.CategoryBadge>
            </S.ImageWrapper>
            
            <S.Content>
              <S.PostDate>{post.date} • {post.readTime}</S.PostDate>
              <S.PostTitle>{post.title}</S.PostTitle>
              <S.PostExcerpt>{post.excerpt}</S.PostExcerpt>
              <Link href={`/blog/${post.id}`}>
                <S.ReadMore>Read Article →</S.ReadMore>
              </Link>
            </S.Content>
          </S.PostCard>
        ))}
      </S.Grid>
    </S.Container>
  );
}