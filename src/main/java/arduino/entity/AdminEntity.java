package arduino.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminEntity {

    @NotBlank(message = "Username cannot be blank")
    @Size(min = 1, max = 20)
    private String username;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 1, max = 20)
    private String password;
}
