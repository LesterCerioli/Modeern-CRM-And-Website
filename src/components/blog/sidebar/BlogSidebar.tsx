"use client";
import * as S from "./styles";
import Link from "next/link";

export default function BlogSidebar() {
  // Popular articles
  const popularArticles = [
    {
      id: 1,
      title: "React Hooks: Complete Guide for Beginners",
      views: "15.2K",
      date: "Jan 10, 2024"
    },
    {
      id: 2,
      title: "TypeScript vs JavaScript: When to Use Each",
      views: "12.8K",
      date: "Dec 28, 2023"
    },
    {
      id: 3,
      title: "Next.js 14 Server Actions Deep Dive",
      views: "10.5K",
      date: "Jan 5, 2024"
    },
    {
      id: 4,
      title: "CSS Grid Layout: Modern Web Design",
      views: "9.3K",
      date: "Dec 20, 2023"
    },
    {
      id: 5,
      title: "Web Performance Optimization Techniques",
      views: "8.7K",
      date: "Jan 2, 2024"
    }
  ];

  // Categories with post counts
  const categories = [
    { name: "JavaScript", count: 42, color: "#F7DF1E" },
    { name: "React", count: 38, color: "#61DAFB" },
    { name: "Next.js", count: 25, color: "#000000" },
    { name: "TypeScript", count: 22, color: "#3178C6" },
    { name: "CSS", count: 18, color: "#1572B6" },
    { name: "Performance", count: 15, color: "#F44D21" },
    { name: "Accessibility", count: 12, color: "#005A9C" },
    { name: "Tools", count: 10, color: "#339933" }
  ];

  // Tags
  const tags = [
    "Web Development", "Frontend", "Tutorial", "Best Practices",
    "Code Quality", "React Hooks", "SSR", "SEO", "Responsive Design",
    "Animation", "State Management", "API", "Debugging", "Testing"
  ];

  // Social links
  const socialLinks = [
    { name: "Twitter", icon: "𝕏", url: "#", color: "#000000" },
    { name: "GitHub", icon: "🐙", url: "#", color: "#333333" },
    { name: "LinkedIn", icon: "💼", url: "#", color: "#0077B5" },
    { name: "YouTube", icon: "▶️", url: "#", color: "#FF0000" },
    { name: "Discord", icon: "💬", url: "#", color: "#5865F2" }
  ];

  return (
    <S.Container>
      {/* Search Widget */}
      <S.Widget>
        <S.WidgetTitle>Search Blog</S.WidgetTitle>
        <S.SearchForm>
          <S.SearchInput 
            type="search" 
            placeholder="Type keywords..." 
            aria-label="Search blog posts"
          />
          <S.SearchButton type="submit" aria-label="Search">
            🔍
          </S.SearchButton>
        </S.SearchForm>
      </S.Widget>

      {/* About Widget */}
      <S.Widget>
        <S.WidgetTitle>About This Blog</S.WidgetTitle>
        <S.AboutContent>
          <S.AuthorImage src="/api/placeholder/80/80" alt="Author" />
          <S.AboutText>
            Welcome to the LTS development blog! We share expert insights, 
            tutorials, and best practices on modern web development.
          </S.AboutText>
          <S.AuthorName>John Doe</S.AuthorName>
          <S.AuthorTitle>Senior Frontend Developer</S.AuthorTitle>
        </S.AboutContent>
      </S.Widget>

      {/* Popular Articles Widget */}
      <S.Widget>
        <S.WidgetHeader>
          <S.WidgetTitle>Popular Articles</S.WidgetTitle>
          <S.FireIcon>🔥</S.FireIcon>
        </S.WidgetHeader>
        <S.ArticlesList>
          {popularArticles.map((article, index) => (
            <S.ArticleItem key={article.id}>
              <S.ArticleRank>{index + 1}</S.ArticleRank>
              <S.ArticleContent>
                <Link href={`/blog/${article.id}`}>
                  <S.ArticleTitle>{article.title}</S.ArticleTitle>
                </Link>
                <S.ArticleMeta>
                  <S.ViewsCount>
                    <S.EyeIcon>👁️</S.EyeIcon> {article.views} views
                  </S.ViewsCount>
                  <S.ArticleDate>{article.date}</S.ArticleDate>
                </S.ArticleMeta>
              </S.ArticleContent>
            </S.ArticleItem>
          ))}
        </S.ArticlesList>
      </S.Widget>

      {/* Categories Widget */}
      <S.Widget>
        <S.WidgetTitle>Categories</S.WidgetTitle>
        <S.CategoriesList>
          {categories.map((category) => (
            <S.CategoryItem key={category.name}>
              <S.CategoryLink href={`/blog/category/${category.name.toLowerCase()}`}>
                <S.CategoryColor style={{ backgroundColor: category.color }} />
                <S.CategoryName>{category.name}</S.CategoryName>
                <S.CategoryCount>({category.count})</S.CategoryCount>
              </S.CategoryLink>
            </S.CategoryItem>
          ))}
        </S.CategoriesList>
      </S.Widget>

      {/* Newsletter Widget */}
      <S.Widget>
        <S.NewsletterWidget>
          <S.NewsletterIcon>✉️</S.NewsletterIcon>
          <S.NewsletterTitle>Stay Updated</S.NewsletterTitle>
          <S.NewsletterText>
            Get the latest articles and tutorials directly in your inbox.
          </S.NewsletterText>
          <S.NewsletterForm>
            <S.NewsletterInput 
              type="email" 
              placeholder="Your email address" 
              aria-label="Email for newsletter"
            />
            <S.NewsletterButton type="submit">
              Subscribe
            </S.NewsletterButton>
          </S.NewsletterForm>
          <S.NewsletterNote>
            No spam. Unsubscribe at any time.
          </S.NewsletterNote>
        </S.NewsletterWidget>
      </S.Widget>

      {/* Tags Widget */}
      <S.Widget>
        <S.WidgetTitle>Popular Tags</S.WidgetTitle>
        <S.TagsContainer>
          {tags.map((tag) => (
            <S.Tag key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
              #{tag}
            </S.Tag>
          ))}
        </S.TagsContainer>
      </S.Widget>

      {/* Social Links Widget */}
      <S.Widget>
        <S.WidgetTitle>Follow Us</S.WidgetTitle>
        <S.SocialLinks>
          {socialLinks.map((social) => (
            <S.SocialLink 
              key={social.name}
              href={social.url}
              aria-label={`Follow us on ${social.name}`}
              style={{ backgroundColor: social.color }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.SocialIcon>{social.icon}</S.SocialIcon>
              <S.SocialName>{social.name}</S.SocialName>
            </S.SocialLink>
          ))}
        </S.SocialLinks>
      </S.Widget>

      {/* Recent Comments Widget */}
      <S.Widget>
        <S.WidgetTitle>Recent Comments</S.WidgetTitle>
        <S.CommentsList>
          <S.CommentItem>
            <S.CommentAuthor>Alex Johnson</S.CommentAuthor>
            <S.CommentText>"Great article! The performance tips really helped optimize our app."</S.CommentText>
            <S.CommentTime>2 hours ago</S.CommentTime>
          </S.CommentItem>
          <S.CommentItem>
            <S.CommentAuthor>Maria Garcia</S.CommentAuthor>
            <S.CommentText>"Finally understand React Server Components, thanks for the clear explanation!"</S.CommentText>
            <S.CommentTime>1 day ago</S.CommentTime>
          </S.CommentItem>
        </S.CommentsList>
      </S.Widget>

      {/* Resources Widget */}
      <S.Widget>
        <S.WidgetTitle>Helpful Resources</S.WidgetTitle>
        <S.ResourcesList>
          <S.ResourceItem>
            <S.ResourceIcon>📚</S.ResourceIcon>
            <S.ResourceLink href="#">Free E-books</S.ResourceLink>
          </S.ResourceItem>
          <S.ResourceItem>
            <S.ResourceIcon>🎬</S.ResourceIcon>
            <S.ResourceLink href="#">Video Tutorials</S.ResourceLink>
          </S.ResourceItem>
          <S.ResourceItem>
            <S.ResourceIcon>🛠️</S.ResourceIcon>
            <S.ResourceLink href="#">Development Tools</S.ResourceLink>
          </S.ResourceItem>
          <S.ResourceItem>
            <S.ResourceIcon>📖</S.ResourceIcon>
            <S.ResourceLink href="#">Documentation</S.ResourceLink>
          </S.ResourceItem>
        </S.ResourcesList>
      </S.Widget>
    </S.Container>
  );
}