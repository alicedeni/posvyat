import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    middle_name: "",
    vk: "",
    tg: "",
    phone: "",
    bday: "",
    sex: "Мужской",
    university: "",
    faculty: "",
    group: "",
    transfer: "",
    course: 1,
    health_features: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[А-ЯЁ][а-яё]+$/;
    const surnameRegex = /^[А-ЯЁ][а-яё]+$/; 
    const middleNameRegex = /^[А-ЯЁ][а-яё]+$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const vkRegex = /^https?:\/\/(www\.)?vk\.com\/[a-zA-Z0-9._-]+$/; 
    const tgRegex = /^@?[a-zA-Z0-9_]{5,}$/; 
    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

    if (!surnameRegex.test(formData.surname)) {
      newErrors.surname = "Фамилия должна быть на русском языке";
    }
    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Имя должно быть на русском языке";
    }
    if (formData.middle_name && !middleNameRegex.test(formData.middle_name)) {
      newErrors.middle_name = "Отчество должно быть на русском языке";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный адрес электронной почты";
    }
    if (!vkRegex.test(formData.vk)) {
      newErrors.vk = "Введите корректную ссылку на VK";
    }
    if (!tgRegex.test(formData.tg)) {
      newErrors.tg = "Введите корректную ссылку на Telegram";
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Форма отправлена:', formData);

      try {
        const response = await fetch('api/v1/registration', {
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
            bday: formData.bday,
            sex: formData.sex,
            university: formData.university,
            faculty: formData.faculty,
            group: formData.group,
            transfer: formData.transfer,
            course: Number(formData.course),
            health_features: formData.health_features,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Response:', data);
        } else {
          console.error('Ошибка:', data);
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
      }
    }
  };

  return (
    <div className="registration">
      <h1 className="head-title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-grid">
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
            <label>Почта</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="posvyat@edu.hse.ru"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Ссылка на VK</label>
            <input
              type="text"
              name="vk"
              value={formData.vk}
              onChange={handleChange}
              placeholder="https://vk.com/ivan4325"
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
              placeholder="@student"
              required
            />
            {errors.tg && <span className="error">{errors.tg}</span>}
          </div>
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
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div>
            <label>Дата рождения</label>
            <input
              type="date"
              name="bday"
              value={formData.bday}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Пол</label>
            <CustomSelect
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              options={[
                {value: "male", label: 'Мужской'},
                {value: "female", label: 'Женский'}
              ]}
            />
          </div>
          <div>
            <label>ВУЗ</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="НИУ ВШЭ"
              required
            />
          </div>
          <div>
            <label>Факультет</label>
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              placeholder="МИЭМ"
              required
            />
          </div>
          <div>
            <label>Программа</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="ИВТ"
              required
            />
          </div>
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
          </div>
          <div>
            <label>Группа</label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              placeholder="БИВ001"
              required
            />
          </div>
          <div>
            <label>Нужен ли тебе трансфер?</label>
            <input
              type="text"
              name="transfer"
              value={formData.transfer}
              onChange={handleChange}
              placeholder="Да, от Одинцово"
              required
            />
          </div>
        </div>
        <div>
          <h1>Особенности здоровья</h1>
          <textarea
            name="health_features"
            value={formData.health_features}
            onChange={handleChange}
            placeholder="Введите особенности здоровья"
            required
          />
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

export default RegistrationForm;