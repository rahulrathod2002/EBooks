package com.EBook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.EBook.entity.Reader;
import com.EBook.service.ReaderService;

@RestController
@RequestMapping("/reader")
public class ReaderController {

    @Autowired
    private ReaderService readerService;

    @PostMapping("/create")
    public ResponseEntity<Reader> createReader(@RequestBody Reader reader) {
        Reader createdReader = readerService.createNewReader(reader);
        return ResponseEntity.ok(createdReader);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Reader> getReaderById(@PathVariable Long id) {
        return readerService.getSingleReader(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getList")
    public ResponseEntity<List<Reader>> getAllReaders() {
        List<Reader> readers = readerService.getAllReader();
        return ResponseEntity.ok(readers);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Reader> updateReader(@RequestBody Reader reader, @PathVariable Long id) {
        return readerService.updateSingleReader(reader, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReader(@PathVariable Long id) {
        boolean isDeleted = readerService.deleteSingleReader(id);
        if (isDeleted) {
            return ResponseEntity.ok("Reader deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }
}
