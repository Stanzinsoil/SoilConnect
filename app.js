document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeCalendar();
    loadEvents();
    loadNews();
    loadJobs();
    loadForumTopics();
    setupEventListeners();
    
    // Display current date in the header
    const currentDate = new Date();
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
});

// Calendar Initialization
function initializeCalendar() {
    const calendarEl = document.getElementById('fullCalendar');
    
    if (!calendarEl) return;
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth'
        },
        events: fetchCalendarEvents,
        eventClick: function(info) {
            showEventDetails(info.event);
        }
    });
    
    calendar.render();
}

// Fetch calendar events from API
function fetchCalendarEvents(info, successCallback, failureCallback) {
    // This would typically be an API call to your backend
    // For demonstration, we'll use mock data
    const events = [
        {
            title: 'Global Symposium on Soil Information & Data',
            start: '2025-09-25',
            end: '2025-09-28',
            url: '#',
            extendedProps: {
                location: 'Nanjing, China',
                organizer: 'FAO Global Soil Partnership',
                type: 'Symposium',
                description: 'International forum for stakeholders to explore the role of soil data in addressing global challenges.'
            }
        },
        {
            title: 'Soil Mapping for a Sustainable Future',
            start: '2025-06-15',
            end: '2025-06-18',
            url: '#',
            extendedProps: {
                location: 'Orléans, France',
                organizer: 'IUSS Working Groups',
                type: 'Workshop',
                description: 'Joint workshop on Digital Soil Mapping and Global Soil Map.'
            }
        },
        {
            title: 'Abstract Submission Deadline: WCSS 2026',
            start: '2025-10-15',
            url: '#',
            display: 'background',
            color: '#f44336',
            extendedProps: {
                type: 'Deadline',
                description: 'Last day to submit abstracts for the World Congress of Soil Science 2026.'
            }
        }
    ];
    
    successCallback(events);
}

// Show event details when clicked on calendar
function showEventDetails(event) {
    // Implement modal or popover with event details
    console.log('Event clicked:', event);
}

// Load events from API
function loadEvents() {
    // This would typically be an API call to your backend
    // For demonstration, we'll use mock data
    const events = [
        {
            id: 1,
            title: 'Global Symposium on Soil Information & Data',
            date: 'September 25-28, 2025',
            location: 'Nanjing, China',
            organizer: 'FAO Global Soil Partnership',
            type: 'Symposium',
            tags: ['Digital Soil Mapping', 'Data Standards', 'FAIR Principles'],
            description: 'International forum for stakeholders to explore the role of soil data in addressing global challenges.'
        },
        {
            id: 2,
            title: 'Soil Mapping for a Sustainable Future',
            date: 'June 15-18, 2025',
            location: 'Orléans, France',
            organizer: 'IUSS Working Groups',
            type: 'Workshop',
            tags: ['Digital Soil Mapping', 'GlobalSoilMap'],
            description: 'Joint workshop on Digital Soil Mapping and Global Soil Map.'
        },
        {
            id: 3,
            title: 'Webinar: AI Applications in Soil Quality Monitoring',
            date: 'May 20, 2025',
            location: 'Online',
            organizer: 'SoilConnect',
            type: 'Webinar',
            tags: ['AI', 'Machine Learning', 'Soil Quality'],
            description: 'Learn about the latest AI and machine learning applications for monitoring soil quality.'
        }
    ];
    
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;
    
    eventsList.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'col-md-6 col-lg-4 mb-4';
        eventCard.innerHTML = `
            <div class="card event-card">
                <div class="card-body">
                    <span class="badge ${getEventTypeBadgeClass(event.type)} mb-2">${event.type}</span>
                    <h5 class="card-title">${event.title}</h5>
                    <p class="event-date mb-1"><i class="far fa-calendar-alt"></i> ${event.date}</p>
                    <p class="event-location mb-2"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p class="card-text">${event.description}</p>
                    <div class="mb-3">
                        ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="#" class="btn btn-sm btn-outline-primary" onclick="showEventDetails({id: ${event.id}})">View Details</a>
                    <a href="#" class="btn btn-sm btn-outline-secondary" onclick="addToCalendar(${event.id})">
                        <i class="far fa-calendar-plus"></i> Add to Calendar
                    </a>
                </div>
            </div>
        `;
        eventsList.appendChild(eventCard);
    });
}

// Get appropriate badge class based on event type
function getEventTypeBadgeClass(type) {
    const typeMap = {
        'Conference': 'bg-primary',
        'Workshop': 'bg-success',
        'Webinar': 'bg-info',
        'Symposium': 'bg-warning',
        'Training': 'bg-secondary',
        'Deadline': 'bg-danger'
    };
    
    return typeMap[type] || 'bg-primary';
}

// Add event to calendar
function addToCalendar(eventId) {
    // Implement calendar download functionality
    // This would generate an ICS file for the selected event
    console.log('Adding event to calendar:', eventId);
    
    // Example of creating and downloading an ICS file
    const event = {
        title: 'Global Symposium on Soil Information & Data',
        start: '20250925T090000',
        end: '20250928T180000',
        description: 'International forum for stakeholders to explore the role of soil data in addressing global challenges.',
        location: 'Nanjing, China',
        url: 'https://soilconnect.org/events/1'
    };
    
    const icsContent = generateICS(event);
    downloadICS(icsContent, 'soil-event.ics');
}

// Generate ICS file content
function generateICS(event) {
    return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.start}
DTEND:${event.end}
DESCRIPTION:${event.description}
LOCATION:${event.location}
URL:${event.url}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}

// Download ICS file
function downloadICS(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Load news from API
function loadNews() {
    // This would typically be an API call to your backend
    // For demonstration, we'll use mock data
    const news = [
        {
            id: 1,
            title: 'New Genomic Catalogue Boosts Mining of Soil Microbiomes',
            date: 'April 28, 2025',
            source: 'Nature',
            image: 'images/news1.jpg',
            summary: 'Researchers have created a comprehensive genomic catalogue of soil microbiomes, expanding our understanding of soil biodiversity.'
        },
        {
            id: 2,
            title: 'AI Revolutionizes Soil Quality Monitoring',
            date: 'April 15, 2025',
            source: 'AZoRobotics',
            image: 'images/news2.jpg',
            summary: 'Machine learning models trained on spectral reflectance data can now classify soil types and identify nutrient deficiencies with unprecedented accuracy.'
        },
        {
            id: 3,
            title: 'Digital Soil Mapping Advances Help Climate Resilience',
            date: 'April 5, 2025',
            source: 'ScienceDirect',
            image: 'images/news3.jpg',
            summary: 'New techniques in digital soil mapping are providing crucial data for climate change adaptation and mitigation strategies.'
        }
    ];
    
    const newsList = document.getElementById('newsList');
    if (!newsList) return;
    
    newsList.innerHTML = '';
    
    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'col-md-4 mb-4';
        newsCard.innerHTML = `
            <div class="card news-card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="news-date">${item.date} | Source: ${item.source}</p>
                    <p class="card-text">${item.summary}</p>
                    <a href="#" class="btn btn-sm btn-outline-primary">Read More</a>
                </div>
            </div>
        `;
        newsList.appendChild(newsCard);
    });
}

// Load jobs from API
function loadJobs() {
    // This would typically be an API call to your backend
    // For demonstration, we'll use mock data
    const jobs = [
        {
            id: 1,
            title: 'PhD Position in Digital Soil Mapping',
            organization: 'University of Wageningen',
            location: 'Netherlands',
            type: 'Academic',
            deadline: 'June 15, 2025'
        },
        {
            id: 2,
            title: 'Soil Data Scientist',
            organization: 'FAO',
            location: 'Rome, Italy',
            type: 'International Organization',
            deadline: 'May 30, 2025'
        },
        {
            id: 3,
            title: 'Research Fellow - Soil Microbiome',
            organization: 'National Soil Research Institute',
            location: 'Canberra, Australia',
            type: 'Research',
            deadline: 'Open until filled'
        }
    ];
    
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;
    
    jobsList.innerHTML = '';
    
    jobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'col-md-4 mb-4';
        jobItem.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${job.organization}</h6>
                    <p class="mb-1"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                    <p class="mb-2"><i class="fas fa-clock"></i> Deadline: ${job.deadline}</p>
                    <span class="badge bg-secondary mb-3">${job.type}</span>
                    <a href="#" class="btn btn-sm btn-outline-primary">View Details</a>
                </div>
            </div>
        `;
        jobsList.appendChild(jobItem);
    });
}

// Load forum topics
function loadForumTopics() {
    // This would typically be an API call to your backend
    // For demonstration, we'll use mock data
    const topics = [
        {
            id: 1,
            title: 'Best practices for soil sampling in heterogeneous landscapes',
            author: 'Dr. Maria Rodriguez',
            date: 'May 1, 2025',
            replies: 12,
            views: 145,
            category: 'Digital Soil Mapping'
        },
        {
            id: 2,
            title: 'Machine learning models for predicting soil organic carbon',
            author: 'John Smith',
            date: 'April 28, 2025',
            replies: 8,
            views: 97,
            category: 'Machine Learning & AI'
        },
        {
            id: 3,
            title: 'Integrating spectral data with traditional soil analysis',
            author: 'Dr. Ahmed Hassan',
            date: 'April 25, 2025',
            replies: 5,
            views: 76,
            category: 'Remote Sensing & GIS'
        }
    ];
    
    const forumTopics = document.getElementById('forumTopics');
    if (!forumTopics) return;
    
    forumTopics.innerHTML = '';
    
    topics.forEach(topic => {
        const topicItem = document.createElement('a');
        topicItem.href = '#';
        topicItem.className = 'list-group-item list-group-item-action forum-topic';
        topicItem.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${topic.title}</h5>
                <small class="text-muted">${topic.date}</small>
            </div>
            <p class="mb-1">Started by ${topic.author}</p>
            <div class="topic-meta">
                <span class="me-3"><i class="fas fa-comment"></i> ${topic.replies} replies</span>
                <span class="me-3"><i class="fas fa-eye"></i> ${topic.views} views</span>
                <span class="badge bg-light text-dark">${topic.category}</span>
            </div>
        `;
        forumTopics.appendChild(topicItem);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter events
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterEvents);
    }
    
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            subscribeToNewsletter();
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
    
    // New topic form
    const newTopicForm = document.getElementById('newTopicForm');
    if (newTopicForm) {
        newTopicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createNewTopic();
        });
    }
}

// Filter events based on selected criteria
function filterEvents() {
    const topic = document.getElementById('topicFilter').value;
    const location = document.getElementById('locationFilter').value;
    const type = document.getElementById('typeFilter').value;
    const date = document.getElementById('dateFilter').value;
    
    console.log('Filtering events:', { topic, location, type, date });
    
    // This would typically make an API call with the filter parameters
    // For demonstration, we'll just reload the events
    loadEvents();
}

// Clear all filters
function clearFilters() {
    document.getElementById('topicFilter').value = 'All Topics';
    document.getElementById('locationFilter').value = 'All Locations';
    document.getElementById('typeFilter').value = 'All Event Types';
    document.getElementById('dateFilter').value = 'All Dates';
    
    loadEvents();
}

// Subscribe to newsletter
function subscribeToNewsletter() {
    const email = document.querySelector('#newsletterForm input[type="email"]').value;
    const conferencesChecked = document.getElementById('conferencesCheck').checked;
    const newsChecked = document.getElementById('newsCheck').checked;
    const jobsChecked = document.getElementById('jobsCheck').checked;
    
    console.log('Newsletter subscription:', { email, conferencesChecked, newsChecked, jobsChecked });
    
    // This would typically make an API call to subscribe the user
    alert('Thank you for subscribing to our newsletter!');
}

// Handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    console.log('Login attempt:', { email, password, rememberMe });
    
    // This would typically make an API call to authenticate the user
    alert('Login functionality would be implemented here.');
}

// Handle signup
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    console.log('Signup attempt:', { name, email });
    
    // This would typically make an API call to register the user
    alert('Signup functionality would be implemented here.');
}

// Create new forum topic
function createNewTopic() {
    const title = document.getElementById('topicTitle').value;
    const category = document.getElementById('topicCategory').value;
    const content = document.getElementById('topicContent').value;
    
    console.log('New topic:', { title, category, content });
    
    // This would typically make an API call to create the topic
    alert('Your discussion topic has been posted!');
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('newTopicModal'));
    modal.hide();
    
    // Reload forum topics
    loadForumTopics();
}
