import styled from "styled-components";

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Widget = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const WidgetTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  
  ${WidgetHeader} & {
    margin-bottom: 0;
  }
`;

export const FireIcon = styled.span`
  font-size: 1.25rem;
`;

// Search Widget Styles
export const SearchForm = styled.form`
  position: relative;
  display: flex;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  padding-right: 50px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s ease;
  border-radius: 6px;
  
  &:hover {
    color: #3b82f6;
    background: #f8fafc;
  }
`;

// About Widget Styles
export const AboutContent = styled.div`
  text-align: center;
`;

export const AuthorImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 16px;
  border: 3px solid #f1f5f9;
  object-fit: cover;
`;

export const AboutText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 12px;
`;

export const AuthorName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
`;

export const AuthorTitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

// Popular Articles Styles
export const ArticlesList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: article-counter;
`;

export const ArticleItem = styled.li`
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
  counter-increment: article-counter;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
  }
  
  &:hover {
    .article-title {
      color: #3b82f6;
    }
  }
`;

export const ArticleRank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  
  &::before {
    content: counter(article-counter);
  }
  
  ${ArticleItem}:first-child & {
    background: linear-gradient(135deg, #f59e0b, #f97316);
    color: white;
  }
  
  ${ArticleItem}:nth-child(2) & {
    background: linear-gradient(135deg, #94a3b8, #64748b);
    color: white;
  }
  
  ${ArticleItem}:nth-child(3) & {
    background: linear-gradient(135deg, #d97706, #b45309);
    color: white;
  }
`;

export const ArticleContent = styled.div`
  flex: 1;
`;

export const ArticleTitle = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
  text-decoration: none;
  display: block;
  margin-bottom: 6px;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3b82f6;
  }
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #94a3b8;
`;

export const ViewsCount = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const EyeIcon = styled.span`
  font-size: 0.75rem;
`;

export const ArticleDate = styled.span``;

// Categories Styles
export const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const CategoryItem = styled.li`
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8fafc;
    
    .category-name {
      color: #3b82f6;
    }
  }
`;

export const CategoryColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
`;

export const CategoryName = styled.span`
  flex: 1;
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
  transition: color 0.2s ease;
`;

export const CategoryCount = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 10px;
`;

// Newsletter Widget Styles
export const NewsletterWidget = styled.div`
  text-align: center;
`;

export const NewsletterIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

export const NewsletterTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

export const NewsletterText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 16px;
`;

export const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const NewsletterInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1e293b;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

export const NewsletterButton = styled.button`
  padding: 10px 16px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #2563eb, #1e40af);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const NewsletterNote = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
`;

// Tags Styles
export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.a`
  display: inline-block;
  padding: 6px 12px;
  background: #f1f5f9;
  color: #475569;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e2e8f0;
    color: #1e293b;
    transform: translateY(-1px);
  }
`;

// Social Links Styles
export const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const SocialIcon = styled.span`
  font-size: 1rem;
`;

export const SocialName = styled.span`
  flex: 1;
  text-align: center;
`;

// Comments Styles
export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const CommentAuthor = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

export const CommentArticle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

export const CommentText = styled.p`
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CommentTime = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

// Resources Styles
export const ResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8fafc;
    
    .resource-link {
      color: #3b82f6;
    }
  }
`;

export const ResourceIcon = styled.span`
  font-size: 1.125rem;
  width: 24px;
  text-align: center;
`;

export const ResourceLink = styled.a`
  font-size: 0.875rem;
  color: #475569;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3b82f6;
  }
`;