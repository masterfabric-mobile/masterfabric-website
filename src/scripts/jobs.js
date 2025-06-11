// Application state management
class ApplicationManager {
  constructor(jobsData, positionsData) {
    this.jobsData = jobsData;
    this.positionsData = positionsData;
    this.selectedPosition = null;
    this.applicationHistory = this.getApplicationHistory();
    this.init();
  }

  init() {
    this.bindEventListeners();
    this.checkReturnUser();
  }

  // Position selection functionality
  selectPosition(button) {
    const jobId = button.getAttribute('data-job-id');
    const job = this.positionsData.openPositions.find(j => j.id === jobId);
    
    if (job) {
      this.selectedPosition = job;
      this.showPositionDetailModal(job);
    }
  }

  // Show position detail modal
  showPositionDetailModal(job) {
    const modal = document.getElementById('position-detail-modal');
    const content = document.getElementById('position-detail-content');
    
    // Generate modal content
    content.innerHTML = `
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">${job.title}</h2>
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ${job.department}
            </span>
            <span>${job.type}</span>
            <span>${job.location}</span>
          </div>
        </div>
        <button onclick="window.applicationManager.closePositionModal()" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
          <div class="space-y-3">
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-gray-600">${job.location}</span>
            </div>
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-gray-600">${job.experience} experience required</span>
            </div>
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              <span class="text-gray-600">Salary: ${job.salary}</span>
            </div>
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-gray-600">Posted: ${job.posted === 'today' ? 'Today' : job.posted}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
          <div class="flex flex-wrap gap-2">
            ${job.tags.map(tag => `
              <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">${tag}</span>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">About This Role</h3>
        <p class="text-gray-600 leading-relaxed">${job.description}</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
          <ul class="space-y-2">
            ${job.requirements.map(req => `
              <li class="flex items-start text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>${req}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h3>
          <ul class="space-y-2">
            ${job.responsibilities.map(resp => `
              <li class="flex items-start text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>${resp}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <div class="border-t pt-6 flex flex-col sm:flex-row gap-4">
        <button 
          onclick="window.applicationManager.applyForPosition('${job.id}')" 
          class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Apply for This Position
        </button>
        <button 
          onclick="window.applicationManager.closePositionModal()" 
          class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    `;
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closePositionModal();
      }
    });
  }

  closePositionModal() {
    const modal = document.getElementById('position-detail-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  applyForPosition(jobId) {
    const job = this.positionsData.openPositions.find(j => j.id === jobId);
    if (job) {
      this.selectedPosition = job;
      this.closePositionModal();
      this.scrollToForm();
      this.prefillPosition(job.title);
      this.showPositionSelectedFeedback(job.title);
    }
  }

  prefillPosition(title) {
    const positionSelect = document.getElementById('position');
    if (positionSelect) {
      positionSelect.value = title;
      positionSelect.dispatchEvent(new Event('change'));
    }
  }

  scrollToForm() {
    const formSection = document.querySelector('#career-form').closest('section');
    formSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  showPositionSelectedFeedback(title) {
    this.showNotification(`Position "${title}" selected! Form is ready for your application.`, 'success');
  }

  // Application submission handling
  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      this.showNotification('Please fill in all required fields correctly.', 'error');
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const resultDiv = document.getElementById('career-form-result');
    
    // Set loading state
    this.setFormLoading(true, submitButton, resultDiv);

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Add application metadata
      data.applicationId = this.generateApplicationId();
      data.timestamp = new Date().toISOString();
      data.selectedFromPosition = this.selectedPosition ? this.selectedPosition.id : 'general';

      const response = await fetch(this.jobsData.api.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (response.status === 200) {
        this.handleSuccessfulSubmission(data, form, resultDiv);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      this.handleSubmissionError(error, resultDiv);
    } finally {
      this.setFormLoading(false, submitButton, resultDiv);
    }
  }

  handleSuccessfulSubmission(data, form, resultDiv) {
    // Save to application history
    this.saveApplicationToHistory({
      id: data.applicationId,
      position: data.position,
      timestamp: data.timestamp,
      name: data.name,
      email: data.email
    });

    // Show success message
    resultDiv.innerHTML = `
      <div class="success-notification">
        <div class="flex items-center">
          <div class="w-6 h-6 mr-3">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold">Application Submitted Successfully!</h4>
            <p class="text-sm opacity-90">Thank you for your interest in MasterFabric. We'll review your application and get back to you within 3-5 business days.</p>
          </div>
        </div>
      </div>
    `;

    // Reset form
    form.reset();
    form.classList.remove('was-validated');
    this.selectedPosition = null;

    // Show system notification
    this.showNotification('Application submitted successfully! We\'ll be in touch soon.', 'success', 5000);

    // Auto-hide success message after 10 seconds
    setTimeout(() => {
      resultDiv.innerHTML = '';
    }, 10000);
  }

  handleSubmissionError(error, resultDiv) {
    console.error('Submission error:', error);
    
    resultDiv.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <div class="flex items-center">
          <div class="w-6 h-6 mr-3">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold">Submission Failed</h4>
            <p class="text-sm">There was an error submitting your application. Please try again or contact us directly at info@masterfabric.co</p>
          </div>
        </div>
      </div>
    `;

    this.showNotification('Submission failed. Please try again or contact us directly.', 'error');
  }

  setFormLoading(loading, submitButton, resultDiv) {
    if (loading) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      resultDiv.innerHTML = `
        <div class="text-blue-300 flex items-center justify-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300 mr-2"></div>
          Submitting your application...
        </div>
      `;
    } else {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Application';
    }
  }

  // Utility functions
  generateApplicationId() {
    return 'APP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existing = document.querySelector('.application-status');
    if (existing) {
      existing.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `application-status ${type}`;
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Auto-hide notification
    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.remove('show');
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }
    }, duration);
  }

  // Application history management
  getApplicationHistory() {
    try {
      const history = localStorage.getItem('masterfabric_applications');
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }

  saveApplicationToHistory(application) {
    try {
      const history = this.getApplicationHistory();
      history.push(application);
      
      // Keep only last 10 applications
      if (history.length > 10) {
        history.splice(0, history.length - 10);
      }
      
      localStorage.setItem('masterfabric_applications', JSON.stringify(history));
    } catch (error) {
      console.warn('Could not save application history:', error);
    }
  }

  checkReturnUser() {
    const history = this.getApplicationHistory();
    if (history.length > 0) {
      const lastApplication = history[history.length - 1];
      const daysSince = Math.floor((Date.now() - new Date(lastApplication.timestamp).getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSince < 7) {
        this.showReturnUserMessage(lastApplication, daysSince);
      }
    }
  }

  showReturnUserMessage(lastApplication, daysSince) {
    let message;
    if (daysSince === 0) {
      message = `Welcome back! We received your application for "${lastApplication.position}" today. We'll review it soon.`;
    } else {
      message = `Welcome back! We received your application for "${lastApplication.position}" ${daysSince} day${daysSince > 1 ? 's' : ''} ago. We're still reviewing applications.`;
    }
    
    setTimeout(() => {
      this.showNotification(message, 'info', 8000);
    }, 2000);
  }

  // Event binding
  bindEventListeners() {
    // Position selection buttons
    document.querySelectorAll('.job-apply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectPosition(e.target.closest('button'));
      });
    });

    // Form submission
    const careerForm = document.getElementById('career-form');
    if (careerForm) {
      careerForm.addEventListener('submit', (e) => {
        this.handleFormSubmit(e);
      });
    }

    // Position select change
    const positionSelect = document.getElementById('position');
    if (positionSelect) {
      positionSelect.addEventListener('change', (e) => {
        if (e.target.value && e.target.value !== 'Other') {
          const job = this.positionsData.openPositions.find(j => j.title === e.target.value);
          if (job) {
            this.selectedPosition = job;
          }
        }
      });
    }
  }
}

// Initialize application manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.applicationManager = new ApplicationManager(jobsData, positionsData);
});

// Global functions for inline onclick handlers
window.selectPosition = function(button) {
  if (window.applicationManager) {
    window.applicationManager.selectPosition(button);
  }
};

window.closePositionModal = function() {
  if (window.applicationManager) {
    window.applicationManager.closePositionModal();
  }
};

window.applyForPosition = function(jobId) {
  if (window.applicationManager) {
    window.applicationManager.applyForPosition(jobId);
  }
};
