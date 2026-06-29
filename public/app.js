const pipelineStages = [
  ["Plan", "Threat model, acceptance criteria, security owner, and data classification are documented."],
  ["Code", "Peer review, branch protection, linting, unit tests, and secret hygiene are mandatory."],
  ["Scan", "SAST, dependency audit, license review, IaC scan, and container scan block unsafe releases."],
  ["Deploy", "Signed image, environment approval, health check, rollback plan, and release evidence are captured."]
];

const controls = [
  ["Security Headers", "CSP, frame protection, MIME sniffing protection, referrer policy, and HSTS are served by the app."],
  ["Path Safety", "The server normalizes public paths and rejects traversal outside the web root."],
  ["Health Endpoint", "A lightweight /healthz endpoint supports monitoring and container readiness checks."],
  ["Audit Evidence", "Docs and pipeline output create proof that checks ran before deployment."],
  ["Least Privilege", "Container image runs as a non-root user and exposes only one application port."],
  ["Incident Ready", "Severity, owner, SLA, and customer impact are practiced as routine operations."],
  ["Change Control", "Release checklist keeps risk visible before production promotion."],
  ["Continuous Learning", "The practice plan turns this repo into a repeatable DevSecOps gym."]
];

const readiness = [
  "Pull request has a clear risk summary and rollback note.",
  "Automated tests and security header checks pass in CI.",
  "No critical dependency, secret, or container findings remain open.",
  "Deployment owner confirms monitoring, alert route, and health check.",
  "Release notes include security impact and operational evidence."
];

const incidents = [
  ["High", "Dependency CVE exceeds SLA", "Patch, retest, rebuild image", "Security"],
  ["Medium", "CSP violation spike", "Investigate source and tune policy", "Platform"],
  ["Low", "Health check latency drift", "Review metrics and capacity", "SRE"]
];

const practice = [
  ["Week 1", "Run locally, understand secure headers, change one UI feature, and prove tests still pass."],
  ["Week 2", "Add a mock API, write validation tests, and update the threat model."],
  ["Week 3", "Containerize, scan, document false positives, and add deployment evidence."],
  ["Week 4", "Simulate an incident, write a postmortem, patch the weakness, and release again."]
];

function renderCards(selector, data, className) {
  const root = document.querySelector(selector);
  root.innerHTML = data
    .map(([title, body]) => `
      <article class="${className}">
        <span class="status">Active</span>
        <strong>${title}</strong>
        <span>${body}</span>
      </article>
    `)
    .join("");
}

function renderReadiness() {
  const root = document.querySelector("[data-readiness]");
  root.innerHTML = readiness.map((item) => `<li>${item}</li>`).join("");
}

function renderIncidents() {
  const root = document.querySelector("[data-incidents]");
  root.innerHTML = incidents
    .map(([severity, title, action, owner]) => `
      <article class="incident">
        <span class="severity ${severity.toLowerCase()}">${severity}</span>
        <div>
          <strong>${title}</strong>
          <p>${action}</p>
        </div>
        <span class="owner">${owner}</span>
      </article>
    `)
    .join("");
}

renderCards("[data-pipeline]", pipelineStages, "stage");
renderCards("[data-controls]", controls, "control");
renderCards("[data-practice]", practice, "task");
renderReadiness();
renderIncidents();
