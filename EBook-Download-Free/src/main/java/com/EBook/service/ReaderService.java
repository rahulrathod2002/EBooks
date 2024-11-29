package com.EBook.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EBook.entity.Reader;
import com.EBook.repository.ReaderRepository;

@Service
public class ReaderService {

    @Autowired
    private ReaderRepository readerRepository;

    public Reader createNewReader(Reader reader) {
        return readerRepository.save(reader);
    }

    public Optional<Reader> getSingleReader(Long id) {
        return readerRepository.findById(id);
    }

    public List<Reader> getAllReader() {
        return readerRepository.findAll();
    }

    public Optional<Reader> updateSingleReader(Reader reader, Long id) {
        return readerRepository.findById(id).map(existingReader -> {
            if (reader.getName() != null) existingReader.setName(reader.getName());
            if (reader.getContact() != null) existingReader.setContact(reader.getContact());
            if (reader.getCity() != null) existingReader.setCity(reader.getCity());
            return readerRepository.save(existingReader);
        });
    }

    public boolean deleteSingleReader(Long id) {
        if (readerRepository.existsById(id)) {
            readerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
