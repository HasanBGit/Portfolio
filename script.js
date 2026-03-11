// ModelCraft Core Data
const modelCraftCore = [
  {
    id: 1,
    name: "Linear Regression",
    description: "From scratch implementation of linear regression with gradient descent optimization",
    tags: ["Fundamentals", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
  {
    id: 2,
    name: "Logistic Regression",
    description: "Binary classification with logistic regression from scratch",
    tags: ["Fundamentals", "Classification", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
  {
    id: 3,
    name: "Neural Networks",
    description: "Basic neural network implementation with backpropagation algorithm",
    tags: ["Deep Learning", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
  {
    id: 4,
    name: "Convolutional Neural Networks (CNN)",
    description: "CNN architecture for image classification with convolution, pooling, and fully connected layers",
    tags: ["Deep Learning", "Computer Vision", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
  {
    id: 5,
    name: "Generative Adversarial Networks (GAN)",
    description: "GAN implementation with generator and discriminator networks for image generation",
    tags: ["Generative Models", "Deep Learning", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
  {
    id: 6,
    name: "Diffusion Models",
    description: "From scratch implementation of diffusion models for image generation with noise scheduling",
    tags: ["Generative Models", "Deep Learning", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
  {
    id: 7,
    name: "Autoregressive Models",
    description: "Autoregressive sequence modeling for text and time series generation",
    tags: ["Generative Models", "NLP", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
  {
    id: 8,
    name: "Normalizing Flows",
    description: "Invertible transformations for density estimation and generative modeling",
    tags: ["Generative Models", "Deep Learning", "PyTorch"],
    link: "https://github.com/HasanBGit/ModelCraft-Core",
  },
]

// State
let activeTab = "home"
let coreSearch = ""
let coreSelectedTags = ["All"]
let showHelpHint = false

// Utility functions
function getAllTags(items) {
  const tags = new Set()
  items.forEach((item) => {
    item.tags?.forEach((tag) => tags.add(tag))
  })
  return ["All", ...Array.from(tags).sort()]
}

function filterItems(items, search, selectedTags) {
  return items.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())

    const matchesTags =
      selectedTags.includes("All") || (item.tags && item.tags.some((tag) => selectedTags.includes(tag)))

    return matchesSearch && matchesTags
  })
}

function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Tab switching
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab
    switchTab(tabId)
  })
})

function switchTab(tabId) {
  activeTab = tabId

  // Update buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active")
    if (btn.dataset.tab === tabId) {
      btn.classList.add("active")
    }
  })

  // Update content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })
  document.getElementById(tabId).classList.add("active")

  // Render dynamic tabs
  if (tabId === "modelcraft-core") renderCoreTab()

  document.querySelector(".page-content").scrollTop = 0
}

// Core Tab
function renderCoreTab() {
  renderTagButtons(getAllTags(modelCraftCore), "coreTags", (tag) => {
    if (tag === "All") {
      coreSelectedTags = ["All"]
    } else {
      const newTags = coreSelectedTags.filter((t) => t !== "All")
      if (newTags.includes(tag)) {
        const updated = newTags.filter((t) => t !== tag)
        coreSelectedTags = updated.length === 0 ? ["All"] : updated
      } else {
        coreSelectedTags = [...newTags, tag]
      }
    }
    renderCoreTab()
  })

  const filtered = filterItems(modelCraftCore, coreSearch, coreSelectedTags)
  document.getElementById("coreCount").textContent = filtered.length
  renderGrid("coreGrid", filtered)
}

function renderTagButtons(tags, containerId, onClickHandler) {
  const container = document.getElementById(containerId)
  if (!container) return
  container.innerHTML = ""

  tags.forEach((tag) => {
    const button = document.createElement("button")
    button.textContent = tag
    button.classList.add(coreSelectedTags.includes(tag) ? "active" : "inactive")
    button.addEventListener("click", () => onClickHandler(tag))
    button.setAttribute("aria-pressed", coreSelectedTags.includes(tag) ? "true" : "false")
    button.setAttribute("role", "switch")
    container.appendChild(button)
  })
}

function renderGrid(containerId, items) {
  const container = document.getElementById(containerId)
  if (!container) return
  container.innerHTML = ""

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--muted-foreground);">
        <p>No models found. Try adjusting your search or filters.</p>
      </div>
    `
    return
  }

  items.forEach((item) => {
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="skill-tags">
        ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="project-link">
        View on GitHub
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    `
    container.appendChild(card)
  })
}

// Search input
const coreSearchInput = document.getElementById("coreSearch")
if (coreSearchInput) {
  const debouncedCoreSearch = debounce(() => renderCoreTab(), 300)
  coreSearchInput.addEventListener("input", (e) => {
    coreSearch = e.target.value
    debouncedCoreSearch()
  })
}

// Keyboard shortcuts
window.addEventListener("keydown", (e) => {
  const isInputFocused = document.activeElement.tagName === "INPUT"

  if (!isInputFocused) {
    if (e.key === "1") switchTab("home")
    // else if (e.key === "2") switchTab("modelcraft-core")  // ModelCraft tab commented out in HTML – uncomment to restore
    else if (e.key === "2") switchTab("paper-replication")
    else if (e.key === "3") switchTab("projects")
  }

  if (e.key === "Escape") {
    showHelpHint = false
    updateHelpHint()
  }
  if (e.key === "?" && !e.ctrlKey && !e.metaKey && !isInputFocused) {
    e.preventDefault()
    showHelpHint = !showHelpHint
    updateHelpHint()
  }
})

function updateHelpHint() {
  const helpHint = document.getElementById("helpHint")
  if (showHelpHint) {
    helpHint.classList.remove("hidden")
  } else {
    helpHint.classList.add("hidden")
  }
}

document.querySelector(".close-help").addEventListener("click", () => {
  showHelpHint = false
  updateHelpHint()
})

// Initialize
renderCoreTab()
