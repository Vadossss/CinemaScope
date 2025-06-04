package com.search.backend.services;

import com.search.backend.models.*;
import com.search.backend.repositories.UserMongoRepository;
import com.search.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserSettingsService {

    private final Path avatarStorageLocation;
    private UserSettingsService userSettingsService;

    private final UserService userService;
    private final UserMongoRepository userMongoRepository;
    private final UserRepository userRepository;


    @Autowired
    public UserSettingsService(FileStorageProperties fileStorageProperties, UserService userService, UserMongoRepository userMongoRepository, UserRepository userRepository) {
        this.avatarStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        this.userService = userService;
        this.userMongoRepository = userMongoRepository;
        this.userRepository = userRepository;

        try {
            Files.createDirectories(this.avatarStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Ошибка создания директории", ex);
        }
    }

    private String storeAvatar(MultipartFile file, Long userId) {
        String fileExtension = Optional.ofNullable(file.getOriginalFilename())
                .filter(f -> f.contains("."))
                .map(f -> f.substring(file.getOriginalFilename().lastIndexOf(".")))
                .orElse("");

        // Формируем новое имя файла
        String fileName = "avatar_" + userId + fileExtension;

        // Удаляем старые аватары с таким userId
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(avatarStorageLocation, "avatar_" + userId + ".*")) {
            for (Path path : stream) {
                Files.deleteIfExists(path);
            }
        } catch (IOException e) {
            throw new RuntimeException("Не удалось удалить старый аватар", e);
        }

        // Сохраняем новый аватар
        try {
            Path targetLocation = avatarStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Не удалось сохранить аватар " + fileName, ex);
        }
    }

    private Resource loadAvatarAsResource(String fileName) {
        try {
            Path filePath = avatarStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Avatar file not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Avatar file not found " + fileName, ex);
        }
    }

    public ResponseEntity<Object> uploadAvatar(MultipartFile file) {
        UserDetails userDetails = userService.getCurrentUser();
        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
        String fileName = storeAvatar(file, Long.valueOf(userMongo.getId()));

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/user_settings/download/")
                .path(fileName)
                .toUriString();

        userMongo.setAvatarPath(fileDownloadUri);
        userMongoRepository.save(userMongo);

        return ResponseEntity.ok().body(Map.of(
                "fileName", fileName,
                "downloadUri", fileDownloadUri,
                "contentType", file.getContentType(),
                "size", file.getSize()
        ));
    }

    public ResponseEntity<Resource> downloadAvatar(String fileName, HttpServletRequest request) {
        Resource resource = loadAvatarAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            ResponseEntity.status(400).body(new MessageResponse("Ошибка получения картинки"));
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    public ResponseEntity<Object> updateLogin(UpdateLoginRequest updateLoginRequest) {
        UserDetails userDetails = userService.getCurrentUser();

        if (userDetails == null) {
            return ResponseEntity.status(400).body(new MessageResponse("Ошибка пользователя"));
        }

        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
        AppUser user = userRepository.findByUsername(userDetails.getUsername());

        userMongo.setUsername(updateLoginRequest.getUsername());
        user.setUsername(updateLoginRequest.getUsername());
        userMongoRepository.save(userMongo);
        userRepository.save(user);

        return ResponseEntity.ok().body(Map.of(
                "newUsername", updateLoginRequest.getUsername()
        ));
    }
}
