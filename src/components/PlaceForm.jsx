import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

const PlaceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    middle_name: "",
    vk: "",
    tg: "",
    phone: "",
    program: "",
    group: "",
    course: "",
    people_custom: [""]
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[А-ЯЁ][а-яё]+$/;
    const surnameRegex = /^[А-ЯЁ][а-яё]+$/; 
    const middleNameRegex = /^[А-ЯЁ][а-яё]+$/; 
    const vkRegex = /^https?:\/\/(www\.)?vk\.com\/[a-zA-Z0-9._-]+$/; 
    const tgRegex = /^@?[a-zA-Z0-9_]{5,}$/; 
    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/; 

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Имя должно быть на русском языке";
    }
    if (!surnameRegex.test(formData.surname)) {
      newErrors.surname = "Фамилия должна быть на русском языке";
    }
    if (formData.middle_name && !middleNameRegex.test(formData.middle_name)) {
      newErrors.middle_name = "Отчество должно быть на русском языке";
    }
    if (!vkRegex.test(formData.vk)) {
      newErrors.vk = "Введите корректную ссылку на VK";
    }
    if (!tgRegex.test(formData.tg)) {
      newErrors.tg = "Введите корректную ссылку на tg";
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }
    if (!formData.program) {
      newErrors.program = "Введите образовательную программу";
    }
    if (!formData.group) {
      newErrors.group = "Введите группу";
    }
    if (!formData.course) {
      newErrors.course = "Выберите курс";
    }
    formData.people_custom.forEach((person, index) => {
      if (!person) {
        newErrors[`people_custom[${index}]`] = "Введите имя желаемого соседа";
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("people_custom")) {
      const index = parseInt(name.split("[")[1]);
      const newPeople = [...formData.people_custom];
      newPeople[index] = value;
      setFormData({ ...formData, people_custom: newPeople });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    validateForm();
  };

  const handleAddPerson = () => {
    setFormData({ ...formData, people_custom: [...formData.people_custom, ""] });
  };

  const handleRemovePerson = (index) => {
    const newPeople = [...formData.people_custom];
    newPeople.splice(index, 1);
    setFormData({ ...formData, people_custom: newPeople });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await fetch('api/v1/resettlement', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            surname: formData.surname,
            middle_name: formData.middle_name || null,
            vk: formData.vk,
            tg: formData.tg,
            phone: formData.phone,
            program: formData.program,
            group: formData.group,
            course: parseInt(formData.course),
            people_custom: formData.people_custom
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Response:', data);
        } else {
          console.error('Ошибка:', data);
          setErrors(data);
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
      }
    }
  };

  return (
    <div className="registration">
      <form onSubmit={handleSubmit} className="registration-form">
        <h1>-- Расселение --</h1>
        <div className="form-grid">
          <div>
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <label>Фамилия</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Иванов"
              required
            />
            {errors.surname && <span className="error">{errors.surname}</span>}
          </div>
          <div>
            <label>Отчество (при наличии)</label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              placeholder="Иванович"
            />
            {errors.middle_name && <span className="error">{errors.middle_name}</span>}
          </div>
          <div>
            <label>Ссылка на VK</label>
            <input
              type="text"
              name="vk"
              value={formData.vk}
              onChange={handleChange}
              placeholder="https://vk.com/ivanov_vk"
              required
            />
            {errors.vk && <span className="error">{errors.vk}</span>}
          </div>
          <div>
            <label>Ссылка на tg</label>
            <input
              type="text"
              name="tg"
              value={formData.tg}
              onChange={handleChange}
              placeholder="@ivanov_tg"
              required
            />
            {errors.tg && <span className="error">{errors.tg}</span>}
          </div>
          <div className='form-grid-item'>
            <div>
              <label>Курс</label>
              <CustomSelect
                name="course"
                value={formData.course}
                onChange={handleChange}
                options={[
                  { value: '1', label: '1 (бак. / спец.)' },
                  { value: '2', label: '2 (бак. / спец.)' },
                  { value: '3', label: '3 (бак. / спец.)' },
                  { value: '4', label: '4 (бак. / спец.)' },
                  { value: '5', label: '5 (бак. / спец.)' },
                  { value: '6', label: '1 (магистратура)' },
                  { value: '7', label: '2 (магистратура)' },
                ]}
              />
              {errors.course && <span className="error">{errors.course}</span>}
            </div>
            <div>
              <label>Группа</label>
              <input
                type="text"
                name="group"
                value={formData.group}
                onChange={handleChange}
                placeholder="БИВ203"
                required
              />
              {errors.group && <span className="error">{errors.group}</span>}
            </div>
          </div>
        </div>
        <div className='form-grid-two'>
          <div>
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7(900)777-14-88"
              required
            />
          </div>
          <div>
            <label>Образовательная программа</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="Информатика и вычислительная техника"
              required
            />
          </div>
          <div>
            <label>С кем хочешь жить?</label>
            {formData.people_custom.map((person, index) => (
              <div key={index} className="person-input">
                <input
                  type="text"
                  name={`people_custom[${index}]`}
                  value={person}
                  onChange={handleChange}
                  placeholder={`Иванов Иван Иванович ${index + 1}`}
                />
                {index > 0 && (
                  <button type="button" className="remove-person" onClick={() => handleRemovePerson(index)}>
                    -
                  </button>
                )}
              </div>
            ))}
            {formData.people_custom.length < 3 && (
              <button type="button" className="add-person" onClick={handleAddPerson}>
                +
              </button>
            )}
          </div>
        </div>
        <button 
          type="submit" 
          style={{ backgroundColor: isFormValid ? '#E7E2FF' : 'rgb(255, 255, 255, 0.4)' }}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default PlaceForm;