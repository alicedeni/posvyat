import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import castesImage from '../assets/images/castes.png'; 
import { useNavigate, useLocation } from 'react-router-dom';

const CastesForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    priority1: 'Первый',
    priority2: 'Второй',
    priority3: 'Третий',
    priority4: 'Четвертый',
    priority5: 'Пятый',
    priority6: 'Шестой',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    const phoneRegex = /^(?:\+7|8)\d{10}$|^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

    switch (field) {
      case 'phone':
        if (!value) {
          newErrors.phone = "Обязательное поле";
        } else if (!phoneRegex.test(value)) {
          newErrors.phone = "Неверный формат";
        } else {
          delete newErrors.phone;
        }
        break;
      case 'priority1':
        if (formData.priority2 === value || formData.priority3 === value || formData.priority4 === value || formData.priority5 === value || formData.priority6 === value) {
          newErrors.priority1 = `Приоритет уже выбран`;
        } else {
          delete newErrors.priority1;
        }
        break;
      case 'priority2':
        if (formData.priority1 === value || formData.priority3 === value || formData.priority4 === value || formData.priority5 === value || formData.priority6 === value) {
          newErrors.priority2 = `Приоритет уже выбран`;
        } else {
          delete newErrors.priority2;
        }
        break;
      case 'priority3':
        if (formData.priority1 === value || formData.priority2 === value || formData.priority4 === value || formData.priority5 === value || formData.priority6 === value) {
          newErrors.priority3 = `Приоритет уже выбран`;
        } else {
          delete newErrors.priority3;
        }
        break;
      case 'priority4':
        if (formData.priority1 === value || formData.priority2 === value || formData.priority3 === value || formData.priority5 === value || formData.priority6 === value) {
          newErrors.priority4 = `Приоритет "${value}" уже выбран`;
        } else {
          delete newErrors.priority4;
        }
        break;
      case 'priority5':
        if (formData.priority1 === value || formData.priority2 === value || formData.priority3 === value || formData.priority4 === value || formData.priority6 === value) {
          newErrors.priority5 = `Приоритет уже выбран`;
        } else {
          delete newErrors.priority5;
        }
        break;
      case 'priority6':
        if (formData.priority1 === value || formData.priority2 === value || formData.priority3 === value || formData.priority4 === value || formData.priority5 === value) {
          newErrors.priority6 = `Приоритет уже выбран`;
        } else {
          delete newErrors.priority6;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, phone: value });
    validateField('phone', value);
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
            priority1: formData.priority1,
            priority2: formData.priority2,
            priority3: formData.priority3,
            priority4: formData.priority4,
            priority5: formData.priority5,
            priority6: formData.priority6,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Response:', data);
          navigate('/');
        } else {
          console.error('Ошибка:', data);
          setErrors(data);
          if (data.phone) {
            setErrors({ ...errors, phoneExists: 'Пользователь с таким телефоном уже зарегистрирован' });
          } else if (data.error) {
            setErrors({ ...errors, phoneExists: 'Пользователь с таким телефоном не зарегистрирован' });
          }
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
        <p className="registration-form-text">Ваша задача расставить касты по приоритетам. От их выбора зависит квест основной программы, выбирайте сердцем, а не разумом</p>
        <div className="form-img">
          <div className="priority-box">
            <img src={castesImage} alt="Приоритет 1" />
            <p>В тени ночного сумрака они предлагают товар, который не найдешь в салонах.</p>
            <CustomSelect
              value={formData.priority1}
              onChange={handleChange}
              name="priority1"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.priority1 && <span className="error">{errors.priority1}</span>}
          </div>
          <div className="priority-box">
            <img src={castesImage} alt="Приоритет 2" />
            <p>Новая волна, жаждущая власти. Скорпионы не терпят слабости, их амбиции и численость растут с каждым днем.</p>
            <CustomSelect
              value={formData.priority2}
              onChange={handleChange}
              name="priority2"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.priority2 && <span className="error">{errors.priority2}</span>}
          </div>

          <div className="priority-box">
            <img src={castesImage} alt="Приоритет 3" />
            <p>Хозяева города, их имя внушает страх. Влиятельные, безжалостные бандиты. Пересечь им дорогу – подписать себе смертный приговор.</p>
            <CustomSelect
              value={formData.priority3}
              onChange={handleChange}
              name="priority3"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.priority3 && <span className="error">{errors.priority3}</span>}
          </div>

          <div className="priority-box">
            <img src={castesImage} alt="Приоритет 4" />
            <p>Беспрекословные исполнители, олицетворяющие дисциплину. Глаза и руки Маршала.</p>
            <CustomSelect
              value={formData.priority4}
              onChange={handleChange}
              name="priority4"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.priority4 && <span className="error">{errors.priority4}</span>}
          </div>

          <div className="priority-box">
            <img src={castesImage} alt="Приоритет 5" />
            <p>Блюстители закона, не пропускающие ни одну крысу. Лучшие из лучших, выбранные Шерифом лично.</p>
            <CustomSelect
              value={formData.priority5}
              onChange={handleChange}
              name="priority5"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.priority5 && <span className="error">{errors.priority5}</span>}
          </div>

          <div className="priority-box">
            <img src={castesImage} alt="Приоритет 6" />
            <p>Честные работники, зарабатывающие на жизнь продавцами. Обеспечивают город всем необходимым, их цены острые, но справедливые.</p>
            <CustomSelect
              value={formData.priority6}
              onChange={handleChange}
              name="priority6"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.priority6 && <span className="error">{errors.priority6}</span>}
          </div>
        </div>
        <div className='form-grid'>
          <div>
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+7(900)777-14-88"
              required
              style={{ borderColor: errors.phone ? '#FF673D' : (formData.phone ? 'white' : 'gray') }} 
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
            {errors.phoneExists && <span className="error">{errors.phoneExists}</span>}
          </div>
        </div>
        <p className="registration-form-text">Бандиты -- древнейшая фракция Дикого запада. Занимаются разбоями. <br/>
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