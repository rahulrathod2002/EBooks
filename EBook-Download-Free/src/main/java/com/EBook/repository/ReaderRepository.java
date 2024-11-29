package com.EBook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EBook.entity.Reader;

public interface ReaderRepository extends JpaRepository<Reader, Long> {

}
