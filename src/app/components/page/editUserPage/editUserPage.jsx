import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioFild";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/table/backButton";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const history = useHistory();
    const { currentUser, updateUserData } = useAuth();
    const { qualities } = useQualities();
    const [isLoading, setIsLoading] = useState(false);

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [errors, setErrors] = useState({});
    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            qualitiesArray.push(elem.value);
        }
        console.log(qualitiesArray);
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        const { qualities } = data;
        updateUserData({
            ...data,
            qualities: getQualities(qualities)
        });
        history.goBack();
    };
    const transformData = (data) => {
        const qualitiesArray = [];
        for (const elem of data) {
            for (const quality in qualities) {
                if (elem === qualities[quality]._id) {
                    qualitiesArray.push({
                        label: qualities[quality].name,
                        value: qualities[quality]._id
                    });
                }
            }
        }
        return qualitiesArray;
    };
    useEffect(() => {
        setIsLoading(true);
        setData((prevState) => ({
            ...prevState,
            ...currentUser,
            qualities: transformData(currentUser.qualities),
            profession: currentUser.profession
        }));
    }, []);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading &&
                    Object.keys(professions).length > 0 &&
                    Object.keys(qualities).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
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
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
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
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
