package com.EBook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EBook.entity.Books;

public interface BooksRepository extends JpaRepository<Books, Long>{

}
