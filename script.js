const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        header.style.padding = '15px 0';
    } else {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        header.style.padding = '20px 0';
    }
});

document.querySelectorAll('.education-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
});

function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);
    
    function typing() {
        if (i < text.length) {
            cursor.remove();
            
            if (i === 9) {
                element.innerHTML = 'Hi, I\'m <span class="colored-name">';
            }
            
            if (i >= 9 && i < 16) {
                const nameSpan = element.querySelector('.colored-name');
                if (nameSpan) {
                    nameSpan.textContent += text.charAt(i);
                }
            } else {
                element.innerHTML += text.charAt(i);
            }
            
            if (i === 15) {
                element.innerHTML += '</span>';
            }
            
            element.appendChild(cursor);
            
            i++;
            setTimeout(typing, speed);
        } else {
            cursor.remove();
            if (callback) callback();
        }
    }
    
    typing();
}

function typeWriterSecondLine() {
    const secondLine = document.querySelector('.typing-line-2');
    if (!secondLine) return;
    
    const text = "Python Full-Stack Developer";
    let i = 0;
    secondLine.innerHTML = '';
    secondLine.style.opacity = 1;
    
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    secondLine.appendChild(cursor);
    
    function typing() {
        if (i < text.length) {
            cursor.remove();
            secondLine.innerHTML += text.charAt(i);
            secondLine.appendChild(cursor);
            i++;
            setTimeout(typing, 80);
        } else {
            cursor.remove();
        }
    }
    
    typing();
}

window.addEventListener('DOMContentLoaded', (event) => {
    const heroTitle = document.querySelector('.typing-line-1');
    const secondLine = document.querySelector('.typing-line-2');
    
    if (heroTitle && secondLine) {
        secondLine.style.opacity = 0;
        const text = "Hi, I'am Muhilan Elangovan";
        typeWriter(heroTitle, text, 120, typeWriterSecondLine);
    }
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.image-container');
    
    if (hero && heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px) perspective(1000px) rotateY(-5deg) rotateX(5deg)`;
    }
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('flipped')) {
                    this.classList.add('flipped');
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (this.classList.contains('flipped')) {
                    this.classList.remove('flipped');
                }
            });
        }
    });
    
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.1 });
    
    educationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        educationObserver.observe(card);
    });
});

function initExperienceAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const typingElements = document.querySelectorAll('.typing-text');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const typingElement = entry.target.querySelector('.typing-text');
                if (typingElement && !typingElement.classList.contains('typing-complete')) {
                    startTypingAnimation(typingElement);
                }
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    function startTypingAnimation(element) {
        const text = element.getAttribute('data-text');
        let index = 0;
        let currentText = '';
        const speed = 20;
        const pauseDuration = 1000;

        element.textContent = '';

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    currentText += text.charAt(index);
                    element.textContent = currentText;
                    element.innerHTML = currentText + '<span style="color: var(--primary); animation: blink 1s infinite;">|</span>';
                    index++;
                } else {
                    clearInterval(typeInterval);
                    element.classList.add('typing-complete');
                    element.innerHTML = currentText;
                }
            }, speed);
        }, pauseDuration);
    }

    typingElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            startTypingAnimation(element);
        }
    });
}

function initSummaryTyping() {
    const summaryElements = document.querySelectorAll('.typing-summary');
    
    const summaryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('typing-complete')) {
                setTimeout(() => {
                    startSummaryTyping(entry.target);
                }, index * 800);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    summaryElements.forEach(element => {
        summaryObserver.observe(element);
    });

    function startSummaryTyping(element) {
        const text = element.getAttribute('data-text');
        let index = 0;
        let currentText = '';
        const speed = 25;
        const pauseDuration = 300;

        element.classList.add('typing-active');

        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    currentText += text.charAt(index);
                    element.textContent = currentText;
                    element.innerHTML = currentText + '<span style="color: var(--primary); animation: blink 1s infinite;">|</span>';
                    index++;
                } else {
                    clearInterval(typeInterval);
                    element.classList.add('typing-complete');
                    element.classList.remove('typing-active');
                    element.innerHTML = currentText;
                }
            }, speed);
        }, pauseDuration);
    }

    summaryElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setTimeout(() => {
                startSummaryTyping(element);
            }, index * 800);
        }
    });
}

function initProjectsAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const expertiseSection = document.querySelector('.expertise-section');
    
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const expertiseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    projectCards.forEach(card => {
        projectsObserver.observe(card);
    });

    if (expertiseSection) {
        expertiseSection.style.opacity = '0';
        expertiseSection.style.transform = 'translateY(30px)';
        expertiseSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        expertiseObserver.observe(expertiseSection);
    }
}

function initContactAnimations() {
    const contactSection = document.getElementById('contact');
    
    function createFloatingElements() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;
        
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            contactSection.appendChild(element);
        }
    }

    createFloatingElements();
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contactItems = document.querySelectorAll('.contact-item');
                const socialLinks = document.querySelectorAll('.social-link');
                
                contactItems.forEach((item, index) => {
                    item.style.animation = `slideInLeft 0.8s ease ${index * 0.2 + 0.2}s forwards`;
                });
                
                socialLinks.forEach((link, index) => {
                    link.style.animation = `slideInRight 0.8s ease ${index * 0.2 + 0.5}s forwards`;
                });
            }
        });
    }, { threshold: 0.3 });

    if (contactSection) {
        contactObserver.observe(contactSection);
    }
}

window.addEventListener('resize', function() {
    const typingElements = document.querySelectorAll('.typing-text:not(.typing-complete)');
    typingElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            startTypingAnimation(element);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initExperienceAnimations();
    initSummaryTyping();
    initProjectsAnimations();
    initContactAnimations();
});