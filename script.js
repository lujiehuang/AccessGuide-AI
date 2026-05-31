const scenarios = [
  {
    id: "accessibility",
    title: "Open Accessibility Settings",
    intro:
      "A calm, step-by-step flow for finding text size, captions, and visual assistance on a phone.",
    steps: [
      {
        title: "Start from the home screen",
        body: "Open Settings and pause before tapping. The interface highlights only one next action at a time.",
      },
      {
        title: "Search for the right feature",
        body: "Use the search bar if the menu feels crowded. The system suggests terms like Text Size, Captions, or Display.",
      },
      {
        title: "Confirm the change",
        body: "Preview the effect before saving. This reduces uncertainty and makes the setting feel reversible.",
      },
    ],
    support:
      "If you feel stuck, say: 'Could you help me find the text size setting on my phone?'",
    confidence: 72,
  },
  {
    id: "popup",
    title: "Understand a Privacy Popup",
    intro:
      "A simpler explanation of a common consent dialog, translated into plain language and one decision at a time.",
    steps: [
      {
        title: "Read the meaning first",
        body: "The popup asks whether the app may use your data to personalize features. It is not asking you to buy anything.",
      },
      {
        title: "Choose what matters to you",
        body: "The guidance points out the practical impact of each option instead of overwhelming you with policy text.",
      },
      {
        title: "Keep your control",
        body: "The user can change the choice later from settings, which makes the decision feel less risky.",
      },
    ],
    support:
      "If you are unsure, ask: 'What happens if I allow this, and can I change it later?'",
    confidence: 64,
  },
  {
    id: "form",
    title: "Fill in a Web Form",
    intro:
      "A guided form helper that breaks a long online form into small, manageable steps with clear labels.",
    steps: [
      {
        title: "See only one field group",
        body: "The form reveals address, contact, and verification fields in small sections to reduce visual overload.",
      },
      {
        title: "Explain unfamiliar words",
        body: "Terms such as 'verification' or 'optional' can be expanded into everyday language when needed.",
      },
      {
        title: "Review before submit",
        body: "The system offers a summary page so users can check their entries without losing progress.",
      },
    ],
    support:
      "If you need help, say: 'Please check this form with me before I submit it.'",
    confidence: 69,
  },
  {
    id: "help",
    title: "Ask for Help Without Stress",
    intro:
      "A help-seeking flow designed to reduce embarrassment and support autonomy when users need assistance.",
    steps: [
      {
        title: "Name the problem simply",
        body: "The user chooses a plain description like 'I cannot find the button' rather than writing a long explanation.",
      },
      {
        title: "Share only what is necessary",
        body: "The system prepares a short message that can be sent to family, friends, or support staff.",
      },
      {
        title: "Stay in control",
        body: "The interface keeps the user in charge of what gets shared, which protects confidence and dignity.",
      },
    ],
    support:
      "Message template: 'I am trying to do this task, but I need a little help finding the next step.'",
    confidence: 78,
  },
];

const paceLabels = {
  1: "Gentle",
  2: "Balanced",
  3: "Detailed",
};

const state = {
  scenario: scenarios[0],
  pace: 2,
  simpleLanguage: true,
  showGlossary: true,
  helpScript: true,
};

const tabs = document.getElementById("scenarioTabs");
const steps = document.getElementById("steps");
const scenarioTitle = document.getElementById("scenarioTitle");
const scenarioIntro = document.getElementById("scenarioIntro");
const pace = document.getElementById("pace");
const paceLabel = document.getElementById("paceLabel");
const simpleLanguage = document.getElementById("simpleLanguage");
const showGlossary = document.getElementById("showGlossary");
const helpScript = document.getElementById("helpScript");
const outputTitle = document.getElementById("outputTitle");
const outputText = document.getElementById("outputText");
const meterFill = document.getElementById("meterFill");
const meterText = document.getElementById("meterText");

function renderTabs() {
  tabs.innerHTML = "";
  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.textContent = scenario.title;
    button.setAttribute("aria-selected", String(state.scenario.id === scenario.id));
    button.addEventListener("click", () => {
      state.scenario = scenario;
      render();
    });
    tabs.appendChild(button);
  });
}

function transformBody(body) {
  let text = body;

  if (!state.simpleLanguage) {
    text = text.replace(/help/g, "assistance").replace(/phone/g, "device");
  }

  if (!state.showGlossary) {
    text = text.replace(/reversible/g, "changeable");
  }

  if (state.pace === 1) {
    return text;
  }

  if (state.pace === 2) {
    return text;
  }

  return `${text} The system also offers a short reason why this step matters.`;
}

function renderSteps() {
  steps.innerHTML = "";
  const paceMultiplier = state.pace === 1 ? 0.9 : state.pace === 2 ? 1 : 1.1;

  state.scenario.steps.forEach((step, index) => {
    const item = document.createElement("li");
    item.style.transform = `scale(${paceMultiplier})`;
    item.style.transformOrigin = "left top";
    item.innerHTML = `
      <strong>Step ${index + 1}: ${step.title}</strong>
      <p>${transformBody(step.body)}</p>
    `;
    steps.appendChild(item);
  });
}

function renderSupport() {
  outputTitle.textContent = state.helpScript ? "Support Script" : "Design Note";
  outputText.textContent = state.helpScript
    ? state.scenario.support
    : "This prototype prioritizes clarity, reversibility, and confidence before efficiency.";

  const base = state.scenario.confidence;
  const adjusted = base + (state.simpleLanguage ? 4 : 0) + (state.showGlossary ? 3 : 0) + (state.helpScript ? 5 : 0) + (state.pace - 2) * 3;
  const width = Math.max(30, Math.min(92, adjusted));
  meterFill.style.width = `${width}%`;
  meterText.textContent = `Estimated confidence support: ${width}%`;
}

function render() {
  renderTabs();
  scenarioTitle.textContent = state.scenario.title;
  scenarioIntro.textContent = state.scenario.intro;
  paceLabel.textContent = paceLabels[state.pace];
  renderSteps();
  renderSupport();
}

pace.addEventListener("input", (event) => {
  state.pace = Number(event.target.value);
  render();
});

simpleLanguage.addEventListener("change", (event) => {
  state.simpleLanguage = event.target.checked;
  render();
});

showGlossary.addEventListener("change", (event) => {
  state.showGlossary = event.target.checked;
  render();
});

helpScript.addEventListener("change", (event) => {
  state.helpScript = event.target.checked;
  render();
});

render();

if (window.lucide) {
  window.lucide.createIcons();
}
