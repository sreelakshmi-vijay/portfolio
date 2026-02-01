function showSection(id, button) {
    // Remove active class from all sections
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active");
    });

    // Add active class to selected section
    document.getElementById(id).classList.add("active");

    // Update navigation button states
    document.querySelectorAll("nav button, .header-buttons button").forEach(btn => {
        btn.classList.remove("active");
    });
    
    if (button) {
        button.classList.add("active");
    } else {
        // If no button provided (e.g., on page load), find the corresponding button
        const buttons = document.querySelectorAll("nav button, .header-buttons button");
        buttons.forEach(btn => {
            const onclick = btn.getAttribute("onclick");
            if (onclick && onclick.includes(`'${id}'`)) {
                btn.classList.add("active");
            }
        });
    }

    // Save last visited section
    localStorage.setItem("lastSection", id);
}

window.addEventListener("load", () => {
    const saved = localStorage.getItem("lastSection");

    if (saved) {
        showSection(saved);   // return to last visited
    } else {
        showSection("home");  // first visit only
    }
});

// Auto-scroll functionality for Skills section
document.addEventListener('DOMContentLoaded', function() {
  const skillsSection = document.querySelector('.skills-section');
  
  if (!skillsSection) return;
  
  // Create scroll trigger zones
  const leftTrigger = document.createElement('div');
  leftTrigger.className = 'scroll-trigger-left';
  
  const rightTrigger = document.createElement('div');
  rightTrigger.className = 'scroll-trigger-right';
  
  const skillsContainer = skillsSection.parentElement;
  skillsContainer.style.position = 'relative';
  skillsContainer.appendChild(leftTrigger);
  skillsContainer.appendChild(rightTrigger);
  
  let scrollInterval = null;
  const scrollSpeed = 3; // Pixels per frame
  
  // Left scroll on hover
  leftTrigger.addEventListener('mouseenter', function() {
    scrollInterval = setInterval(() => {
      skillsSection.scrollLeft -= scrollSpeed;
    }, 16); // ~60fps
  });
  
  leftTrigger.addEventListener('mouseleave', function() {
    clearInterval(scrollInterval);
  });
  
  // Right scroll on hover
  rightTrigger.addEventListener('mouseenter', function() {
    scrollInterval = setInterval(() => {
      skillsSection.scrollLeft += scrollSpeed;
    }, 16); // ~60fps
  });
  
  rightTrigger.addEventListener('mouseleave', function() {
    clearInterval(scrollInterval);
  });
  
  // Enable overflow-x scroll (but keep scrollbar hidden)
  skillsSection.style.overflowX = 'auto';
});

// ========== PROJECT MODAL FUNCTIONALITY ==========

// Project data - Updated with your actual project details
const projectData = {
  project1: {
    heroImage: 'media/OTRS.gif',
    duration: 'January 2025',
    title: 'Online Ticket Reservation System',
    tools: [
      { img: 'media/Python.png', name: 'Python' },
      { img: 'media/Django.jpg', name: 'Django' },
      { img: 'media/Postgres.png', name: 'PostgreSQL' },
      { img: 'media/HTML5CSS.jpg', name: 'HTML/CSS' },
    ],
    description: `
    <h3>Overview</h3>
    <p>Developed a functional web application locally using Python (Django) to explore and understand relational databases. The system streamlines ticket booking across multiple transportation modes including trains, flights, and buses.</p>
    
    <h3>Key Features</h3>
    <p><strong>User-side Features:</strong></p>
    <p>• Search for trains, flights, and buses with advanced filtering options</p>
    <p>• Book tickets with real-time database updates</p>
    <p>• Manage bookings and view booking history</p>
    
    <p><strong>Admin-side Features:</strong></p>
    <p>• Add, update, and remove schedules using CRUD operations</p>
    <p>• Manage station, airport, and bus stand details</p>
    <p>• Real-time inventory tracking</p>
    
    <h3>Technical Implementation</h3>
    <p>• Implemented a structured database schema using PostgreSQL to efficiently store train schedules, tickets, and user information</p>
    <p>• Integrated Django's built-in authentication system to manage user roles securely</p>
    <p>• Implemented Django Forms for data validation to ensure proper input and prevent errors</p>
    `,
    discoverLink: ''
  },
  project2: {
    heroImage: 'https://via.placeholder.com/800x400/004e34/ffffff?text=Disaster+Relief+System',
    duration: 'November 2025 - Present',
    title: 'Disaster Relief Coordination and Management System',
    tools: [
      { img: 'https://via.placeholder.com/100/004e34/ffffff?text=PostgreSQL', name: 'PostgreSQL' },
      { img: 'https://via.placeholder.com/100/004e34/ffffff?text=Planning', name: 'System Design' }
    ],
    description: `
    <h3>Project Role</h3>
    <p>Responsibility: Resource and Communication Modules (Group Project)</p>
    
    <h3>Requirements Definition</h3>
    <p>Defined comprehensive user and admin requirements for the following modules:</p>
    <p>• Real-time inventory tracking system</p>
    <p>• Resource request and allocation management</p>
    <p>• Warehouse management and coordination</p>
    <p>• Emergency communication systems</p>
    
    <h3>Documentation & Planning</h3>
    <p>Documented detailed feature scope and workflows including:</p>
    <p>• Inventory dashboards with real-time updates</p>
    <p>• Geo-tagged warehouse availability mapping</p>
    <p>• Supply-demand forecasting algorithms</p>
    <p>• Emergency alert and communication protocols</p>
    
    <h3>Current Status</h3>
    <p>Currently preparing for implementation by reviewing system architecture and selecting the appropriate technology stack for optimal performance and scalability during disaster relief operations.</p>
    `,
    discoverLink: ''
  },
};

function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const project = projectData[projectId];
  
  if (!project) {
    console.error('Project not found:', projectId);
    return;
  }
  
  // Populate modal content
  document.getElementById('modalHeroImage').src = project.heroImage;
  document.getElementById('modalDuration').textContent = project.duration;
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').innerHTML = project.description;
  
  // Populate tools
  const toolsContainer = document.getElementById('toolsContainer');
  toolsContainer.innerHTML = '';
  
  project.tools.forEach(tool => {
    const toolDiv = document.createElement('div');
    toolDiv.className = 'tool-sphere';
    toolDiv.innerHTML = `
      <img src="${tool.img}" alt="${tool.name}" onerror="this.src='https://via.placeholder.com/100/004e34/ffffff?text=${tool.name}'">
      <p>${tool.name}</p>
    `;
    toolsContainer.appendChild(toolDiv);
  });
  
  // Update discover button
  const discoverBtn = document.getElementById('modalDiscoverBtn');
  if (project.discoverLink) {
    discoverBtn.style.display = 'block';
    discoverBtn.onclick = () => window.open(project.discoverLink, '_blank');
  } else {
    discoverBtn.style.display = 'none';
  }
  
  // Show/hide navigation buttons based on number of tools
  updateToolNavigation();
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal when clicking outside of modal content
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    closeProjectModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

// Tool navigation functionality
function updateToolNavigation() {
  const toolsContainer = document.getElementById('toolsContainer');
  const leftBtn = document.getElementById('toolNavLeft');
  const rightBtn = document.getElementById('toolNavRight');
  
  // Show buttons only if there are more than 3 tools
  const toolCount = toolsContainer.children.length;
  
  if (toolCount > 3) {
    leftBtn.style.display = 'flex';
    rightBtn.style.display = 'flex';
    
    // Update button visibility based on scroll position
    toolsContainer.addEventListener('scroll', function() {
      leftBtn.style.opacity = toolsContainer.scrollLeft > 0 ? '1' : '0.3';
      rightBtn.style.opacity = 
        toolsContainer.scrollLeft < (toolsContainer.scrollWidth - toolsContainer.clientWidth) 
        ? '1' : '0.3';
    });
    
    // Initial check
    leftBtn.style.opacity = '0.3';
    rightBtn.style.opacity = toolCount > 3 ? '1' : '0.3';
  } else {
    leftBtn.style.display = 'none';
    rightBtn.style.display = 'none';
  }
}

function scrollTools(direction) {
  const toolsContainer = document.getElementById('toolsContainer');
  const scrollAmount = 160; // Scroll by one tool width
  toolsContainer.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// ========== RESEARCH MODAL FUNCTIONALITY ==========

// Research data - Updated with your actual research
const researchData = {
  research1: {
    image: 'https://via.placeholder.com/600x400/8B0000/ffffff?text=Fire+Risk+Prediction',
    title: 'Fire Risk Prediction with Soft Computing Algorithms',
    authors: 'Sreelakshmi Vijay',
    venue: 'Ongoing Research',
    doi: 'December 2025 - Present',
    keywords: 'Fuzzy Logic, Neural Networks, Neuro-Fuzzy Systems (ANFIS), Wildfire Prediction, Soft Computing, Spatiotemporal Analysis',
    citation: 'Research in progress. Citation will be available upon publication.',
    paperLink: '',
    description: `
      <h3>Research Overview</h3>
      <p>This ongoing research focuses on wildfire risk prediction using advanced soft computing methodologies. The project addresses the critical need for early warning systems in fire-prone regions through intelligent data analysis and prediction.</p>
      
      <h3>Data Analysis</h3>
      <p>• Analyzed spatiotemporal, meteorological, and environmental wildfire datasets across multiple geographic regions</p>
      <p>• Performed comprehensive data preprocessing including normalization and handling of missing values</p>
      <p>• Engineered temporal lag features to capture historical fire patterns</p>
      <p>• Applied target transformations to improve model performance</p>
      
      <h3>Methodological Approaches</h3>
      <p><strong>Fuzzy Logic Systems:</strong> Implementing fuzzy inference systems to handle uncertainty in environmental factors and fire risk assessment</p>
      <p><strong>Neural Networks:</strong> Developing deep learning architectures for pattern recognition in historical fire data</p>
      <p><strong>Neuro-Fuzzy (ANFIS):</strong> Combining the learning capabilities of neural networks with the interpretability of fuzzy logic for enhanced prediction accuracy</p>
      
      <h3>Research Objectives</h3>
      <p>• Develop robust early warning systems for wildfire risk prediction</p>
      <p>• Integrate multiple data sources for comprehensive risk assessment</p>
      <p>• Create interpretable models that can guide decision-making in fire management</p>
      <p>• Validate model performance across diverse geographic and climatic conditions</p>
    `
  },
  research2: {
    image: 'https://via.placeholder.com/600x400/8B0000/ffffff?text=Pharmacokinetic+Models',
    title: 'Deep Learning Approaches for Solving Pharmacokinetic Models',
    authors: 'Sreelakshmi Vijay',
    venue: 'Ongoing Research',
    doi: 'November 2025 - Present',
    keywords: 'Physics-Informed Neural Networks (PINNs), Neural ODEs, Transformers, State-Space Models, Pharmacokinetics, Deep Learning',
    citation: 'Research in progress. Citation will be available upon publication.',
    paperLink: '',
    description: `
      <h3>Research Overview</h3>
      <p>This research explores cutting-edge deep learning methodologies for solving complex pharmacokinetic models. The work bridges computational mathematics, pharmaceutical sciences, and artificial intelligence to advance drug concentration prediction and parameter estimation.</p>
      
      <h3>Model Formulation</h3>
      <p>• Formulated pharmacokinetic ODE models including 1-compartment and 2-compartment systems</p>
      <p>• Modeled both IV bolus and infusion input scenarios</p>
      <p>• Incorporated physiological constraints and pharmacological principles into model design</p>
      
      <h3>Dataset Generation</h3>
      <p>• Generated synthetic concentration-time datasets using Runge-Kutta numerical solvers for high accuracy</p>
      <p>• Implemented Monte Carlo simulations to model population heterogeneity and inter-individual variability</p>
      <p>• Introduced realistic noise patterns to simulate clinical measurement uncertainties</p>
      
      <h3>Deep Learning Architectures</h3>
      <p><strong>Physics-Informed Neural Networks (PINNs):</strong> Embedding pharmacokinetic equations directly into the neural network loss function to ensure physical consistency</p>
      <p><strong>Neural ODEs:</strong> Continuous-depth neural networks that learn the dynamics of drug concentration over time</p>
      <p><strong>Transformers:</strong> Attention-based mechanisms for capturing long-range temporal dependencies in concentration profiles</p>
      <p><strong>State-Space Models:</strong> Sequential modeling approaches for efficient parameter estimation and prediction</p>
      
      <h3>Research Goals</h3>
      <p>• Achieve accurate drug concentration prediction across diverse patient populations</p>
      <p>• Develop robust parameter estimation methods for pharmacokinetic constants</p>
      <p>• Compare performance of different deep learning architectures on pharmacokinetic problems</p>
      <p>• Enable personalized medicine through improved pharmacokinetic modeling</p>
    `
  }
};

function openResearchModal(researchId) {
  const modal = document.getElementById('researchModal');
  const research = researchData[researchId];
  
  if (!research) {
    console.error('Research not found:', researchId);
    return;
  }
  
  // Populate modal content
  document.getElementById('researchModalImage').src = research.image;
  document.getElementById('researchBannerTitle').textContent = research.title;
  document.getElementById('researchAuthors').textContent = research.authors;
  document.getElementById('researchVenue').textContent = research.venue;
  document.getElementById('researchDOI').textContent = research.doi;
  document.getElementById('researchKeywords').textContent = research.keywords;
  document.getElementById('researchCitation').innerHTML = research.citation;
  document.getElementById('researchDescription').innerHTML = research.description;
  
  // Update paper link button
  const paperBtn = document.getElementById('researchPaperLink');
  if (research.paperLink) {
    paperBtn.style.display = 'block';
    paperBtn.onclick = () => window.open(research.paperLink, '_blank');
  } else {
    paperBtn.style.display = 'none';
  }
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeResearchModal() {
  const modal = document.getElementById('researchModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore background scrolling
}

function copyCitation() {
  const citationText = document.getElementById('researchCitation').innerText;
  
  // Copy to clipboard
  navigator.clipboard.writeText(citationText).then(() => {
    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.backgroundColor = 'rgb(0, 150, 0)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy citation:', err);
    alert('Failed to copy citation. Please copy manually.');
  });
}

// Close research modal when clicking outside
window.addEventListener('click', function(event) {
  const researchModal = document.getElementById('researchModal');
  if (event.target === researchModal) {
    closeResearchModal();
  }
});

// Close research modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const researchModal = document.getElementById('researchModal');
    if (researchModal && researchModal.classList.contains('active')) {
      closeResearchModal();
    }
  }
});