import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import * as yup from "yup";

const LoginForm = () => {
    const history = useHistory();
    const { logIn } = useAuth();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    function handleChange(target) {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    }
    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("Пароль обязателен для заполнения")
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             "Пароль должен содержать хотя бы одну заглавную букву"
    //         )
    //         .matches(
    //             /(?=.*[0-9])/,
    //             "Пароль должен содержать хотя бы одно число"
    //         )
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             "Пароль должен содержать один из специальных символов !@#$%^&*"
    //         )
    //         .matches(
    //             /(?=.{8,})/,
    //             "Пароль должен состоять минимум из 8 символов"
    //         ),
    //     email: yup
    //         .string()
    //         .required("Электронная почта обязательна для заполнения")
    //         .email("Email введен некорректно")
    // });
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    function validate() {
        const errors = validator(data, validatorConfig);
        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const isValid = Object.keys(errors).length === 0;
    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await logIn(data);
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setEnterError(error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставатся в системе
            </CheckBoxField>
            {enterError && <p className="text-dange">{enterError}</p>}
            <button
                type="submit"
                disabled={!isValid || enterError}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
