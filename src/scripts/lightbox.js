const triggers =
  document.querySelectorAll(
    '.lightbox-trigger'
  );

const lightbox =
  document.getElementById('lightbox');

const lightboxImage =
  document.getElementById('lightboxImage');

const closeButton =
  document.getElementById('closeLightbox');

if (
  triggers.length &&
  lightbox &&
  lightboxImage &&
  closeButton
) {

  triggers.forEach((trigger) => {

    trigger.addEventListener('click', () => {

      lightboxImage.src =
        trigger.currentSrc || trigger.src;

      lightboxImage.alt =
        trigger.alt;

      lightbox.classList.add('active');

      document.body.style.overflow =
        'hidden';

    });

  });

  function closeLightbox() {

    lightbox.classList.remove('active');

    document.body.style.overflow =
      '';

  }

  closeButton.addEventListener(
    'click',
    closeLightbox
  );

  lightbox.addEventListener(
    'click',
    (e) => {

      if (e.target === lightbox) {

        closeLightbox();

      }

    }
  );

}