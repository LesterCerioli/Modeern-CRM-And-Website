"use client";
import * as S from "./styles";
import Link from "next/link";
import { format } from "date-fns";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

interface PostsGridProps {
  posts: Post[];
}

export default function PostsGrid({ posts }: PostsGridProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  return (
    <S.Container>
      <S.Grid>
        {posts.map((post) => (
          <S.PostCard key={post.id}>
            <S.PostHeader>
              <S.CategoryTag>{post.category}</S.CategoryTag>
              <S.PostDate>
                <S.CalendarIcon /> {formatDate(post.date)}
              </S.PostDate>
            </S.PostHeader>
            
            <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
              <S.PostTitle>{post.title}</S.PostTitle>
            </Link>
            
            <S.PostExcerpt>{post.excerpt}</S.PostExcerpt>
            
            <S.PostFooter>
              <S.ReadTime>
                <S.ClockIcon /> {post.readTime}
              </S.ReadTime>
              <Link href={`/blog/${post.id}`}>
                <S.ReadMoreButton>
                  Read More
                  <S.ArrowIcon />
                </S.ReadMoreButton>
              </Link>
            </S.PostFooter>
          </S.PostCard>
        ))}
      </S.Grid>
      
      {posts.length === 0 && (
        <S.EmptyState>
          <S.EmptyStateIcon>📝</S.EmptyStateIcon>
          <S.EmptyStateTitle>No articles found</S.EmptyStateTitle>
          <S.EmptyStateText>
            Check back soon for new content or try different filters.
          </S.EmptyStateText>
        </S.EmptyState>
      )}
    </S.Container>
  );
}