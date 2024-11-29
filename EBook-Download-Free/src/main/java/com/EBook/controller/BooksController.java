package com.EBook.controller;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.EBook.entity.Books;
import com.EBook.service.BooksService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BooksController {

    @Autowired
    private BooksService booksService;

    @PostMapping("/create")
    public ResponseEntity<Books> createBook(
            @RequestParam("bookName") String bookName,
            @RequestParam("writerName") String writerName,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("coverImage") MultipartFile coverImage,
            @RequestParam("pdfFile") MultipartFile pdfFile) throws IOException {

        Books book = new Books();
        book.setBookName(bookName);
        book.setWriterName(writerName);
        book.setDescription(description);
        book.setCategory(category); // Set category
        book.setCoverImage(coverImage.getBytes());
        book.setPdfFile(pdfFile.getBytes());

        Books createdBook = booksService.createBook(book);
        return ResponseEntity.ok(createdBook);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Books> getBookById(@PathVariable Long id) {
        return booksService.getSingleBook(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getList")
    public ResponseEntity<List<Books>> getAllBooks() {
        List<Books> books = booksService.getAllBook();
        return ResponseEntity.ok(books);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Books> updateBook(
            @PathVariable Long id,
            @RequestParam(value = "bookName", required = false) String bookName,
            @RequestParam(value = "writerName", required = false) String writerName,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "category", required = false) String category, // Update category
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestParam(value = "pdfFile", required = false) MultipartFile pdfFile) throws IOException {
        Books updatedBook = booksService.updateSingleBook(id, bookName, writerName, description, category, coverImage, pdfFile);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        boolean isDeleted = booksService.deleteSingleBook(id);
        if (isDeleted) {
            return ResponseEntity.ok("Book deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/downloadPDF/{id}")
    public ResponseEntity<byte[]> downloadPDF(@PathVariable Long id) {
        return booksService.getSingleBook(id)
                .map(book -> {
                    byte[] pdfData = book.getPdfFile();
                    if (pdfData != null) {
                        HttpHeaders headers = new HttpHeaders();
                        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + book.getBookName() + ".pdf");
                        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");
                        return new ResponseEntity<>(pdfData, headers, HttpStatus.OK);
                    }
                    return new ResponseEntity<>(new byte[0], HttpStatus.NOT_FOUND);
                })
                .orElse(new ResponseEntity<>(new byte[0], HttpStatus.NOT_FOUND));
    }
}
