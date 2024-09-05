import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

const TransferForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    middle_name: "",
    email: "",
    vk: "",
    tg: "",
    phone: "",
    from: "Одинцово",
    departure_time: "",  
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [transferTimes, setTransferTimes] = useState({
    "Одинцово": ["15:15", "15:35", "15:55"], 
    "Парк Победы": ["15:55", "17:35"]
    }); 
  useEffect(() => {
    const fetchTransferTimes = async () => {
      try {
        const response = await fetch('api/v1/times');
        const data = await response.json();
        setTransferTimes(data);
      } catch (error) {
        console.error('Ошибка при получении времени трансфера:', error);
      }
    };

    fetchTransferTimes();
  }, []);
  
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
      newErrors.tg = "Введите корректную ссылку на Telegram (например, @username)";
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона в формате: +7(900)777-14-88";
    }
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Форма отправлена:', formData);

      try {
        const response = await fetch('api/v1/transfer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            surname: formData.surname,
            middle_name: formData.middle_name || null,
            email: formData.email,
            vk: formData.vk,
            tg: formData.tg,
            phone: formData.phone,
            _from: formData.from,
            departure_time: formData.departure_time,
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
        <h1>-- Трансфер --</h1>
        <p>До место проведения можно добраться как самостоятельно, так и предложенным трансфером.<br></br>Автобусы стартуют с нескольких точек в разное время — вы можете выбрать для себя оптимальный вариант.</p>
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
              placeholder="example@mail.com"
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
            <label>Откуда</label>
            <CustomSelect
              name="from"
              value={formData.from}
              onChange={handleChange}
              options={[
                { value: 'Одинцово', label: 'Одинцово' },
                { value: 'Парк Победы', label: 'Парк Победы' },
              ]}
              required
            />
          </div>
          <div>
            <label>Время отправления</label>
            <CustomSelect
              name="departure_time"
              value={formData.departure_time}
              onChange={handleChange}
              options={formData.from
                ? transferTimes[formData.from].map(time => ({
                    value: time,
                    label: time,
                  }))
                : []}
              required
            />
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

export default TransferForm;