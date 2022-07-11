import { getRandomeInInclusie, getRandomArrayElement} from './util.js';

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
const COMMENDIDLIST = Array.from({length:40}, (v,k)=> ++k).sort();


const createComment = () => ({
  id: COMMENDIDLIST.shift(),
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
    comments: Array.from({length: getRandomeInInclusie(1,8)}, createComment),
  };
  return description;
};

const mockPhotos = Array.from({length:25}, createDescription);
export {mockPhotos};