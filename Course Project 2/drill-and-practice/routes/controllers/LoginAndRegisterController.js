import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js"
import { validasaur } from "../../deps.js";

const showRegistrationForm = async ({render, state}) => {
    const data = {
        email: "",
    };
    const errors= await state.session.get("errors");
    if (errors){
        data.errors=errors;
        data.email= await state.session.get("email");
    }
    render("registration.eta",data);
};

const registerValidationRules= {
    email: [validasaur.required],
    password: [validasaur.required, validasaur.minLength(4)],
}

const registerUser = async ({request, response, state}) => { 
    const body=request.body({ type : "form" });
    const params= await body.value;

    const userData= {
        email: params.get("email"),
        password: params.get("password"),
    };

    const [passed, errors] = await validasaur.validate( userData, registerValidationRules);
    if (!passed){
        await state.session.set("errors", errors);
        await state.session.set("email", userData.email);
        response.redirect("/auth/register"); 
    }else{
        await state.session.set("errors", null);
        await userService.addUser(
            userData.email,
            await bcrypt.hash(userData.password),
        );
        response.redirect("/auth/login")
    };

};

const showLoginForm = async ({render, state}) => { 
    const data = {
        errors : []
    };
    const errors= await state.session.get("loginErrors");
    if (errors&&errors.length>0){
        data.errors= errors;
    }
    render("login.eta",data);
};

const loginUser = async ({request, response, state}) => { 
    const body= request.body({ type : "form"});
    const params= await body.value;

    const user= await userService.findUserByEmail( params.get("email") );
    const errors=[];
    if (user===-1){ 
        errors.push("Not valid email or/and password!");
        await state.session.set("loginErrors", errors);
        response.redirect("/auth/login");
        return;
    }
    const passwordMatches = await bcrypt.compare(
        params.get("password"),
        user.password,
      );
    if (!(passwordMatches)){
        errors.push("Not valid email or/and password!");
        await state.session.set("loginErrors", errors);
        response.redirect("/auth/login");
        return;
    }

    await state.session.set("loginErrors", []);
    await state.session.set("user",user);
    response.redirect("/topics");

};


export {showRegistrationForm, registerUser, showLoginForm, loginUser}

