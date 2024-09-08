import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import castes1 from '../assets/images/castes1.png'; 
import castes2 from '../assets/images/castes2.png'; 
import castes3 from '../assets/images/castes3.png'; 
import castes4 from '../assets/images/castes4.png'; 
import castes5 from '../assets/images/castes5.png'; 
import castes6 from '../assets/images/castes6.png'; 
import { useNavigate } from 'react-router-dom';

const CastesForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    smugglers: 'Первый',
    scorpions: 'Второй',
    ghosts: 'Третий',
    traders: 'Четвертый',
    deputy_marshals: 'Пятый',
    deputy_sheriff: 'Шестой',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    const phoneRegex = /^(?:\+7|8)\d{10}$|^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

    if (field === 'phone') {
      if (!value) {
        newErrors.phone = "Обязательное поле";
      } else if (!phoneRegex.test(value)) {
        newErrors.phone = "Неверный формат";
      } else {
        delete newErrors.phone;
      }
    }

    if (['smugglers', 'scorpions', 'ghosts', 'traders', 'deputy_marshals', 'deputy_sheriff'].includes(field)) {
      const priorityValues = Object.values(formData);
      
      const updatedPriorityValues = priorityValues.map((val, index) => 
        index === Object.keys(formData).indexOf(field) ? value : val
      );

      for (let i = 0; i < 6; i++) {
        delete newErrors[Object.keys(formData)[i]];
      }

      const duplicateCount = updatedPriorityValues.filter(v => v === value).length;
      const duplicateIndices = updatedPriorityValues.map((val, index) => (val === value ? index : null)).filter(index => index !== null);
      const duplicatedInd = [];
      for (let i = 0; i < updatedPriorityValues.length; i++) {
        const currentValue = updatedPriorityValues[i];
        const duplicateIndices = updatedPriorityValues.map((val, index) => (val === currentValue ? index : null)).filter(index => index !== null);
        if (duplicateIndices.length > 1){
          duplicateIndices.forEach(index => {
            newErrors[Object.keys(formData)[index]] = `Повторяющийся приоритет`;
          });
        }
      }
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
            smugglers: formData.smugglers,
            scorpions: formData.scorpions,
            ghosts: formData.ghosts,
            traders: formData.traders,
            deputy_marshals: formData.deputy_marshals,
            deputy_sheriff: formData.deputy_sheriff,
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
            <img src={castes1} alt="См smugglers" />
            <p>В тени ночного сумрака они предлагают товар, который не найдешь в салонах.</p>
            <CustomSelect
              value={formData.smugglers}
              onChange={handleChange}
              name="smugglers"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.smugglers && <span className="error">{errors.smugglers}</span>}
          </div>
          <div className="priority-box">
            <img src={castes2} alt="Скorpions" />
            <p>Новая волна, жаждущая власти. Скорпионы не терпят слабости, их амбиции и численость растут с каждым днем.</p>
            <CustomSelect
              value={formData.scorpions}
              onChange={handleChange}
              name="scorpions"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.scorpions && <span className="error">{errors.scorpions}</span>}
          </div>

          <div className="priority-box">
            <img src={castes3} alt="Призраки" />
            <p>Хозяева города, их имя внушает страх. Влиятельные, безжалостные бандиты. Пересечь им дорогу – подписать себе смертный приговор.</p>
            <CustomSelect
              value={formData.ghosts}
              onChange={handleChange}
              name="ghosts"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.ghosts && <span className="error">{errors.ghosts}</span>}
          </div>

          <div className="priority-box">
            <img src={castes4} alt="Торговцы" />
            <p>Беспрекословные исполнители, олицетворяющие дисциплину. Глаза и руки Маршала.</p>
            <CustomSelect
              value={formData.traders}
              onChange={handleChange}
              name="traders"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.traders && <span className="error">{errors.traders}</span>}
          </div>

          <div className="priority-box">
            <img src={castes5} alt="Заместители маршала" />
            <p>Блюстители закона, не пропускающие ни одну крысу. Лучшие из лучших, выбранные Шерифом лично.</p>
            <CustomSelect
              value={formData.deputy_marshals}
              onChange={handleChange}
              name="deputy_marshals"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.deputy_marshals && <span className="error">{errors.deputy_marshals}</span>}
          </div>

          <div className="priority-box">
            <img src={castes6} alt="Заместители шерифа" />
            <p>Честные работники, зарабатывающие на жизнь продавцами. Обеспечивают город всем необходимым, их цены острые, но справедливые.</p>
            <CustomSelect
              value={formData.deputy_sheriff}
              onChange={handleChange}
              name="deputy_sheriff"
              options={[
                { value: 'Первый', label: 'Первый (I)' },
                { value: 'Второй', label: 'Второй (II)' },
                { value: 'Третий', label: 'Третий (III)' },
                { value: 'Четвертый', label: 'Четвертый (IV)' },
                { value: 'Пятый', label: 'Пятый (V)' },
                { value: 'Шестой', label: 'Шестой (VI)' },
              ]}
            />
            {errors.deputy_sheriff && <span className="error">{errors.deputy_sheriff}</span>}
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