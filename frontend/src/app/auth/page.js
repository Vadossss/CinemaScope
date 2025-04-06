"use client"

import React from "react";
import { Form, Input, Button, Checkbox } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

import { Tabs, Tab, Link, Card, CardBody } from "@heroui/react";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export const animals = [
    { key: "teenager", label: "12-16 лет" },
    { key: "young", label: "17-21" },
    { key: "adult", label: "22-40" },
    { key: "elderly", label: "41-59" },
    { key: "old", label: "60 и старше" },
];

export const EyeSlashFilledIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                fill="currentColor"
            />
            <path
                d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                fill="currentColor"
            />
            <path
                d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                fill="currentColor"
            />
            <path
                d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                fill="currentColor"
            />
            <path
                d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const EyeFilledIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                fill="currentColor"
            />
            <path
                d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default function Auth() {
    const [selected, setSelected] = React.useState("login");
    const [action, setAction] = React.useState(null);
    const [submitted, setSubmitted] = React.useState(null);
    const [password, setPassword] = React.useState("");
    const [gender, setGender] = useState("");
    const router = useRouter();
    const [loginDisabled, setLoginDisabled] = useState(true)
    const [login, setLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [errorsLogin, setErrors] = useState({ login: "", password: "" });
    const [registerDisabled, setRegisterDisabled] = useState(true)
    const [loginRegister, setLoginRegister] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [nameRegister, setNameRegister] = useState("");
    const [lastNameRegister, setLastNameRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [passwordSecondRegister, setPasswordSecondRegister] = useState("");
    const [ageRegister, setAgeRegister] = useState("");
    const [touchedAge, setTouchedAge] = React.useState(false);
    const [checkBoxRegister, setCheckBoxRegister] = useState(false);
    const [isCaptcha, setCaptcha] = useState(false);
    const [errorsRegister, setErrorsRegister] = useState({ login: "", password: "", passwordSecond: "", name: "", lastName: "", email: "", checkBox: "", age: "", sex: "", status: "" });

    // const [registerMessage, setRegisterMessage] = useState("");

    let source = "http://laba1.ru/api";
    let source2 = "http://localhost:8085";

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const errors = [];

    useEffect(() => {
        let loginError = login.length < 6 ? "Логин должен содержать минимум 6 символов" : "";
        let passwordError = passwordLogin.length < 8 ? "Пароль должен содержать минимум 8 символов" : "";

        setErrors({ login: loginError, password: passwordError });
        setRegisterMessage("");
    }, [login, passwordLogin]);

    useEffect(() => {
        let loginError = loginRegister.length < 6 ? "Логин должен содержать минимум 6 символов" : "";

        let emailError = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailRegister) ? "Неверный формат почты" : "";

        let nameError = !/^[A-Za-zА-Яа-яЁё]{2,15}$/.test(nameRegister) ? "Имя должно содержать только буквы (2-15 символов)" : "";

        let lastNameError = !/^[A-Za-zА-Яа-яёЁ]{2,15}(-[A-Za-zА-Яа-яёЁ]{2,15})?$/.test(lastNameRegister) ? "Фамилия должна быть 2-15 символов и может содержать один дефис" : "";


        let passwordError = "";

        if (passwordRegister.length < 8) {
            passwordError = "Пароль должен содержать минимум 8 символов";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(passwordRegister) && passwordRegister.length !== 0) {
            passwordError = "Пароль должен содержать хотя бы одну заглавную букву, строчную букву, цифру и специальный символ";
        }

        let passwordSecondError = "";

        if (passwordError === "") {
            if (passwordRegister !== passwordSecondRegister) {
                passwordSecondError = "Пароли не совпадают"
            }
        }

        let ageError = ageRegister.length === 0 ? "Укажите ваш возраст" : "";

        let checkBoxError = !checkBoxRegister ? "*Необходимо согласиться с правилами" : "";

        setErrorsRegister({ login: loginError, password: passwordError, passwordSecond: passwordSecondError, name: nameError, lastName: lastNameError, email: emailError, checkBox: checkBoxError, age: ageError, sex: "" });
        setRegisterMessage("");
    }, [loginRegister, passwordRegister, nameRegister, emailRegister, lastNameRegister, ageRegister, checkBoxRegister, passwordSecondRegister]);



    if (password.length < 6) {
        errors.push("Пароль должен быть больше 6 символов");
    }
    if ((password.match(/[A-ZА-Я]/g) || []).length < 1) {
        errors.push("Пароль должен содержать хотя бы одну прописную букву");
    }
    if ((password.match(/[^a-zа-я0-9]/gi) || []).length < 1) {
        errors.push("Пароль должен содержать хотя бы одну строчную букву");
    }

    const [loginMessage, setLoginMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');



    async function handleRegisterSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        console.log('Submitting form:', data);

        try {
            const res = await fetch(`/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                // credentials: "include"
            });
            const result = await res.text();
            console.log('Server response:', result);

            if (res.ok) {
                router.push("/dashboard");
                return;
            }

            if (res.status === 409) {
                setRegisterMessage(result);
                return;
            }

            if (res.status === 401) {
                setRegisterMessage(result);
                return;
            }

            setRegisterMessage(result || 'Ошибка при регистрации');

        } catch (error) {
            console.error('Error:', error);
            setRegisterMessage("Сервис временно недоступен");
        }
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log('Submitting form:', data);
        // const captchaResponse = grecaptcha.getResponse();

        // if (!captchaResponse) {
        //   setLoginMessage("Пожалуйста, пройдите проверку reCAPTCHA.");
        //   return;
        // }

        // data.captcha = captchaResponse;

        try {
            const res = await fetch(source2 + `/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include"
            });
            // console.log('Submitting form:', data);
            // const errorData = await res.text();

            const dataRes = await res.json();

            console.log(dataRes);

            if (res.status === 200) {
                router.push("/");
            } else {
                setLoginMessage(dataRes.error);
                console.log(dataRes);
            }

            // if (res.status === 401) {
            //   setLoginMessage(errorData);
            // }
            // if (res.ok) {
            //   router.push("/dashboard");
            // }

        } catch (error) {
            // setLoginMessage(error);
        }
    }


    return (
        // <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col">
            <Card className="max-w-full w-[340px]">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        aria-label="Tabs form"
                        selectedKey={selected}
                        size="md"
                        onSelectionChange={setSelected}
                        color="primary"
                    >
                        <Tab key="login" title="Войти" >
                            <Form
                                className="flex flex-col gap-2"
                                onSubmit={handleLoginSubmit}
                                validationBehavior="native"
                            >
                                <Input
                                    isRequired
                                    label="Логин"
                                    placeholder="Введите email"
                                    type="login"
                                    name="username"
                                    onChange={(e) => setLogin(e.target.value)}
                                    validate={() => {
                                        if (errorsLogin.login) {
                                            return errorsLogin.login;
                                        }
                                        return "";
                                    }}
                                />
                                <Input
                                    isRequired
                                    label="Пароль"
                                    placeholder="Введите ваш пароль"
                                    type="password"
                                    name="password"
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                    validate={() => {
                                        if (errorsLogin.password) {
                                            return errorsLogin.password;
                                        }
                                        return "";
                                    }}
                                />
                                <p className="text-center text-small">
                                    Нужно создать аккаунт?{" "}
                                    <Link className="cursor-pointer" size="sm" onPress={() => setSelected("sign-up")}>
                                        Зарегистрироваться
                                    </Link>
                                </p>
                                <div className="flex flex-col w-full items-center justify-center gap-2">
                                    {loginMessage && <p className="text-[#f31260] text-sm">{loginMessage}</p>}
                                    <Button
                                        color="primary"
                                        type="submit">
                                        Войти
                                    </Button>
                                </div>
                            </Form>
                        </Tab>
                        <Tab key="sign-up" title="Зарегистрироваться">
                            <Form
                                className="w-full max-w-xs flex flex-col gap-4"
                                validationBehavior="native"
                                onReset={() => setAction("reset")}
                                onSubmit={handleRegisterSubmit}
                            >
                                <Input
                                    isRequired
                                    label="Логин"
                                    name="login"
                                    placeholder="Введите свой Логин"
                                    type="text"
                                    validate={() => {
                                        if (errorsRegister.login) {
                                            return errorsRegister.login;
                                        }
                                        return "";

                                    }}
                                    onChange={(e) => setLoginRegister(e.target.value)}
                                />
                                <Input
                                    isRequired
                                    label="Email"
                                    name="email"
                                    placeholder="Введите email"
                                    onChange={(e) => setEmailRegister(e.target.value)}
                                    validate={() => {
                                        if (errorsRegister.email) {
                                            return errorsRegister.email;
                                        }
                                        return "";

                                    }}
                                />
                                <Input
                                    autoComplete="off"
                                    isRequired
                                    endContent={
                                        <button
                                            aria-label="toggle password visibility"
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    label="Пароль"
                                    name="password"
                                    placeholder="Придумайте пароль"
                                    type={isVisible ? "text" : "password"}
                                    onChange={(e) => setPasswordRegister(e.target.value)}
                                    validate={() => {
                                        if (errorsRegister.password) {
                                            return errorsRegister.password;
                                        }
                                        return "";
                                    }}
                                />
                                <div className="w-full flex items-center justify-center">
                                    <p className="text-center text-small">
                                        Уже есть аккаунт?{" "}
                                        <Link className="cursor-pointer" size="sm" onPress={() => setSelected("login")}>
                                            Войти
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex flex-col w-full items-center justify-center gap-2">
                                    {errorsRegister.status && <p className="text-[#f31260] text-xs">{errorsRegister.status}</p>}
                                    <Button
                                        color="primary"
                                        type="submit"
                                    >
                                        Зарегистрироваться
                                    </Button>
                                    {registerMessage && <p className="text-[#f31260] text-xs">{registerMessage}</p>}
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>

        // </div>
    );
}

