"use client";
import * as S from "./styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  visiblePages?: number;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  visiblePages = 5 
}: PaginationProps) {
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    // Scroll to top of posts
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(visiblePages / 2);
    
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + visiblePages - 1);
    
    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }
    
    // Add first page with ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('ellipsis-start');
    }
    
    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add last page with ellipsis if needed
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('ellipsis-end');
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <S.Container>
      <S.Nav aria-label="Pagination">
        <S.PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <S.ChevronLeft />
        </S.PageButton>
        
        <S.PageNumbers>
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              return (
                <S.Ellipsis key={`ellipsis-${index}`}>
                  ...
                </S.Ellipsis>
              );
            }
            
            return (
              <S.PageNumberButton
                key={page}
                onClick={() => handlePageChange(page as number)}
                $isActive={currentPage === page}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </S.PageNumberButton>
            );
          })}
        </S.PageNumbers>
        
        <S.PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <S.ChevronRight />
        </S.PageButton>
      </S.Nav>
      
      <S.PageInfo>
        Page <S.CurrentPage>{currentPage}</S.CurrentPage> of {totalPages}
      </S.PageInfo>
    </S.Container>
  );
}