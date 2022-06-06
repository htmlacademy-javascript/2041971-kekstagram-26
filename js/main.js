const DESCRIPTION = [
  'В прекрасном настроении',
  'Люблю гулять',
  'Можно и отдохнуть',
  'Работа не волк, в лес не убежит',
  'Хорошо',
  'Можно мне еще?',
  'Тренирую силу воли',
  'Не выспался',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Артем',
  'Светлана',
  'Игорь',
  'Татьяна',
  'Андрей',
];
const IDLIST = Array.from({length:25}, (v,k)=> ++k).sort();

const getRandomeInInclusie = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return new Error ('Аргументы не соответствуют задаче');
};

const checkMaxStrLength = (str, maxLenght) => typeof str !== 'string' ? new Error ('Не корректный ввод') : str.length <= maxLenght;
checkMaxStrLength('larisa', 10);

const getRandomArrayElement = (elements) => elements[getRandomeInInclusie(0, elements.length - 1)];


const createComment = () => ({
  id: this.id,
  avatar: `img/avatar-${getRandomeInInclusie(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createDescription = () => {
  const id = IDLIST.shift();
  const description = {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomeInInclusie(15,200),
    comments: [createComment(), createComment()],
  };
  return description;
};

const getMockPhotos = () => {
  const photos =[];
  for (let i=1; i<=25; i++){
    photos.push(createDescription(i));
  }
  return photos;
};
window.console.log(getMockPhotos());
