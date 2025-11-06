package tn.excellia.gestemploye.dtos;

public class LoginDtoResponse {

    private String token;

    public LoginDtoResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
