package ali.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.io.IOException;

@Controller
public class WebController {

	@Autowired
    private DataService dataService;

    @GetMapping("/")
    public String index(Model model) {
        try {
            model.addAttribute("projects", dataService.getProjects());
            model.addAttribute("skills", dataService.getSkills());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "index";
    }

}
