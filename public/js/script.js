// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-toggle i');

// Check for saved theme preference or use dark as default
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Apply the saved theme on page load
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Toggle theme when the button is clicked
themeToggle.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update the theme
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update the icon
    updateThemeIcon(newTheme);
});

// Function to update the theme icon
function updateThemeIcon(theme) {
    // This is the key part - make sure the icon matches the current theme
    // Moon icon for dark mode, Sun icon for light mode
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollPosition = window.scrollY;
    
    // Add scrolled class when user scrolls past 100px
    if (scrollPosition > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const projectButtons = document.querySelectorAll('.view-details');
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
  
    // Project details object
const projectDetails = {
    'bank-marketing': {
      title: 'Bank Marketing Campaign Prediction',
      description: 'Predictive analysis project to forecast client term deposit subscriptions based on banking campaign data.',
      achievements: [
        'Built a machine learning model to predict client subscription to term deposits, achieving 79.5% accuracy with a Gradient Boosting Classifier.',
        'Identified key features (e.g., Consumer Price Index, Euribor 3-month Rate) to enhance campaign efficiency and focus on high-potential clients.',
        'Utilized Python (Pandas, NumPy, Scikit-learn) and Google Colab for data analysis, visualization, and model training.'
      ],
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Google Colab']
    },
    'credit-fraud': {
      title: 'Credit Card Fraud Detection',
      description: 'End-to-end machine learning project to identify fraudulent credit card transactions using Kaggle\'s dataset.',
      achievements: [
        'Built Models: Logistic Regression, Random Forest, Gradient Boosting, and SVM, prioritizing Precision and F1-Score due to class imbalance.',
        'Techniques Used: Applied SMOTE for oversampling, feature scaling, and PCA-based feature extraction to enhance model performance.',
        'Results: Achieved 99.81% accuracy with Decision Tree Classifier using oversampling, ensuring robust fraud detection.'
      ],
      technologies: ['Python', 'SMOTE', 'PCA', 'Scikit-learn', 'Pandas', 'NumPy']
    },
    'dog-breed': {
      title: 'Dog Breed Identification Project',
      description: 'Deep learning project to classify dog breeds using images from Kaggle\'s dataset.',
      achievements: [
        'Model: Built a Convolutional Neural Network (CNN) using TensorFlow, trained on labeled images with 80% for training and 20% for validation.',
        'Evaluation: Used Google GPU resources for model training, monitored performance, and visualized results with Matplotlib to track accuracy and loss.',
        'Results: Achieved 99.87% accuracy, visualized predictions with color-coded probabilities (green for correct, red for incorrect).'
      ],
      technologies: ['TensorFlow', 'CNN', 'Python', 'Matplotlib', 'Google GPU']
    },
    'riscv': {
      title: 'RISCV-Assembler',
      description: 'Created a RISC-V assembler in CS-204 course which can execute assembly language.',
      achievements: [
        'Developed a functional RISC-V assembler capable of executing assembly language instructions.',
        'Implemented various optimization methods including different branch predictor methods (always taken, always not taken, one bit dynamic, and two bit dynamic).',
        'Created mainly using C++ programming language as part of the CS-204 course curriculum.'
      ],
      technologies: ['C++', 'Assembly', 'RISC-V', 'Branch Prediction']
    },
    'journal': {
      title: 'Daily Journal',
      description: 'A blogging web app created using NodeJs and MongoDB.',
      achievements: [
        'Developed a full-featured blogging platform with user authentication and content management.',
        'Implemented an authorization system with register and login functionality required to compose blogs.',
        'Created the authorization using the Passport.js module for secure user authentication.',
        'Built with Node.js backend and MongoDB database for efficient data storage and retrieval.'
      ],
      technologies: ['Node.js', 'MongoDB', 'Passport.js', 'Express', 'JavaScript']
    }
  };
  
  
    projectButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
          modalContent.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <h3>Key Achievements:</h3>
            <ul>
              ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
            <h3>Technologies Used:</h3>
            <div class="tech-stack">
              ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
          `;
          modal.style.display = 'block';
        }
      });
    });
  
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Change button state to loading
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        try {
            // Send data to server
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = response.ok ? 'notification success' : 'notification error';
            notification.textContent = result.message;
            
            // Add notification to the page
            document.querySelector('.contact-form').appendChild(notification);
            
            // Reset form if successful
            if (response.ok) {
                contactForm.reset();
                
                // Remove notification after 5 seconds
                setTimeout(() => {
                    notification.classList.add('fade-out');
                    setTimeout(() => {
                        notification.remove();
                    }, 500);
                }, 5000);
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Create error notification
            const notification = document.createElement('div');
            notification.className = 'notification error';
            notification.textContent = 'An error occurred. Please try again later.';
            document.querySelector('.contact-form').appendChild(notification);
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});
  
  
  