'use strict';

let data = []
let commentsRandom = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']

let photoDescription = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...',
'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!']
let names = ['Илья', 'Никита', 'Дарья', 'Кирилл', 'Мария', 'Елена']
var quantity = 25

var getRandomNumber = function(min, max) {
  return Math.floor((Math.random() * (max - min + min) + min))
}

getRandomNumber()

var getPhoto = function (quantity) {
  var photos = []
  var comments = []

  for(var i = 0; i < quantity; i++) {
    var url = getRandomNumber(1, 25)
    var likes = getRandomNumber(15, 200)
    var avatar = getRandomNumber(1, 6)

    var photo = {
      avatar: `img/avatar-${avatar}.svg`,
      message: commentsRandom[getRandomNumber(0, commentsRandom.length - 1)],
      name: names[getRandomNumber(0, names.length - 1)]
    }

    var comment = {
      url: `photos/${url}.jpg`,
      likes: likes,
      comments: commentsRandom[getRandomNumber(0, commentsRandom.length - 1)],
      description: photoDescription[getRandomNumber(0, photoDescription.length - 1)]
    }

    photos.push(photo)
    comments.push(comment)

  }
  return photos
}

var photoList = getPhoto(quantity)

var template = document.querySelector('#picture').content.querySelector('.picture')
var fragment = document.createDocumentFragment();
var picturesWrapper = document.querySelector('.pictures')

photoList.forEach(function (photo) {
  var photoElement = template.cloneNode(true)

  photoElement.querySelector('.picture__img').setAttribute('src', photo.avatar)
  photoElement.querySelector('.picture__comments').textContent = photo.comments
  photoElement.querySelector('.picture__likes').textContent = photo.likes

  fragment.appendChild(photoElement)
})

picturesWrapper.appendChild(fragment)

//появление окна редактирования изображения после загрузки изображения, закрытие окна по Esc
let fileInput = document.querySelector('#upload-file')
let imageUpload = document.querySelector('.img-upload__overlay')
let closeEditImage = document.querySelector('#upload-cancel')

let onPopupEscPress = function(evt) {
  if(evt.key === 'Escape') {
    hiddenEditImage()
  }
}

fileInput.addEventListener('change', function(e) {
  showEditImage()
})

closeEditImage.addEventListener('click', function() {
  hiddenEditImage()
})

function showEditImage () {
  imageUpload.classList.remove('hidden')
  document.body.classList.add('modal-open')

  document.addEventListener('keydown', onPopupEscPress)
}

function hiddenEditImage () {
  imageUpload.classList.add('hidden')
  document.body.classList.remove('modal-open')
  fileInput.value = ''

  document.removeEventListener('keydown', onPopupEscPress)
}


//наложение эффекта на изображение
let effectsPin = document.querySelector('.effect-level__pin')
let imgUploadForm = document.querySelector('.img-upload__form')
let photoContainer = document.querySelector('.img-upload__preview')
let photoPreview = photoContainer.querySelector('img')

let onChangeFilter = function(evt) {
  let buttonEffect = evt.target.getAttribute('id')
  if(buttonEffect === 'effect-chrome') {
    photoPreview.classList.add('effects__preview--chrome')
  } else if(buttonEffect === 'effect-sepia') {
    photoPreview.classList.add('effects__preview--sepia')
  } else if(buttonEffect === 'effect-marvin') {
    photoPreview.classList.add('effects__preview--marvin')
  } else if(buttonEffect === 'effect-phobos') {
    photoPreview.classList.add('effects__preview--phobos')
  } else if(buttonEffect === 'effect-heat') {
    photoPreview.classList.add('effects__preview--heat')
  } else {
    photoPreview.className = ''
  }
}

imgUploadForm.addEventListener('change', function(evt) {
  if(evt.target && evt.target.matches('input[type="radio"]')) {
    photoPreview.className = ''
    onChangeFilter(evt)
  }
})

//регулирование интенсивности фильтра
let effectLevelPin = document.querySelector('.effect-level__pin')
//effect-level__pin - сюда записать значение

let onChangeFilterLevel = function(evt) {

}

effectLevelPin.addEventListener('mouseup', function(evt) {
  onChangeFilter()
})
