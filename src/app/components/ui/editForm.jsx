import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioFild from "../common/form/radioFild";
import MultiSelectField from "../common/form/multiSelectField";
import NameField from "../common/form/nameField";
import { useParams, useHistory } from "react-router-dom";

const EditForm = () => {
    const params = useParams();
    const { userId } = params;
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    console.log(data);
    const history = useHistory();
    const [qualities, setQualities] = useState();
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const qualiti = [];
    function handleSave() {
        name();
        api.users.update(userId, data);
        history.push(`/users/${userId}`);
    }
    function name() {
        const profe = professions.find((user) => user._id === data.profession);

        for (const id of data.qualities) {
            const array = Object.keys(qualities).find(
                (user) => qualities[user]._id === id.value
            );
            qualiti.push(qualities[array]);
        }

        data.profession = profe;
        data.qualities = qualiti;
    }
    function handleChange(target) {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.value);
    }
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберете вашу профессию"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательна для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    function validate() {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const isValid = Object.keys(errors).length === 0;
    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    }
    if (professions) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <NameField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professions}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioFild
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                                onClick={() => handleSave()}
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return <h1>Loading</h1>;
};

export default EditForm;
