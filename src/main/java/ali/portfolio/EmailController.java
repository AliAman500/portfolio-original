package ali.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.time.*;

@RestController
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    private static Instant lastSentTime = null;
    private static final long TIME_LIMIT_MS = 60 * 1000;

    @PostMapping("/sendEmail")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        Instant now = Instant.now();

        if (lastSentTime != null && Duration.between(lastSentTime, now).toMillis() < TIME_LIMIT_MS) {
            return "Error";
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("ali.burki1@hotmail.com");
            message.setTo("ali.burki1@hotmail.com");
            message.setSubject("New Inquiry");
            message.setText("Email: " + emailRequest.email + "\nInquiry:\n" + emailRequest.inquiry);
            mailSender.send(message);

            lastSentTime = Instant.now();

            return "Success";
        } catch (Exception e) {
            return "Error";
        }
    }

    public static class EmailRequest {
        public String email;
        public String inquiry;
    }
}