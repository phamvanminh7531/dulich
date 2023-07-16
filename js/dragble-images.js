document.addEventListener('DOMContentLoaded', function() {
  const sliderItems = document.querySelectorAll('.slider__item');
  const sliderControlPrev = document.querySelector('.slider__control.prev');
  const sliderControlNext = document.querySelector('.slider__control.next');

  sliderControlPrev.addEventListener('click', function() {
      const currentImage = document.querySelector('.slider__item.active img');
      const prevImage = currentImage.parentNode.previousElementSibling
          ? currentImage.parentNode.previousElementSibling.querySelector('img')
          : sliderItems[sliderItems.length - 1].querySelector('img');
      currentImage.classList.remove('active');
      prevImage.classList.add('active');
  });

  sliderControlNext.addEventListener('click', function() {
      const currentImage = document.querySelector('.slider__item.active img');
      const nextImage = currentImage.parentNode.nextElementSibling
          ? currentImage.parentNode.nextElementSibling.querySelector('img')
          : sliderItems[0].querySelector('img');
      currentImage.classList.remove('active');
      nextImage.classList.add('active');
  });

  sliderItems.forEach(function(item) {
      item.addEventListener('click', function() {
          const currentImage = document.querySelector('.slider__item.active img');
          const clickedImage = this.querySelector('img');
          currentImage.classList.remove('active');
          clickedImage.classList.add('active');
      });
  });

  const sliders = [...document.querySelectorAll('.slider__container')];
  const sliderControlPrevArr = [...document.querySelectorAll('.slider__control.prev')];
  const sliderControlNextArr = [...document.querySelectorAll('.slider__control.next')];

  sliders.forEach((slider, i) => {
      let isDragStart = false,
          isDragging = false,
          isSlide = false,
          prevPageX,
          prevScrollLeft,
          positionDiff;

      const sliderItem = slider.querySelector('.slider__item');
      const isMultislide = slider.dataset.multislide === 'true';

      sliderControlPrevArr[i].addEventListener('click', () => {
          if (isSlide) return;
          isSlide = true;
          const slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
          slider.scrollLeft += -slideWidth;
          setTimeout(function() {
              isSlide = false;
          }, 700);
      });

      sliderControlNextArr[i].addEventListener('click', () => {
          if (isSlide) return;
          isSlide = true;
          const slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
          slider.scrollLeft += slideWidth;
          setTimeout(function() {
              isSlide = false;
          }, 700);
      });

      function autoSlide() {
          if (slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0)
              return;
          positionDiff = Math.abs(positionDiff);
          const slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
          const valDifference = slideWidth - positionDiff;
          if (slider.scrollLeft > prevScrollLeft) {
              return (slider.scrollLeft += positionDiff > slideWidth / 5 ? valDifference : -positionDiff);
          }
          slider.scrollLeft -= positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
      }

      function dragStart(e) {
          if (isSlide) return;
          isSlide = true;
          isDragStart = true;
          prevPageX = e.pageX || e.touches[0].pageX;
          prevScrollLeft = slider.scrollLeft;
          setTimeout(function() {
              isSlide = false;
          }, 700);
      }

      function dragging(e) {
          if (!isDragStart) return;
          e.preventDefault();
          isDragging = true;
          slider.classList.add('dragging');
          positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
          slider.scrollLeft = prevScrollLeft - positionDiff;
      }

      function dragStop() {
          isDragStart = false;
          slider.classList.remove('dragging');
          if (!isDragging) return;
          isDragging = false;
          autoSlide();
      }

      addEventListener('resize', autoSlide);
      slider.addEventListener('mousedown', dragStart);
      slider.addEventListener('touchstart', dragStart);
      slider.addEventListener('mousemove', dragging);
      slider.addEventListener('touchmove', dragging);
      slider.addEventListener('mouseup', dragStop);
      slider.addEventListener('touchend', dragStop);
      slider.addEventListener('mouseleave', dragStop);
  });
});