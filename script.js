/**
 * Birthday page — Mohnish Sir
 * Vanilla JS: landing, envelope, card, typewriter, music, confetti
 */
(function () {
  'use strict';

  var landing = document.getElementById('landing');
  var btnOpen = document.getElementById('btn-open');
  var envelopeScene = document.getElementById('envelope-scene');
  var envelope = document.getElementById('envelope');
  var cardScene = document.getElementById('card-scene');
  var btnMusic = document.getElementById('btn-music');
  var bgMusic = document.getElementById('bg-music');
  var confettiContainer = document.getElementById('confetti');

  var typewriterLines = [
    'Wishing you a very Happy Birthday, Mohnish Sir!🥳',
    'May this year bring you joy, health and success.',
    'Cheers to many more wonderful years!'
  ];
  var lineIds = ['line1', 'line2', 'line3', 'line4'];

  /**
   * Hide landing, show envelope scene, start music (after user gesture)
   */
  function openLanding() {
    if (!landing || !envelopeScene) return;
    landing.classList.add('hidden');
    envelopeScene.classList.add('active');
    try {
      if (bgMusic) {
        bgMusic.play().catch(function () {});
      }
    } catch (e) {}
  }

  /**
   * Open envelope then reveal card with confetti and typewriter
   */
  function openEnvelope() {
    if (!envelope || !cardScene) return;
    envelope.classList.add('open');
    envelope.style.pointerEvents = 'none';

    setTimeout(function () {
      envelopeScene.classList.remove('active');
      cardScene.classList.add('active');
      burstConfetti();
      startTypewriter();
    }, 1400);
  }

  /**
   * Create and animate confetti particles
   */
  function burstConfetti() {
    if (!confettiContainer) return;
    var colors = ['#ff6b9d', '#74b9ff', '#ffeaa7', '#a29bfe', '#fd79a8', '#81ecec', '#fab1a0', '#55efc4', '#fdcb6e', '#e84393'];
    var count = 35;

    for (var i = 0; i < count; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.8 + 's';
      piece.style.animationDuration = (3.5 + Math.random() * 1.5) + 's';
      piece.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      confettiContainer.appendChild(piece);

      setTimeout(function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 5500, piece);
    }
  }

  /**
   * Typewriter: print message line by line with blinking cursor
   */
  function startTypewriter() {
    var cursor = document.querySelector('.typewriter-cursor');
    var lineIndex = 0;
    var charIndex = 0;
    var lineEl;

    function typeNext() {
      if (lineIndex >= typewriterLines.length) {
        if (cursor) cursor.classList.add('hidden');
        return;
      }

      lineEl = document.getElementById(lineIds[lineIndex]);
      if (!lineEl) {
        lineIndex++;
        setTimeout(typeNext, 400);
        return;
      }

      var line = typewriterLines[lineIndex];
      lineEl.classList.add('visible');
      lineEl.innerHTML = '';

      function addChar() {
        if (charIndex < line.length) {
          var span = document.createElement('span');
          span.className = 'char';
          span.textContent = line[charIndex];
          lineEl.appendChild(span);
          charIndex++;
          setTimeout(addChar, 60);
        } else {
          charIndex = 0;
          lineIndex++;
          setTimeout(typeNext, 500);
        }
      }

      addChar();
    }

    setTimeout(typeNext, 400);
  }

  /**
   * Toggle music mute
   */
  function toggleMusic() {
    if (!bgMusic || !btnMusic) return;
    bgMusic.muted = !bgMusic.muted;
    btnMusic.classList.toggle('muted', bgMusic.muted);
  }

  // Event listeners
  if (btnOpen) btnOpen.addEventListener('click', openLanding);
  if (envelope) envelope.addEventListener('click', openEnvelope);
  if (btnMusic) btnMusic.addEventListener('click', toggleMusic);

  // Initial music state: unmuted; play starts on "Tap to Open" (user gesture)
  if (bgMusic) bgMusic.muted = false;
  if (btnMusic) btnMusic.classList.remove('muted');
})();
