// ---------- Configuration ----------
const config = {
  defaultVolume: 0.3
};

// ---------- Données des projets ----------
const projects = [
  {
    id: 1,
    name: "One Tap Routine",
    description:
      "Un aperçu de ma warm-up simple, efficace, précise. Chaque balle compte, chaque mouvement est calculé pour la perfection mécanique.",
    shortDescription: "One tap only – focus et mécanique pure.",
    technologies: "CS2 • Aim Routine",
    image: "AIMSCREEN.png",
    videoFile: "AIM.mp4",
    duration: "0:45"
  },
  {
    id: 2,
    name: "1v3 AWP Clutch sur Mirage",
    description:
      "Un clutch au sang-froid absolu. Lecture parfaite du jeu, positionnement optimal et exécution chirurgicale pour éliminer trois adversaires et sécuriser la victoire.",
    shortDescription: "Clutch signature AWP 1v3 sur Mirage.",
    technologies: "CS2 • Clutch",
    image: "screen.png",
    videoFile: "snipe3k.mp4",
    duration: "0:32"
  },
  {
    id: 3,
    name: "Highlights No Luck, Just Work",
    description:
      "Compilation des meilleurs moments : mécanique pure, décision instantanée et impact maximal. Pas de chance, que du travail et du talent.",
    shortDescription: "Best of CS2 – impact maximal.",
    technologies: "CS2 • Highlights",
    image: "lplscreen.png",
    videoFile: "compil_clip.mp4",
    duration: "1:28"
  },
  {
    id: 4,
    name: "Valorant – OP Ace sur Ascent",
    description:
      "Ace à l’OP sur Ascent : prise d’info rapide, gestion des angles et punition instantanée sur chaque peek.",
    shortDescription: "Ace Valorant à l’OP sur Ascent.",
    technologies: "Valorant • OP",
    image: "valo_op_ace.png",
    videoFile: "valo_op_ace.mp4",
    duration: "0:37"
  },
  {
    id: 5,
    name: "Valorant – Retake clutch 1v4",
    description:
      "Retake 1v4 avec sang-froid : utilité bien placée, timings parfaits et crosshair placement propre.",
    shortDescription: "Clutch 1v4 sur Valorant.",
    technologies: "Valorant • Clutch",
    image: "valo_1v4.png",
    videoFile: "valo_1v4.mp4",
    duration: "0:42"
  },
  {
    id: 6,
    name: "Rainbow Six – Entry frag explosive",
    description:
      "Entry agressif sur Rainbow Six : ouverture de site, bonnes lignes de tir et communication orientée pour l’entry frag.",
    shortDescription: "Entry frag agressif sur R6.",
    technologies: "R6 • Entry",
    image: "r6_entry.png",
    videoFile: "r6_entry.mp4",
    duration: "0:33"
  }
];

// ---------- Variables globales ----------
let currentVideo = null;

// ---------- Initialisation ----------
document.addEventListener("DOMContentLoaded", function () {
  console.log("Site Momow initialisé");

  initLoadingScreen();
  loadProjects();
  initNavigation();
  initAudioControls();
  initModals();
});

// ---------- Écran de chargement ----------
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  const enterBtn = document.getElementById("enterBtn");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (!enterBtn) {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }
    }, 2000);
    return;
  }

  if (backgroundMusic) {
    backgroundMusic.volume = 0;
    backgroundMusic.muted = true;
  }

  enterBtn.addEventListener("click", function () {
    if (backgroundMusic) {
      backgroundMusic.volume = config.defaultVolume;
      backgroundMusic.muted = false;
      const playPromise = backgroundMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio non joué :", error);
        });
      }
    }

    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
        document.body.style.overflow = "auto";
        updateVolumeIcon();
      }, 500);
    }
  });

  setTimeout(() => {
    if (loadingScreen && loadingScreen.style.display !== "none") {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
        document.body.style.overflow = "auto";
        if (backgroundMusic) {
          backgroundMusic.volume = config.defaultVolume;
          backgroundMusic.muted = false;
          backgroundMusic
            .play()
            .catch((error) => console.log("Audio non joué (fallback) :", error));
          updateVolumeIcon();
        }
      }, 500);
    }
  }, 8000);
}

// ---------- Charger les projets ----------
function loadProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "product-card";
    projectCard.setAttribute("data-id", project.id);

    projectCard.innerHTML = `
      <div class="product-image">
        <img 
          src="${project.image}" 
          alt="${project.name}" 
          onerror="this.onerror=null;this.src='https://via.placeholder.com/400x250/1a1a1a/ff4500?text=Momow+Pro';"
        />
        <div class="video-duration">${project.duration}</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${project.name}</h3>
        <p class="product-price">${project.shortDescription}</p>
        <div class="project-tags">
          ${
            project.technologies
              .split("•")
              .map((tag) => `<span class="tag">${tag.trim()}</span>`)
              .join("")
          }
        </div>
        <button class="buy-btn" data-id="${project.id}">
          <i class="fas fa-play-circle"></i>
          Voir le Clip
        </button>
      </div>
    `;

    projectsGrid.appendChild(projectCard);
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    const projectId = parseInt(card.getAttribute("data-id"), 10);
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    card.addEventListener("click", (e) => {
      if (!e.target.closest(".buy-btn")) {
        openProjectModal(project);
      }
    });

    const btn = card.querySelector(".buy-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openProjectModal(project);
      });
    }
  });
}

// ---------- Navigation ----------
function initNavigation() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        icon.className = navLinks.classList.contains("active")
          ? "fas fa-times"
          : "fas fa-bars";
      }
    });
  }

  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (navLinks) {
          navLinks.classList.remove("active");
        }
        if (mobileMenuBtn) {
          const icon = mobileMenuBtn.querySelector("i");
          if (icon) icon.className = "fas fa-bars";
        }

        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        if (this.classList.contains("nav-link")) {
          this.classList.add("active");
        }
      }
    });
  });

  const exploreBtn = document.getElementById("exploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      const highlights = document.getElementById("highlights");
      if (highlights) {
        highlights.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

// ---------- Contrôles audio ----------
function initAudioControls() {
  const audioControlIcon = document.getElementById("audio-control-icon");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (!audioControlIcon || !backgroundMusic) return;

  audioControlIcon.addEventListener("click", function () {
    backgroundMusic.muted = !backgroundMusic.muted;
    if (!backgroundMusic.muted && backgroundMusic.paused) {
      backgroundMusic.play().catch(console.error);
    }
    updateVolumeIcon();
  });

  updateVolumeIcon();
}

function updateVolumeIcon() {
  const volumeIcon = document.getElementById("volume-icon");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (!volumeIcon || !backgroundMusic) return;

  if (backgroundMusic.muted || backgroundMusic.volume === 0) {
    volumeIcon.className = "fas fa-volume-mute";
  } else if (backgroundMusic.volume <= 0.5) {
    volumeIcon.className = "fas fa-volume-down";
  } else {
    volumeIcon.className = "fas fa-volume-up";
  }
}

// ---------- Modales ----------
function initModals() {
  const closeProject = document.getElementById("closeProject");
  const closeImage = document.getElementById("closeImage");

  if (closeProject) {
    closeProject.addEventListener("click", closeProjectModal);
  }

  if (closeImage) {
    closeImage.addEventListener("click", () => {
      const imageModal = document.getElementById("imageModal");
      if (imageModal) {
        imageModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Modale vidéo de présentation (hero)
  const introModal = document.getElementById("introModal");
  const closeIntro = document.getElementById("closeIntro");
  const heroIntroCard = document.getElementById("heroIntroCard");

  if (heroIntroCard && introModal) {
    heroIntroCard.addEventListener("click", () => {
      openIntroModal();
    });
  }

  if (closeIntro) {
    closeIntro.addEventListener("click", closeIntroModal);
  }

  window.addEventListener("click", (e) => {
    const projectModal = document.getElementById("projectModal");
    const imageModal = document.getElementById("imageModal");
    const introModal = document.getElementById("introModal");

    if (e.target === projectModal) {
      closeProjectModal();
    }
    if (e.target === imageModal) {
      imageModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.target === introModal) {
      closeIntroModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      const imageModal = document.getElementById("imageModal");
      const introModal = document.getElementById("introModal");
      if (imageModal) {
        imageModal.style.display = "none";
      }
      if (introModal) {
        closeIntroModal();
      }
      document.body.style.overflow = "auto";
    }
  });

  document
    .querySelectorAll(".clickable-image, .hero-image")
    .forEach((img) => {
      img.addEventListener("click", function () {
        if (this.id === "heroIntroCard") return;
        const imageModal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        if (imageModal && modalImage) {
          modalImage.src = this.src;
          modalImage.alt = this.alt;
          imageModal.style.display = "flex";
          document.body.style.overflow = "hidden";
        }
      });
    });
}

// ---------- Ouvrir modale projet ----------
function openProjectModal(project) {
  const projectModal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (!projectModal || !modalTitle || !modalDetails) return;

  if (backgroundMusic && !backgroundMusic.paused) {
    backgroundMusic.pause();
  }

  modalTitle.textContent = project.name;

  modalDetails.innerHTML = `
    <div class="video-container">
      <video controls autoplay class="modal-video" id="modalVideo">
        <source src="${project.videoFile}" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
    </div>
    <div class="video-info">
      <div class="video-stats">
        <span><i class="fas fa-clock"></i> ${project.duration}</span>
        <span><i class="fas fa-eye"></i> 1.2k vues</span>
        <span><i class="fas fa-heart"></i> 98 likes</span>
      </div>
      <div class="video-tags">
        ${project.technologies
          .split("•")
          .map(
            (tag) =>
              `<span class="video-tag">${tag.trim()}</span>`
          )
          .join("")}
      </div>
    </div>
    <div class="modal-description">
      <h3>Description</h3>
      <p>${project.description}</p>
    </div>
  `;

  projectModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  const video = document.getElementById("modalVideo");
  if (video) {
    video.volume = 0.5;
    currentVideo = video;
    video.addEventListener("ended", () => {
      if (backgroundMusic && !backgroundMusic.muted) {
        backgroundMusic.play().catch(console.error);
      }
    });
  }
}

// ---------- Fermer modale projet ----------
function closeProjectModal() {
  const projectModal = document.getElementById("projectModal");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (currentVideo) {
    currentVideo.pause();
    currentVideo = null;
  }

  if (projectModal) {
    projectModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  if (backgroundMusic && !backgroundMusic.muted && backgroundMusic.paused) {
    backgroundMusic.play().catch(console.error);
  }
}

// ---------- Modale vidéo de présentation ----------
function openIntroModal() {
  const introModal = document.getElementById("introModal");
  const introVideo = document.getElementById("introVideo");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (!introModal || !introVideo) return;

  if (backgroundMusic && !backgroundMusic.paused) {
    backgroundMusic.pause();
  }

  introModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  introVideo.currentTime = 0;
  introVideo.volume = 0.5;
  introVideo.play().catch(console.error);

  currentVideo = introVideo;

  introVideo.onended = () => {
    if (backgroundMusic && !backgroundMusic.muted) {
      backgroundMusic.play().catch(console.error);
    }
  };
}

function closeIntroModal() {
  const introModal = document.getElementById("introModal");
  const introVideo = document.getElementById("introVideo");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (introVideo) {
    introVideo.pause();
  }
  currentVideo = null;

  if (introModal) {
    introModal.style.display = "none";
  }
  document.body.style.overflow = "auto";

  if (backgroundMusic && !backgroundMusic.muted && backgroundMusic.paused) {
    backgroundMusic.play().catch(console.error);
  }
}
