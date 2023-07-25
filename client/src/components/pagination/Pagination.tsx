import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />
  );
};

export default Pagination;
