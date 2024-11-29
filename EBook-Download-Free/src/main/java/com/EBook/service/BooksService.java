package com.EBook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.EBook.entity.Books;
import com.EBook.repository.BooksRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BooksService {

    @Autowired
    private BooksRepository booksRepository;

    public Books createBook(Books book) {
        return booksRepository.save(book);
    }

    public Optional<Books> getSingleBook(Long id) {
        return booksRepository.findById(id);
    }

    public List<Books> getAllBook() {
        return booksRepository.findAll();
    }

    public Books updateSingleBook(Long id, String bookName, String writerName, String description, String category, MultipartFile coverImage, MultipartFile pdfFile) throws IOException {
        Optional<Books> optionalBook = booksRepository.findById(id);
        if (optionalBook.isPresent()) {
            Books book = optionalBook.get();
            if (bookName != null) book.setBookName(bookName);
            if (writerName != null) book.setWriterName(writerName);
            if (description != null) book.setDescription(description);
            if (category != null) book.setCategory(category); // Update category
            if (coverImage != null) book.setCoverImage(coverImage.getBytes());
            if (pdfFile != null) book.setPdfFile(pdfFile.getBytes());
            return booksRepository.save(book);
        }
        throw new RuntimeException("Book not found with id: " + id);
    }

    public boolean deleteSingleBook(Long id) {
        if (booksRepository.existsById(id)) {
            booksRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
