package com.EBook.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import java.util.Base64;

@Entity
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] coverImage;

    @Lob
    private byte[] pdfFile;

    private String bookName;
    private String writerName;
    private String description;
    private String category; // Added category field

    // Add getter for coverImage as base64
    public String getCoverImageBase64() {
        if (coverImage != null) {
            return Base64.getEncoder().encodeToString(coverImage);
        }
        return null;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(byte[] coverImage) {
        this.coverImage = coverImage;
    }

    public byte[] getPdfFile() {
        return pdfFile;
    }

    public void setPdfFile(byte[] pdfFile) {
        this.pdfFile = pdfFile;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getWriterName() {
        return writerName;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Books() {
        super();
    }

    public Books(Long id, byte[] coverImage, byte[] pdfFile, String bookName, String writerName, String description, String category) {
        this.id = id;
        this.coverImage = coverImage;
        this.pdfFile = pdfFile;
        this.bookName = bookName;
        this.writerName = writerName;
        this.description = description;
        this.category = category; // Initialize category
    }
}
