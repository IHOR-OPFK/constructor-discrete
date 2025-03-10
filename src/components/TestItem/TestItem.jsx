import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TestItem.scss';
import atveti from "../../../answers.json";
import roboti from "../../../TESTS.json";
import ch from "classnames";

const SORT_FIELD_NUMBER = "studentNumber";
const SORT_FIELD_GROUP = "group";

export const TestItem = () => {
  const { id } = useParams();
  const test = roboti.find((test) => test.id === Number(id));
  const [visibleAnswers, setVisibleAnswers] = useState([]);
  const [sortField, setSortField] = useState('');
  const [query, setQuery] = useState('');

  // Функция для сортировки
  const sortAnswers = (answers, field) => {
    if (field === SORT_FIELD_NUMBER) {
      return [...answers].sort((a, b) => a.studentNumber - b.studentNumber);
    }
    if (field === SORT_FIELD_GROUP) {
      return [...answers].sort((a, b) => a.group.localeCompare(b.group));
    }
    return answers;
  };

  // Сброс фильтра и сортировки
  const reset = () => {
    if (test) {
      const relatedAnswers = atveti.filter((answer) => answer["id-test"] === test.id);
      setVisibleAnswers(relatedAnswers);
    }
    setSortField('');
    setQuery('');
  };

  // Сортировка по номеру студента
  const sortByNumber = () => {
    if (sortField === SORT_FIELD_NUMBER) {
      reset();
    } else {
      setSortField(SORT_FIELD_NUMBER);
      setVisibleAnswers(sortAnswers(visibleAnswers, SORT_FIELD_NUMBER));
    }
  };

  // Сортировка по группе
  const sortByGroup = () => {
    if (sortField === SORT_FIELD_GROUP) {
      reset();
    } else {
      setSortField(SORT_FIELD_GROUP);
      setVisibleAnswers(sortAnswers(visibleAnswers, SORT_FIELD_GROUP));
    }
  };

  // Фильтрация ответов
  const handleFilterChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const filteredAnswers = atveti.filter(
      (answer) =>
        answer.student.toLowerCase().includes(newQuery.toLowerCase()) &&
        answer["id-test"] === test.id
    );

    setVisibleAnswers(sortAnswers(filteredAnswers, sortField));
  };

  // Инициализация ответов для текущего теста
  useEffect(() => {
    if (test) {
      const relatedAnswers = atveti.filter((answer) => answer["id-test"] === test.id);
      setVisibleAnswers(relatedAnswers);
    }
  }, [test]);

  if (!test) {
    return <p>Тест не найден</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const back = useNavigate('');

  const handleBackButtonClick = () => {
    back("/");
  };

  return (
    <div className="test-item">
      <header className="header-test-item">
        <div className="buttons">
          <button type='button' className='goHome' onClick={handleBackButtonClick}>НАЗАД</button>
          <button type='button' className='goEdit' >РЕДАГУВАТИ</button>
          <button type='button' className='goDelete'>ВИДАЛИТИ</button>
        </div>
        <p>Номер роботи: {test.nomer}</p>
        <p>Назва роботи: {test.nazwa}</p>
        <p>Кількість робіт: {test.progress}</p>
        <p>Покликання на роботу: <a href={test.link}>{test.link}</a></p>
      </header>
      <div className="main-header-test-item">
        <span>Відсортувати:</span>
        <button
          onClick={sortByNumber}
          className={ch({ 'main-header-button': true, 'main-header-button-active': sortField === SORT_FIELD_NUMBER })}
        >
          По номеру
        </button>
        <button
          onClick={sortByGroup}
          className={ch({ 'main-header-button': true, 'main-header-button-active': sortField === SORT_FIELD_GROUP })}
        >
          По групі
        </button>
        <input
          value={query}
          onChange={handleFilterChange}
          autoFocus
          className="main-header-pole"
          type="text"
          placeholder="Пошук за ім'ям студента"
        />
        <button onClick={reset} className="main-header-button">Скинути</button>
      </div>
      <div className="main-list">
        {visibleAnswers.length > 0 ? (
          visibleAnswers.map((answer) => (
            <div key={answer["id-answer"]} className="main-block">
              <span className="main-block-number">{answer.studentNumber}</span>
              <span className="main-block-title">{answer.student}</span>
              <span className="main-block-group">{answer.group}</span>
              <span className="main-block-progress">Оцінка: ...</span>
            </div>
          ))
        ) : (
          <p>Ответы не найдены</p>
        )}
      </div>
    </div>
  );
};
