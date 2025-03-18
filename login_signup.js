// Get elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const openLoginBtn = document.getElementById('open-login-btn');
const openSignupBtn = document.getElementById('open-signup-btn');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const closeButtons = document.querySelectorAll('.close-btn');

// Open modals
openLoginBtn.addEventListener('click', () => loginModal.style.display = 'block');
openSignupBtn.addEventListener('click', () => signupModal.style.display = 'block');

// Close modals
closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.getAttribute('data-modal');
    document.getElementById(modal).style.display = 'none';
  });
});

// Switch between modals
switchToSignup.addEventListener('click', () => {
  loginModal.style.display = 'none';
  signupModal.style.display = 'block';
});

switchToLogin.addEventListener('click', () => {
  signupModal.style.display = 'none';
  loginModal.style.display = 'block';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});
