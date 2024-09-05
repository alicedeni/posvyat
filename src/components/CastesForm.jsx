import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import castesImage from '../assets/images/castes.png'; 

const CastesForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    priorities: Array(6).fill("")
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/; 

    if (!formData.phone) {
      newErrors.phone = "Введите номер телефона";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона в формате: +7(900)777-14-88";
    }

    const uniquePriorities = new Set(formData.priorities);
    if (uniquePriorities.size < formData.priorities.length) {
      newErrors.priorities = "Приоритеты должны быть уникальными";
    }

    formData.priorities.forEach((priority, index) => {
      if (!priority) {
        newErrors[`priority${index + 1}`] = `Приоритет ${index + 1} обязателен`;
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (index, value) => {
    const newPriorities = [...formData.priorities];
    newPriorities[index] = value;
    setFormData({ ...formData, priorities: newPriorities });
    validateForm();
  };

  const handlePhoneChange = (e) => {
    setFormData({ ...formData, phone: e.target.value });
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await fetch('api/v1/factions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: formData.phone,
            priority1: formData.priorities[0],
            priority2: formData.priorities[1],
            priority3: formData.priorities[2],
            priority4: formData.priorities[3],
            priority5: formData.priorities[4],
            priority6: formData.priorities[5],
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
        <h1>-- Касты --</h1>
        <p>Ваша задача расставить касты по приоритетам. От их выбора зависит квест основной программы, выбирайте сердцем, а не разумом</p>
        <div className="form-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="priority-box">
              <img src={castesImage} alt={`Приоритет ${index + 1}`} />
              <p>{`Приоритет ${index + 1}`}</p>
              <CustomSelect
                value={formData.priorities[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                options={[
                  { value: 'Первый', label: 'Первый приоритет' },
                  { value: 'Второй', label: 'Второй приоритет' },
                  { value: 'Третий', label: 'Третий приоритет' },
                  { value: 'Четвертый', label: 'Четвертый приоритет' },
                  { value: 'Пятый', label: 'Пятый приоритет' },
                  { value: 'Шестой', label: 'Шестой приоритет' },
                ]}
              />
              {errors[`priority${index + 1}`] && <span className="error">{errors[`priority${index + 1}`]}</span>}
            </div>
          ))}
        </div>
        <div className="phone-input">
          <label>Телефон</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+7(900)777-14-88"
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <p>Бандиты -- древнейшая фракция Дикого запада. Занимаются разбоями. <br/>
Они имеют уважение у мафии и не имеют у мирных жителей</p>
        <button 
          type="submit" 
          style={{ marginTop: '20px', backgroundColor: isFormValid ? '#E7E2FF' : 'rgb(255, 255, 255, 0.4)' }}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default CastesForm;