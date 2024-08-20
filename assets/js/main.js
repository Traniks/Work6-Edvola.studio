(function ($) {

	"use strict";

	// TYPEWRITE
	var TxtType = function (el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 15) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function () {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		var that = this;
		var delta = 200 - Math.random() * 100;

		if (this.isDeleting) { delta /= 2; }

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	};

	window.onload = function () {
		var elements = document.getElementsByClassName('typewrite');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #ffffff}";
		document.body.appendChild(css);
	};

	$('.js-slider-reviews').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		dots: true,
		arrows: false,
	});

	$('.js-slider-clients').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		dots: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.js-portfoli-items').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		fade: true,
		speed: 0,
		dots: true,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					arrows: false,
				}
			},

		]
	});
	//Скачок у попапа
	const popupWrapper = document.querySelectorAll('.popup__wrapper');
	const body = document.body;
	let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	let marginOffset = document.body.offsetWidth - window.innerWidth + 'px';
	window.addEventListener("load", function () {
		setTimeout(
			function open(event) {
				//  document.querySelector(".popup").style.display = "block";
				document.querySelector(".popup").classList.add('popup__open');
				body.classList.add('lock');
				// убрать скрол
				document.body.style.paddingRight = paddingOffset;
				//убрать скрол для фикс-блока
				fixBlock.forEach((el) => {
					el.style.paddingRight = paddingOffset;
				})
				//Скачок у попапа
				popupWrapper.forEach((el) => {
					el.style.marginLeft = marginOffset;
				})
			},
			15000
		)
	});


	//  document.querySelector(".popup__close").addEventListener("click", function(){
	//    //   document.querySelector(".popup").style.display = "none";
	// 	document.querySelector(".popup").classList.remove('popup__open');
	// 	body.classList.remove('lock');
	//  });

})(jQuery);

//popup
const popups = document.querySelectorAll('.popup');
const popupButton = document.querySelectorAll('.popup__close');
const body = document.body;
//Скачок у попапа
const popupWrapper = document.querySelectorAll('.popup__wrapper');
//убрать скрол для фикс-блока
const fixBlock = document.querySelectorAll('.fix-block');//класс для фиксблоков
// убрать скрол
let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
let marginOffset = document.body.offsetWidth - window.innerWidth + 'px';

function openPopup(elem) {
	elem.classList.add('popup__open');
	body.classList.add('lock');
	// убрать скрол
	document.body.style.paddingRight = paddingOffset;
	//убрать скрол для фикс-блока
	fixBlock.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	})
	//Скачок у попапа
	popupWrapper.forEach((el) => {
		el.style.marginLeft = marginOffset;
	})
}

//закрытие
function closePopup(e) {
	if (e.target.classList.contains('popup__close') || e.target.closest('.popup__close') || e.target.classList.contains('popup__wrapper')) {
		e.target.closest('.popup').classList.remove('popup__open');
		body.classList.remove('lock');
		// Вернуть скрол
		document.body.style.paddingRight = '0px';
		//убрать скрол для фикс-блока
		fixBlock.forEach((el) => {
			el.style.paddingRight = '0px';

		});
		//Скачок у попапа
		popupWrapper.forEach((el) => {
			el.style.marginLeft = 'auto';

		})
	}
}

//открытие попапа
popupButton.forEach(btn => {
	btn.addEventListener('click', (e) => {
		let data = e.target.dataset.popupOpen;

		popups.forEach(popup => {
			if (popup.dataset.popup == data || popup.dataset.popup == e.target.closest('.popup__close').dataset.popupOpen) {
				openPopup(popup);
			}
		})
	})
})

popups.forEach(popup => {
	popup.addEventListener('click', e => closePopup(e))
})


//languages-mobile
const lang = document.querySelector('.languages-mobile__item-active');
const other = document.querySelector('.languages-mobile__other');
if (lang) {
	lang.addEventListener("click", function (e) {
		other.classList.toggle('languages-mobile__other-active');
	});
}


//accordion
const question = document.querySelectorAll('.accordion-faq__question');
const answet = document.querySelectorAll('.accordion-faq__answet');

question.forEach(item => item.addEventListener('click', () => {
	const activeAnswet = document.querySelector('#' + item.dataset.tab);

	if (activeAnswet.classList.contains('active')) {
		activeAnswet.classList.remove('active');
		item.classList.remove('active');
		activeAnswet.style.maxHeight = 0;
	} else {
		answet.forEach(element => {
			element.classList.remove('active');
			element.style.maxHeight = 0;
		});

		question.forEach(element => element.classList.remove('active'));

		item.classList.add('active');
		activeAnswet.classList.add('active');
		activeAnswet.style.maxHeight = activeAnswet.scrollHeight + 'px';
	}
}))

document.querySelector('[data-tab="tab-1"]').classList.add('active');
document.querySelector('#tab-1').classList.add('active');
document.querySelector('#tab-1').style.maxHeight = document.querySelector('#tab-1').scrollHeight + 'px';
//accordion-end