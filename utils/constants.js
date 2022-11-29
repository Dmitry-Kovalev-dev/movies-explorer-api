const SERV_ERROR = 500;
const CREATED = 201;
const mongoErrorCode = 11000;
const SECRET_KEY = 'secret-key';

const errMessages = {
  movieIdNotFound: 'Фильм с указанным id не найден',
  userIdNotFound: 'Пользователь с указанным _id не найден',
  idIncorrect: 'Передан некорректный _id',
  updateUserBadReq: 'Переданы некорректные данные при обновлении данных пользователя',
  unavailable: 'Ошибка доступа',
  emailConflict: 'Пользователь с таким email уже существует',
  unauthorized: 'Неправильные логин или пароль',
  authorizationErr: 'Необходима авторизация',
  serverError: 'На сервере произошла ошибка',
  incorrectUrl: 'Передан некорректный URL-адрес',
};

const messages = {
  saved: 'Фильм сохранен в избранное',
  deleted: 'Фильм удален из избранного',
  out: 'Выход из аккаунта произведен',
};

module.exports = {
  SERV_ERROR,
  CREATED,
  mongoErrorCode,
  SECRET_KEY,
  errMessages,
  messages,
};
