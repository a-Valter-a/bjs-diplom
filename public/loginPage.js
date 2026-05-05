// "use strict";

const userForm = new UserForm();

function handleResponseLogin(response) {
    if (response.success) {
        window.location.reload();
    } else userForm.setLoginErrorMessage(response.error);
}
function handleResponseRegister(response) {
    if (response.success) {
        window.location.reload();
    } else userForm.setRegisterErrorMessage(response.error);
}

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, handleResponseLogin);
};
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, handleResponseRegister);
};
userForm.loginFormCallback({ login: "oleg@demo.ru", password: "demo" });
