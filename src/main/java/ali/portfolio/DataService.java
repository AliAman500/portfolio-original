package ali.portfolio;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.util.List;

import ali.portfolio.models.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@Service
public class DataService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Project> getProjects() throws IOException {
        return objectMapper.readValue(
            new ClassPathResource("data/projects.json").getInputStream(),
            new TypeReference<List<Project>>() {}
        );
    }

    public List<SkillCategory> getSkills() throws IOException {
        return objectMapper.readValue(
            new ClassPathResource("data/skills.json").getInputStream(),
            new TypeReference<List<SkillCategory>>() {}
        );
    }
}