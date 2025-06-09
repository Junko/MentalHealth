// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    // User Type Selection
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Password Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Form Submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.email.value;
            const userType = document.querySelector('.user-type-btn.active').dataset.type;
            
            // Show loading
            const btnText = this.querySelector('.btn-text');
            const spinner = this.querySelector('.loading-spinner');
            btnText.style.display = 'none';
            spinner.style.display = 'block';
            
            // Simulate login
            setTimeout(() => {
                if (userType === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'employee-dashboard.html';
                }
            }, 1500);
        });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = this.password.value;
            const confirmPassword = this.confirmPassword.value;
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            
            const userType = document.querySelector('.user-type-btn.active').dataset.type;
            
            // Show loading
            const btnText = this.querySelector('.btn-text');
            const spinner = this.querySelector('.loading-spinner');
            btnText.style.display = 'none';
            spinner.style.display = 'block';
            
            // Simulate registration
            setTimeout(() => {
                if (userType === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'employee-dashboard.html';
                }
            }, 1500);
        });
    }
    
    // Course Filters
    const filterTabs = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            courseCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'completed' && card.classList.contains('completed')) {
                    card.style.display = 'block';
                } else if (filter === 'in-progress' && card.classList.contains('in-progress')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Module Navigation
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            moduleItems.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Update content based on module type
            updateModuleContent(index);
        });
    });
    
    // Complete Module Button
    const completeBtn = document.querySelector('.complete-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            const activeModule = document.querySelector('.module-item.active');
            if (activeModule) {
                activeModule.classList.add('completed');
                
                // Update icon
                const icon = activeModule.querySelector('.module-icon i');
                icon.className = 'fas fa-check-circle';
                
                // Update completion status
                const completionStatus = document.querySelector('.completion-status');
                if (completionStatus) {
                    completionStatus.innerHTML = '<i class="fas fa-check-circle"></i> Completado';
                }
                
                // Update progress
                updateProgress();
            }
        });
    }
    
    // Navigation buttons
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            const activeModule = document.querySelector('.module-item.active');
            const prevModule = activeModule.previousElementSibling;
            if (prevModule) {
                moduleItems.forEach(m => m.classList.remove('active'));
                prevModule.classList.add('active');
                updateModuleContent(Array.from(moduleItems).indexOf(prevModule));
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const activeModule = document.querySelector('.module-item.active');
            const nextModule = activeModule.nextElementSibling;
            if (nextModule) {
                moduleItems.forEach(m => m.classList.remove('active'));
                nextModule.classList.add('active');
                updateModuleContent(Array.from(moduleItems).indexOf(nextModule));
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Package card hover effects
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Update module content based on selection
function updateModuleContent(moduleIndex) {
    const modules = [
        {
            title: 'Introducción al Servicio al Cliente',
            type: 'Video',
            duration: '15 min',
            content: 'En este módulo aprenderá los conceptos básicos y la importancia del servicio al cliente en la empresa moderna.'
        },
        {
            title: 'Principios de la Comunicación Efectiva',
            type: 'Video',
            duration: '20 min',
            content: 'Técnicas de comunicación verbal y no verbal para mejorar la interacción con clientes.'
        },
        {
            title: 'Identificación de Necesidades del Cliente',
            type: 'Lectura',
            duration: '10 min',
            content: 'Estrategias para comprender y anticipar las necesidades de los clientes.'
        },
        {
            title: 'Manejo de Objeciones',
            type: 'Video',
            duration: '18 min',
            content: 'Cómo responder efectivamente a las objeciones y preocupaciones de los clientes.'
        },
        {
            title: 'Ejercicio Práctico: Simulación de Llamada',
            type: 'Ejercicio',
            duration: '30 min',
            content: 'Practique sus habilidades en un escenario simulado de atención al cliente.'
        },
        {
            title: 'Seguimiento Post-Venta',
            type: 'Video',
            duration: '12 min',
            content: 'Importancia del seguimiento y técnicas para mantener la satisfacción del cliente.'
        },
        {
            title: 'Evaluación de Conocimientos',
            type: 'Evaluación',
            duration: '15 min',
            content: 'Evaluación final para demostrar su comprensión de los conceptos aprendidos.'
        },
        {
            title: 'Certificación y Recursos Adicionales',
            type: 'Lectura',
            duration: '5 min',
            content: 'Obtenga su certificado y acceda a recursos adicionales para seguir aprendiendo.'
        }
    ];
    
    const module = modules[moduleIndex];
    if (module) {
        // Update module badge
        const moduleBadge = document.querySelector('.module-badge');
        if (moduleBadge) {
            const icon = module.type === 'Video' ? 'fa-video' : 
                        module.type === 'Lectura' ? 'fa-file-text' :
                        module.type === 'Ejercicio' ? 'fa-users' : 'fa-book-open';
            moduleBadge.innerHTML = `<i class="fas ${icon}"></i> ${module.type} • ${module.duration}`;
        }
        
        // Update title
        const contentTitle = document.querySelector('.content-header h2');
        if (contentTitle) {
            contentTitle.textContent = module.title;
        }
        
        // Update description
        const contentDescription = document.querySelector('.content-description p');
        if (contentDescription) {
            contentDescription.textContent = module.content;
        }
        
        // Update navigation buttons
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        
        if (prevBtn) {
            prevBtn.disabled = moduleIndex === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = moduleIndex === modules.length - 1;
        }
    }
}

// Update progress calculation
function updateProgress() {
    const totalModules = document.querySelectorAll('.module-item').length;
    const completedModules = document.querySelectorAll('.module-item.completed').length;
    const progress = Math.round((completedModules / totalModules) * 100);
    
    // Update progress bar
    const progressFill = document.querySelector('.course-progress .progress-fill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    
    // Update progress text
    const progressText = document.querySelector('.course-progress span');
    if (progressText) {
        progressText.textContent = `Progreso: ${progress}%`;
    }
    
    // Update sidebar progress
    const sidebarProgress = document.querySelector('.sidebar-header p');
    if (sidebarProgress) {
        sidebarProgress.textContent = `${completedModules}/${totalModules} completados`;
    }
}

// Initialize progress on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});

// Add loading animation to buttons
function addLoadingToButton(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Add click effects to interactive elements
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') || 
        e.target.classList.contains('btn-secondary') ||
        e.target.classList.contains('package-btn')) {
        
        // Add ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary, .btn-secondary, .package-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
