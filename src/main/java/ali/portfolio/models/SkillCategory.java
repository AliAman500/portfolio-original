package ali.portfolio.models;

import java.util.List;

public class SkillCategory {
	
    public String category;
    public String icon;
    public List<Skill> skills;

    public static class Skill {
        public String name;
        public int progress;
        public String icon;
		public String color;
    }
}
